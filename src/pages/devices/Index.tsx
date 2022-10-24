import { useEffect, useState } from "react";
import { View, Text, Dimensions, ScrollView } from "react-native";
import { useTailwind } from "tailwind-rn";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";

import Graph from "../../components/Graph";
import DeviceCard from "../../components/DeviceCard";
import { DeviceApiService } from "../../services/DeviceApiService";
import { Device } from "../../models/device/Device";
import { GetUserDevicesResponse } from "../../models/device/GetUserDevicesResponse";
import HomeHeader from "../../components/HomeHeader";

export default function Index({ navigation }) {
  const screen = Dimensions.get("screen");
  const isFocused = useIsFocused();
  const tailwind = useTailwind();
  let svc = new DeviceApiService();
  const [devices, setDevices] = useState<Device[]>([]);
  const [deviceUserIds, setDeviceUserIds] = useState([]);
  const [deviceCount, setDeviceCount] = useState(0);
  const [temp, setTemp] = useState(0);

  // Get Devices Api Call
  const getDevices = async () => {
    svc.getUserDevices("lucy-connor", (response: GetUserDevicesResponse) => {
      let devices: any = [];
      let deviceUserIds: any = [];
      let onDevices: any = [];
      response.data.forEach((device) => {
        device["DeviceUser"]["deviceData"] = JSON.parse(
          JSON.parse(device["DeviceUser"]["deviceData"])
        );
        if (device["DeviceUser"]["deviceData"]["on"] == true) {
          onDevices.push(device["DeviceUser"]["id"]);
        }
        deviceUserIds.push(device["DeviceUser"]["id"]);
        devices.push(device);
      });
      setDeviceCount(onDevices.length);
      setDeviceUserIds(deviceUserIds);
      setDevices(devices);
    });
  };

  const getTempFromStorage = async () => {
    try {
      const value = await AsyncStorage.getItem("@temp");
      if (value !== null) {
        setTemp(parseInt(value));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (isFocused) {
      getTempFromStorage();
      getDevices();
    }
    return () => {};
  }, [isFocused]);

  return (
    <ScrollView>
      <HomeHeader
        temp={temp}
        deviceCount={deviceCount}
        navigation={navigation}
      />
      <View
        style={{
          height: (screen.height * 30) / 100,
          width: screen.width,
        }}
      >
        <Graph deviceUserIds={deviceUserIds} svc={svc} />
      </View>
      <View style={tailwind("p-3")}>
        <Text style={tailwind("ml-3 text-2xl")}>Smart Devices</Text>
        <View style={tailwind("mt-2 flex flex-row flex-wrap")}>
          {devices.map((device, index) => {
            return (
              <View style={tailwind("w-1/2")} key={index}>
                <DeviceCard
                  device={device}
                  svc={svc}
                  setDeviceCount={setDeviceCount}
                  navigation={navigation}
                />
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}
