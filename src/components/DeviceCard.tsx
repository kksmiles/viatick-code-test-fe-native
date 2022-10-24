import { useState } from "react";
import { DeviceApiService } from "../services/DeviceApiService";
import { View, Text, Switch, Image, TouchableHighlight } from "react-native";
import { useTailwind } from "tailwind-rn";

interface IDeviceCardProps {
  device: any;
  svc: DeviceApiService;
  setDeviceCount: any;
  navigation: any;
}

export default function DeviceCard({
  device,
  svc,
  setDeviceCount,
  navigation,
}: IDeviceCardProps) {
  const images = {
    "aircon.png": require("../../assets/images/aircon.png"),
    "intercom.png": require("../../assets/images/intercom.png"),
    "parking.png": require("../../assets/images/parking.png"),
  };
  const tailwind = useTailwind();
  const [isOn, setIsOn] = useState(device.DeviceUser.deviceData.on);

  const handleToggle = () => {
    setIsOn(!isOn);
    device.DeviceUser.deviceData.on = !isOn;
    setDeviceCount((prev: any) => prev + (isOn ? -1 : 1));
    svc.updateDeviceData(device.id, device.DeviceUser.deviceData);
  };

  return (
    <View style={tailwind("p-2")}>
      <View
        style={tailwind(
          "w-full h-56 rounded-3xl p-2 flex flex-col justify-between " +
            (isOn ? "bg-black text-white" : "bg-white text-black")
        )}
      >
        <TouchableHighlight
          onPress={() =>
            navigation.push("DeviceDetails", {
              name: device.name,
              device: device,
            })
          }
          activeOpacity={1}
          underlayColor="transparent"
          style={{
            height: "50%",
          }}
        >
          <Image
            style={{
              width: 40,
              height: 40,
              tintColor: isOn ? "white" : "black",
              marginTop: 8,
              marginLeft: 8,
            }}
            source={images[device.icon]}
          />
        </TouchableHighlight>

        <View style={tailwind("flex flex-row justify-between")}>
          <Text
            style={tailwind(
              "ml-2 w-1/2 h-12 text-sm " + (isOn ? "text-white" : "text-black")
            )}
            onPress={() =>
              navigation.push("DeviceDetails", {
                name: device.name,
                device: device,
              })
            }
          >
            {device.name}
          </Text>
          <View style={tailwind("w-1/2 flex flex-col items-end")}>
            <Switch
              style={{
                transform: [{ rotate: "270deg" }],
              }}
              trackColor={{ false: "#F7F7F7", true: "#F7F7F7" }}
              thumbColor={isOn ? "#282828" : "#E8E8E8"}
              ios_backgroundColor="#F7F7F7"
              onValueChange={handleToggle}
              value={isOn}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
