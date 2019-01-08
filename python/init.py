from time import sleep
from gpiozero import AngularServo

MAX_ANGLE = 35  # Max e min

servo_l = AngularServo(4, min_angle=-MAX_ANGLE, max_angle=MAX_ANGLE)  # 7
servo_r = AngularServo(17, min_angle=-MAX_ANGLE, max_angle=MAX_ANGLE)  # 11
servo_f = AngularServo(27, min_angle=-MAX_ANGLE, max_angle=MAX_ANGLE)  # 13
servo_b = AngularServo(22, min_angle=-MAX_ANGLE, max_angle=MAX_ANGLE)  # 15


def set_all(angle=0):
    global servo_l
    global servo_r
    global servo_f
    global servo_b
    servo_l = angle
    servo_r = angle
    servo_f = angle
    servo_b = angle


while True:
    set_all(MAX_ANGLE)
    sleep(1)
    set_all()
    sleep(1)
    set_all(-MAX_ANGLE)
    sleep(1)
    set_all()
    sleep(1)

# import RPi.GPIO as GPIO
# import time

# GPIO.setmode(GPIO.BOARD)

# GPIO.setup(11, GPIO.OUT)

# p = GPIO.PWM(11, 50)

# p.start(7.5)

# try:
#     while True:
#         p.ChangeDutyCycle(7.5)  # turn towards 90 degree
#         time.sleep(1)  # sleep 1 second
#         p.ChangeDutyCycle(6.5)  # turn towards 0 degree
#         time.sleep(1)  # sleep 1 second
# except KeyboardInterrupt:
#     p.stop()
#     GPIO.cleanup()
