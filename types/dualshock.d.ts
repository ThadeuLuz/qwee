interface Device {}

export function getDevices(): Device[];
export function getFeatures(dev: any): any;
export function getType(dev: any): any;
export function open(dev: Device): any;
