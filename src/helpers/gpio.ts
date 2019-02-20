class GpioMock {
  public pin: any;
  public config: any;

  constructor(pin, config) {
    this.pin = pin;
    this.config = config;
  }
  public pwmWrite = (v: any) => this.log("pwmWrite")(v);
  public servoWrite = (v: any) => this.log("pwmWrite")(v);

  public log = (name: string) => (value: any) => {
    console.log(`FakeGpio`, name, this.pin, value);
  };
}

const Gpio = process.env.QWEE ? require("pigpio").Gpio : GpioMock;
export default Gpio;
