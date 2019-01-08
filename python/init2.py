#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import time
import pprint
import pygame
import RPi.GPIO as GPIO
GPIO.setmode(GPIO.BCM)


# Constants
ANGLE_VARIATION = 35  # Max e min
MID_ANGLE = 90  # Posição do meio
MAX_ANGLE = MID_ANGLE + ANGLE_VARIATION
MIN_ANGLE = MID_ANGLE - ANGLE_VARIATION

SERVO_L_PIN = 2
SERVO_R_PIN = 3
SERVO_F_PIN = 4
SERVO_B_PIN = 17

JS_LEFT_X = 0
JS_LEFT_Y = 0
JS_RIGHT_X = 0
JS_RIGHT_Y = 0

AXIS_DATA = {}
BUTTON_DATA = {}
HAT_DATA = {}

# Setup
GPIO.setup(SERVO_L_PIN, GPIO.OUT)
GPIO.setup(SERVO_R_PIN, GPIO.OUT)
GPIO.setup(SERVO_F_PIN, GPIO.OUT)
GPIO.setup(SERVO_B_PIN, GPIO.OUT)

servo_l = GPIO.PWM(SERVO_L_PIN, 50)
servo_r = GPIO.PWM(SERVO_R_PIN, 50)
servo_f = GPIO.PWM(SERVO_F_PIN, 50)
servo_b = GPIO.PWM(SERVO_B_PIN, 50)


def set_servo_angle(servo, angle):
    duty = angle / 18 + 2.5
    servo.ChangeDutyCycle(duty)


# Initialization
set_servo_angle(servo_l, MID_ANGLE)
set_servo_angle(servo_r, MID_ANGLE)
set_servo_angle(servo_f, MID_ANGLE)
set_servo_angle(servo_b, MID_ANGLE)

pygame.init()
pygame.joystick.init()
joystick = pygame.joystick.Joystick(0)
joystick.init()

done = False
while done == False:
    # EVENT PROCESSING STEP
    for event in pygame.event.get():
        if event.type == pygame.JOYAXISMOTION:
            AXIS_DATA[event.axis] = round(event.value, 2)
        elif event.type == pygame.JOYBUTTONDOWN:
            BUTTON_DATA[event.button] = True
        elif event.type == pygame.JOYBUTTONUP:
            BUTTON_DATA[event.button] = False
        elif event.type == pygame.JOYHATMOTION:
            HAT_DATA[event.hat] = event.value

    os.system('clear')
    pprint.pprint(BUTTON_DATA)
    pprint.pprint(AXIS_DATA)
    pprint.pprint(HAT_DATA)

    set_servo_angle(servo_r, MIN_ANGLE)
    set_servo_angle(servo_l, MIN_ANGLE)
    set_servo_angle(servo_f, MIN_ANGLE)
    set_servo_angle(servo_b, MIN_ANGLE)
    time.sleep(1)  # sleep 1 second
    set_servo_angle(servo_r, MAX_ANGLE)
    set_servo_angle(servo_l, MAX_ANGLE)
    set_servo_angle(servo_f, MAX_ANGLE)
    set_servo_angle(servo_b, MAX_ANGLE)
    time.sleep(1)  # sleep 1 second


# cleanup
servo_r.stop()
servo_l.stop()
servo_f.stop()
servo_b.stop()
GPIO.cleanup()
