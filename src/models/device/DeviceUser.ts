export class DeviceUser {
  id: number;
  deviceData: any;
  UserId: number;
  DeviceId: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: number,
    deviceData: any,
    UserId: number,
    DeviceId: number,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.deviceData = deviceData;
    this.UserId = UserId;
    this.DeviceId = DeviceId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
