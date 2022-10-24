import { DeviceUserHistory } from "./DeviceUserHistory";

export class GetUserDeviceHistoriesResponse {
  message: number;
  data: DeviceUserHistory[];

  constructor(response: any) {
    this.message = response.message;
    this.data = response.data;
  }
}
