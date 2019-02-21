class RaspiMock {
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

const Raspi = process.env.QWEE ? require("raspi-io") : RaspiMock;
export default Raspi;
