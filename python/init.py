#!/usr/bin/env python
# -*- coding: utf-8 -*-

# http://blog.mclemon.io/python-using-a-dualshock-4-with-pygame
# https://rpi.science.uoit.ca/lab/servo/
# https://gpiozero.readthedocs.io/en/stable/recipes.html
# https://maker.pro/raspberry-pi/projects/hexapod-walker-raspberry-pi

import os
import sys
import pprint
import pygame
from time import sleep
import pigpio
# CONSTANTS

PINS = {
    'servo_l': 4,
    'servo_r': 17,
    'servo_f': 27,
    'servo_b': 22
}

SERVO_OFFSET = {
    'servo_l': 1315,
    'servo_r': 1520,
    'servo_f': 1530,
    'servo_b': 1460
}
SERVO_NAMES = list(SERVO_OFFSET.keys())
SERVO_CAL = 0

SERVO_RANGE = 250

AXIS_NAME = ['lx', 'ly', 'l2', 'rx', 'ry', 'r2']
BUTTON_NAME = [
    "x",
    "circle",
    "triangle",
    "square",
    "l1",
    "r1",
    "l2_",
    "r2_",
    "share",
    "option",
    "home",
    "left_stick",
    "right_stick"
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

# Pigpio
pi = pigpio.pi()

# Pygame joystick
pygame.init()
pygame.joystick.init()
joystick = pygame.joystick.Joystick(0)
joystick.init()


# FUNCTIONS

def set_servo(servo_name, pos=0):
    # position é entre -1 e 1. Se for outro será clampado.
    pulse = (max(min(pos, 1), -1) * SERVO_RANGE) + SERVO_OFFSET[servo_name]
    # clampa o resultado
    pi.set_servo_pulsewidth(PINS[servo_name], pulse)


# LOOP

RUN = True
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

    gas = JS['ly']
    rot = JS['lx']
    lr = JS['ry']
    fb = JS['rx']

    # Set Servos
    set_servo('servo_l', rot + lr)
    set_servo('servo_r', -rot - lr)
    set_servo('servo_f', rot + fb)
    set_servo('servo_b', -rot - fb)

    # Calibrar
    if JS['hatx'] != 0 and hatx_last == 0:
        SERVO_CAL += JS['hatx']
        print("Calibrando "+SERVO_NAMES[SERVO_CAL % len(SERVO_NAMES)])
    if JS['haty'] != 0:
        name = SERVO_NAMES[SERVO_CAL % len(SERVO_NAMES)]
        SERVO_OFFSET[name] += (JS['haty'] * 5)

    # Printar states
    # os.system('clear')
    sys.stderr.write("\x1b[2J\x1b[H")
    pprint.pprint(JS)
    pprint.pprint(SERVO_OFFSET)

    # Sair do loop e do programa
    if JS['share'] and JS['option']:
        RUN = False

# Desligar o pi
os.system('sudo shutdown -h now')
