import axios from "axios";
import { GetUserDevicesResponse } from "../models/device/GetUserDevicesResponse";
import { GetUserDeviceHistoriesResponse } from "../models/device/GetUserDeviceHistoriesResponse";
import { API_URL } from "@env";

export class DeviceApiService {
  getUserDevices(
    userSlug: string,
    callback: (getUserDevicesResponse: GetUserDevicesResponse) => any
  ) {
    const GET_USER_DEVICES_URL: string = `${API_URL}/api/device_users/${userSlug}/devices`;

    axios
      .get(GET_USER_DEVICES_URL, {
        headers: {
          Accept: "application/json",
        },
      })
      .then((response: any) => {
        let getUserDevicesResponse = new GetUserDevicesResponse(response.data);
        callback(getUserDevicesResponse);
      })
      .catch((error: any) => {
        console.error(error);
      });
  }

  updateDeviceData(deviceId: number, deviceData: any) {
    const STORE_DEVICE_DATA_URL: string = `${API_URL}/api/device_users`;

    axios
      .post(STORE_DEVICE_DATA_URL, {
        UserId: 1,
        DeviceId: deviceId,
        deviceData: deviceData,
      })
      .catch((error: any) => {
        console.error(error);
      });
  }

  getDeviceUserHistories(
    deviceUserId: number,
    fromTime: Date,
    toTime: Date,
    callback: (
      getUserDeviceHistoriesResponse: GetUserDeviceHistoriesResponse
    ) => any
  ) {
    const fromTimeStr = fromTime.toISOString();
    const toTimeStr = toTime.toISOString();
    let FETCH_DEVICE_USER_HISTORY_URL: string = `${API_URL}/api/device_users/${deviceUserId}/histories?fromTime=${fromTimeStr}&toTime=${toTimeStr}`;

    axios
      .get(FETCH_DEVICE_USER_HISTORY_URL)
      .then((response: any) => {
        let getUserDeviceHistoriesResponse = new GetUserDeviceHistoriesResponse(
          response.data
        );
        callback(getUserDeviceHistoriesResponse);
      })
      .catch((error: any) => {
        console.error(error);
      });
  }
}
