const servoInitial = 90;
const servoRange = 35;

const clampServoAngle = angle => {
  const min = servoInitial - servoRange;
  const max = servoInitial + servoRange;
  if (angle > max) {
    return max;
  }

  if (angle < min) {
    return min;
  }

  return angle;
};

const getServoAngle = (directionPos, rotationPos) => {
  const dirAngle = directionPos * servoRange + servoInitial;
  const rotAngle = rotationPos * servoRange + servoInitial;
  return clampServoAngle(rotAngle + dirAngle);
};
