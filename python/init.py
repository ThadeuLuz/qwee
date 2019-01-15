#!/usr/bin/env python
# -*- coding: utf-8 -*-

# http://blog.mclemon.io/python-using-a-dualshock-4-with-pygame
# https://rpi.science.uoit.ca/lab/servo/
# https://gpiozero.readthedocs.io/en/stable/recipes.html
# https://maker.pro/raspberry-pi/projects/hexapod-walker-raspberry-pi
# https://projects.raspberrypi.org/en/
# https://playground.arduino.cc/Main/MAX72XXHardware

import os
import sys
import pprint
import pygame
from time import sleep
import pigpio
from gpiozero import Buzzer

# CONSTANTS

VERSION = [3, 1]

PING = {
    # 1: 3.3v
    # 2: 5v
    '3': 2,
    # 4: 5v
    '5': 3,
    # 6: ground
    '7': 4,
    '8': 14,
    # 9: ground
    '10': 15,
    '11': 17,
    '12': 18,
    '13': 27,
    # 14: ground
    '15': 22,
    '16': 23,
    # 17: 3.3v
    '18': 24,
    '19': 10,
    # 20: ground
    '21': 9,
    '22': 25,
    '23': 11,
    '24': 8,
    # 25: ground
    '26': 7,
    # Model B+ pins
    # 27: ID_SD
    # 28: ID_SC
    '29': 5,
    # 30: ground
    '31': 6,
    '32': 12,
    '33': 13,
    # 34: ground
    '35': 19,
    '36': 16,
    '37': 26,
    '38': 20,
    # 39: ground
    '40': 21
}

PINS = {
    'motor': PING['12'],
    'buzzer': PING['29'],
    'servo_l': PING['31'],
    'servo_r': PING['33'],
    'servo_f': PING['35'],
    'servo_b': PING['37'],
}

SERVO_OFFSET = {
    'servo_l': 1315,
    'servo_r': 1520,
    'servo_f': 1530,
    'servo_b': 1460
}
SERVO_NAMES = list(SERVO_OFFSET.keys())
SERVO_CAL = 0

SERVO_RANGE = 350

AXIS_NAME = ['lx', 'ly', 'l2', 'rx', 'ry', 'r2']
BUTTON_NAME = [
    "x", "circle", "triangle", "square", "l1", "r1", "l2_", "r2_", "share",
    "option", "home", "left_stick", "right_stick"
]
JS = {
    'lx': 0,
    'ly': 0,
    'l2': -1,
    'rx': 0,
    'ry': 0,
    'r2': -1,
    'hatx': 0,
    'haty': 0,
    "x": False,
    "circle": False,
    "triangle": False,
    "square": False,
    "l1": False,
    "r1": False,
    "l2_": False,
    "r2_": False,
    "share": False,
    "option": False,
    "home": False,
    "left_stick": False,
    "right_stick": False
}

RUN = True

# INITIALIZATION

buzzer = Buzzer(PINS['buzzer'])

# Beep Version
buzzer.beep(n=VERSION[0], on_time=0.1, off_time=0.05, background=False)
sleep(1)
buzzer.beep(n=VERSION[0], on_time=0.1, off_time=0.05, background=False)

# Pigpio
pi = pigpio.pi()

# Pygame and joystick
pygame.init()

JS_COUNT = 0
while JS_COUNT == 0:
    print("Looking for joystick...")
    pygame.joystick.init()
    JS_COUNT = pygame.joystick.get_count()
    if JS_COUNT == 0:
        print("No joystick found. Trying again in 5 seconds.")
        buzzer.beep(n=1, on_time=0.25, off_time=0, background=False)

        pygame.joystick.quit()
        sleep(5)
    else:
        print("Joystick found! :)")
        buzzer.beep(n=3, on_time=0.1, off_time=0.1, background=False)

        joystick = pygame.joystick.Joystick(0)
        joystick.init()

# FUNCTIONS
STATE = {}


def set_servo(servo_name, pos=0):
    pulse = (pos * SERVO_RANGE) + SERVO_OFFSET[servo_name]
    # clampa o resultado para um número seguro
    pulse = max(min(pulse, 1500 + SERVO_RANGE), 1500 - SERVO_RANGE)
    pi.set_servo_pulsewidth(PINS[servo_name], pulse)
    STATE[servo_name] = pulse


def set_motor(pos):
    pulse = (pos * 1000) + 1000
    # clampa o resultado para um número seguro
    pulse = max(min(pulse, 2000), 1000)
    pi.set_servo_pulsewidth(PINS['motor'], pulse)
    STATE['motor'] = pulse


# LOOP

RUN = True
count = 0
while RUN:
    for event in pygame.event.get():
        if event.type == pygame.JOYAXISMOTION:
            name = AXIS_NAME[event.axis]
            JS[name] = round(event.value, 2)
        elif event.type == pygame.JOYBUTTONDOWN:
            name = BUTTON_NAME[event.button]
            JS[name] = True
        elif event.type == pygame.JOYBUTTONUP:
            name = BUTTON_NAME[event.button]
            JS[name] = False
        elif event.type == pygame.JOYHATMOTION:
            hatx_last = JS['hatx']
            haty_last = JS['haty']
            JS['hatx'], JS['haty'] = event.value

    # Set Servos

    set_motor(max(-JS['r2'], 0))
    set_servo('servo_l', +JS['lx'] - JS['ry'])
    set_servo('servo_r', +JS['lx'] + JS['ry'])
    set_servo('servo_f', +JS['lx'] + JS['rx'])
    set_servo('servo_b', +JS['lx'] - JS['rx'])

    # Calibrar
    if JS['hatx'] != 0 and hatx_last == 0:
        SERVO_CAL += JS['hatx']
        print("Calibrando " + SERVO_NAMES[SERVO_CAL % len(SERVO_NAMES)])
    if JS['haty'] != 0:
        name = SERVO_NAMES[SERVO_CAL % len(SERVO_NAMES)]
        SERVO_OFFSET[name] += (JS['haty'] * 5)

    # Printar states
    count += 1
    if count % 5 == 0:
        os.system('clear')
        pprint.pprint(JS)
        pprint.pprint(SERVO_OFFSET)
        pprint.pprint(STATE)

    # Sair do loop e do programa
    if JS['share'] and JS['option']:
        RUN = False

# Desligar o pi
buzzer.beep(n=5, on_time=0.1, off_time=0.1, background=False)
joystick.quit()
pygame.quit()
os.system('sudo shutdown -H now')
