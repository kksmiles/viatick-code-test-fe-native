import { useState } from "react";
import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import { useTailwind } from "tailwind-rn";

import StatusCard from "../../components/StatusCard";
import { Dial } from "../../components/Dial";
import { useEffect } from "react";
import { DeviceApiService } from "../../services/DeviceApiService";

export default function Show({ route, navigation }) {
  const meterImage = require("../../../assets/images/meter.png");
  const { title, device } = route.params;
  const tailwind = useTailwind();
  let svc = new DeviceApiService();
  const [deviceData, setDeviceData] = useState({});
  const [hadChange, setHadChange] = useState(false);
  const [updateReady, setUpdateReady] = useState(false);

  const MIN_TEMP = 10;
  const MAX_TEMP = 30;

  const MAX_RADIUS = 0;
  const MIN_RADIUS = 0;
  const DIF_RADIUS = MAX_RADIUS - MIN_RADIUS;

  let t = device.DeviceUser.deviceData.temperature;
  let p = (100 * (t - MIN_TEMP)) / (MAX_TEMP - MIN_TEMP);
  const initialAngle = (180 * (p + 50)) / 100;

  const onChange = (p: any) => {
    setHadChange(true);
    setUpdateReady(false);
    setDeviceData({
      ...deviceData,
      temperature: Math.round((p * (MAX_TEMP - MIN_TEMP)) / 100 + MIN_TEMP),
    });
  };

  const updateOnApi = () => {
    if (hadChange && updateReady) {
      svc.updateDeviceData(device.id, deviceData);
      setHadChange(false);
      setUpdateReady(false);
    }
  };

  useEffect(() => {
    updateOnApi();
    setInterval(() => {
      setUpdateReady(true);
    }, 1000);
  }, [updateReady, hadChange]);

  useEffect(() => {
    setDeviceData(device.DeviceUser.deviceData);
    return () => {};
  }, []);

  const styles = StyleSheet.create({
    responderStyle: {
      elevation: 3,
      shadowColor: "rgba(0,0,0,.7)",
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 10,
      borderRadius: 500,
    },
    wheelWrapper: {
      borderRadius: 120,
      elevation: 5,
      padding: 0,
      shadowColor: "rgba(0,0,0,.7)",
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.8,
      shadowRadius: 10,
      zIndex: 1,
    },
  });

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
      {device.slug == "air-conditioner" && (
        <View style={tailwind("flex justify-center items-center p-5 mt-8")}>
          <View
            style={{
              transform: [{ rotate: "225deg" }],
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={meterImage}
              style={{
                width: 200,
                height: 200,
                resizeMode: "contain",
                position: "absolute",
                transform: [{ rotate: "135deg" }],
              }}
            />

            <View
              style={{
                position: "absolute",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: 270,
                height: 260,
                transform: [{ rotate: "135deg" }],
              }}
            >
              <Text
                style={{
                  color: "#BBB",
                }}
              >
                10°
              </Text>
              <Text
                style={{
                  color: "#BBB",
                  alignSelf: "flex-start",
                }}
              >
                20°
              </Text>
              <Text
                style={{
                  color: "#BBB",
                }}
              >
                30°
              </Text>
            </View>

            <Dial
              initialAngle={initialAngle}
              radiusMax={MAX_RADIUS}
              radiusMin={MIN_RADIUS}
              responderStyle={styles.responderStyle}
              wrapperStyle={styles.wheelWrapper}
              onValueChange={(a, r) => {
                let angle = a % 360;
                let percent = (angle * 100) / 180 - 50;
                onChange(percent);
              }}
            />
          </View>
        </View>
      )}

      <ScrollView style={tailwind("h-full overflow-y-auto")}>
        <View style={tailwind("p-3")}>
          <View style={tailwind("flex flex-row mt-5")}>
            {Object.keys(deviceData).map((key, index) => {
              if (key != "on") {
                return (
                  <StatusCard
                    key={index}
                    label={key}
                    value={
                      deviceData[key] +
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
