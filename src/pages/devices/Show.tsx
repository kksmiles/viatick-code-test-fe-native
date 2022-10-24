import { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { useTailwind } from "tailwind-rn";

import StatusCard from "../../components/StatusCard";
import Knob from "../../components/Knob";
import { useEffect } from "react";
import { DeviceApiService } from "../../services/DeviceApiService";

export default function Show({ route, navigation }) {
  const { title, device } = route.params;
  const tailwind = useTailwind();
  let svc = new DeviceApiService();
  const min = 0.13;
  const max = 0.86;
  const minTemp = 6;
  const maxTemp = 34;

  const [isOn, setIsOn] = useState(device.DeviceUser.deviceData.on);
  const handleToggle = () => {
    setIsOn(!isOn);
    device.DeviceUser.deviceData.on = !isOn;
    svc.updateDeviceData(device.id, device.DeviceUser.deviceData);
  };

  const convertToPercentage = (v: any) => {
    return (v - minTemp) / (maxTemp - minTemp);
  };

  const convertToValue = (p: any) => {
    return Math.round((maxTemp - minTemp) * p + minTemp);
  };

  const valueWithinLimits = (v: any) => Math.min(Math.max(v, min), max);
  const [value, setValue] = useState(
    convertToPercentage(device.DeviceUser.deviceData.temperature)
  );
  const onChange = (p: any) => {
    setValue(valueWithinLimits(p));
    let v = convertToValue(value);
    device.DeviceUser.deviceData.temperature = v;
  };

  const onChangeEnd = (p: any) => {
    svc.updateDeviceData(device.id, device.DeviceUser.deviceData);
  };

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <View style={tailwind("bg-[#F7F7F7]")}>
      <View
        style={tailwind(
          "rounded-full w-4/5 bg-white h-12 mx-auto flex flex-row mt-5"
        )}
      >
        <View
          style={tailwind(
            "w-1/2 bg-black flex items-center justify-center rounded-full text-center"
          )}
        >
          <Text style={tailwind("text-white font-bold")}>Control</Text>
        </View>
        <View
          style={tailwind(
            "w-1/2 bg-white flex items-center justify-center rounded-full text-center"
          )}
        >
          <Text style={tailwind("text-black font-bold")}>Statistic</Text>
        </View>
      </View>

      <View style={tailwind("flex justify-center items-center p-5 mt-2")}>
        {/* <View
          style={{
            width: 250,
            height: 250,
            borderRadius: 200,
            // borderTopColor: "#DB9190",
            // borderLeftColor: "#E5E5E5",
            // borderRightColor: "#F7F7F7",
            // borderBottomColor: "#F7F7F7",
            borderWidth: 10,
            borderStyle: "dotted",
            transform: [{ rotate: "45deg" }],
          }}
        ></View> */}
        <Knob />
      </View>

      <ScrollView style={tailwind("h-full overflow-y-auto")}>
        <View style={tailwind("p-3")}>
          <View style={tailwind("flex flex-row mt-5")}>
            {Object.keys(device.DeviceUser.deviceData).map((key, index) => {
              if (key != "on") {
                return (
                  <StatusCard
                    key={index}
                    label={key}
                    value={
                      device.DeviceUser.deviceData[key] +
                      (key == "temperature" ? "°" : "") +
                      (key == "humidity" ? "%" : "")
                    }
                  />
                );
              }
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
