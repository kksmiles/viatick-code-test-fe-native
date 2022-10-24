export class DeviceUserHistory {
  id: number;
  takenAt: Date;
  usage: number;
  createdAt: Date;
  updatedAt: Date;
  DeviceUserId: number;

  constructor(
    id: number,
    takenAt: Date,
    usage: number,
    createdAt: Date,
    updatedAt: Date,
    DeviceUserId: number
  ) {
    this.id = id;
    this.takenAt = takenAt;
    this.usage = usage;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.DeviceUserId = DeviceUserId;
  }
}
