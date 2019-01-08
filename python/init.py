import pygame
from time import sleep
from gpiozero import AngularServo

MAX_ANGLE = 35  # Max e min

servo_l = AngularServo(4, min_angle=-MAX_ANGLE, max_angle=MAX_ANGLE)  # 7
servo_r = AngularServo(17, min_angle=-MAX_ANGLE, max_angle=MAX_ANGLE)  # 11
servo_f = AngularServo(27, min_angle=-MAX_ANGLE, max_angle=MAX_ANGLE)  # 13
servo_b = AngularServo(22, min_angle=-MAX_ANGLE, max_angle=MAX_ANGLE)  # 15

# Initialize joystick
pygame.init()
pygame.joystick.init()
joystick = pygame.joystick.Joystick(0)
joystick.init()


def set_all(angle=0):
    print(angle)
    global servo_l
    global servo_r
    global servo_f
    global servo_b
    servo_l.angle = angle
    servo_r.angle = angle
    servo_f.angle = angle
    servo_b.angle = angle


while True:
    for event in pygame.event.get():
        print(event.type)

    set_all(MAX_ANGLE)
    sleep(1)
    set_all()
    sleep(1)
    set_all(-MAX_ANGLE)
    sleep(1)
    set_all()
    sleep(1)
