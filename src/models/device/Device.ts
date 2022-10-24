import { DeviceUser } from "./DeviceUser";

export class Device {
  id: number;
  name: string;
  slug: number;
  icon: number;
  fields: number;
  createdAt: Date;
  updatedAt: Date;
  DeviceUser: DeviceUser;

  constructor(
    id: number,
    name: string,
    slug: number,
    icon: number,
    fields: number,
    createdAt: Date,
    updatedAt: Date,
    DeviceUser: DeviceUser
  ) {
    this.id = id;
    this.name = name;
    this.slug = slug;
    this.icon = icon;
    this.fields = fields;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.DeviceUser = DeviceUser;
  }
}
