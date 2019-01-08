#!/usr/bin/env python
# -*- coding: utf-8 -*-

import RPi.GPIO as GPIO
import time

# Constants
ANGLE_VARIATION = 35  # Max e min
MID_ANGLE = 90  # Posição do meio
MAX_ANGLE = MID_ANGLE + ANGLE_VARIATION
MIN_ANGLE = MID_ANGLE - ANGLE_VARIATION

PIN_SERVO_L = 2
PIN_SERVO_R = 3
PIN_SERVO_F = 4
PIN_SERVO_B = 17

GPIO.setmode(GPIO.BCM)
GPIO.setup(PIN_SERVO_L, GPIO.OUT)
GPIO.setup(PIN_SERVO_R, GPIO.OUT)
GPIO.setup(PIN_SERVO_F, GPIO.OUT)
GPIO.setup(PIN_SERVO_B, GPIO.OUT)


def get_duty(angle):
    return angle / 18 + 2.5


servo_l = GPIO.PWM(PIN_SERVO_L, 100)
servo_r = GPIO.PWM(PIN_SERVO_R, 100)
servo_f = GPIO.PWM(PIN_SERVO_F, 100)
servo_b = GPIO.PWM(PIN_SERVO_B, 0)

servo_l.start(get_duty(MID_ANGLE))
servo_r.start(get_duty(MID_ANGLE))
servo_f.start(get_duty(MID_ANGLE))
servo_b.start(get_duty(MID_ANGLE))

try:
    while True:
        servo_l.ChangeDutyCycle(get_duty(MIN_ANGLE))
        servo_r.ChangeDutyCycle(get_duty(MIN_ANGLE))
        servo_f.ChangeDutyCycle(get_duty(MIN_ANGLE))
        servo_b.ChangeDutyCycle(get_duty(MIN_ANGLE))
        time.sleep(0.5)

        servo_l.ChangeDutyCycle(get_duty(MID_ANGLE))
        servo_r.ChangeDutyCycle(get_duty(MID_ANGLE))
        servo_f.ChangeDutyCycle(get_duty(MID_ANGLE))
        servo_b.ChangeDutyCycle(get_duty(MID_ANGLE))
        time.sleep(0.5)

        servo_l.ChangeDutyCycle(get_duty(MAX_ANGLE))
        servo_r.ChangeDutyCycle(get_duty(MAX_ANGLE))
        servo_f.ChangeDutyCycle(get_duty(MAX_ANGLE))
        servo_b.ChangeDutyCycle(get_duty(MAX_ANGLE))
        time.sleep(0.5)

        servo_l.ChangeDutyCycle(get_duty(MID_ANGLE))
        servo_r.ChangeDutyCycle(get_duty(MID_ANGLE))
        servo_f.ChangeDutyCycle(get_duty(MID_ANGLE))
        servo_b.ChangeDutyCycle(get_duty(MID_ANGLE))
        time.sleep(0.5)

except KeyboardInterrupt:
    servo_l.stop()
    servo_r.stop()
    servo_f.stop()
    servo_b.stop()
    GPIO.cleanup()
