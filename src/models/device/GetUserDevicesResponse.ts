import { Device } from "./Device";

export class GetUserDevicesResponse {
  message: number;
  data: Device[];

  constructor(response: any) {
    this.message = response.message;
    this.data = response.data;
  }
}
