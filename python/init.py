import os
import pprint
import pygame
from time import sleep

import gpiozero
from gpiozero.pins.pigpio import PiGPIOPin
import gpiozero.devices

gpiozero.devices.pin_factory = PiGPIOPin

# from gpiozero import AngularServo

MAX_ANGLE = 35  # Max e min

AXIS_DATA = {
    'LX': 0,
    'LY': 0,
    'L2': -1,
    'RX': 0,
    'RY': 0,
    'R2': -1
}

BUTTON_DATA = {}
# HAT_DATA = {}

servo_l = gpiozero.AngularServo(4, min_angle=-MAX_ANGLE, max_angle=MAX_ANGLE)
servo_r = gpiozero.AngularServo(17, min_angle=-MAX_ANGLE, max_angle=MAX_ANGLE)
servo_f = gpiozero.AngularServo(27, min_angle=-MAX_ANGLE, max_angle=MAX_ANGLE)
servo_b = gpiozero.AngularServo(22, min_angle=-MAX_ANGLE, max_angle=MAX_ANGLE)

# Initialize joystick
pygame.init()
pygame.joystick.init()
joystick = pygame.joystick.Joystick(0)
joystick.init()


# def set_all(angle=0):
#     print(angle)
#     global servo_l
#     global servo_r
#     global servo_f
#     global servo_b
#     servo_l.angle = angle
#     servo_r.angle = angle
#     servo_f.angle = angle
#     servo_b.angle = angle


AXIS_NAME = ['LX', 'LY', 'L2', 'RX', 'RY', 'R2']

while True:
    for event in pygame.event.get():
        if event.type == pygame.JOYAXISMOTION:
            name = AXIS_NAME[event.axis]
            AXIS_DATA[name] = round(event.value, 2)
        elif event.type == pygame.JOYBUTTONDOWN:
            BUTTON_DATA[event.button] = True
        elif event.type == pygame.JOYBUTTONUP:
            BUTTON_DATA[event.button] = False
        # elif event.type == pygame.JOYHATMOTION:
            # HAT_DATA[event.hat] = event.value

    servo_l.angle = MAX_ANGLE * AXIS_DATA['LX']
    servo_r.angle = MAX_ANGLE * -AXIS_DATA['LX']
    servo_f.angle = MAX_ANGLE * AXIS_DATA['LY']
    servo_b.angle = MAX_ANGLE * -AXIS_DATA['LY']

    os.system('clear')
    # pprint.pprint(BUTTON_DATA)
    pprint.pprint(AXIS_DATA)
    # pprint.pprint(HAT_DATA)

    # set_all(MAX_ANGLE)
    # set_all()
    # set_all(-MAX_ANGLE)
    # set_all()
