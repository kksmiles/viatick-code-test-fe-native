import { View, Text, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { useTailwind } from "tailwind-rn";

import { DeviceUserHistory } from "../models/device/DeviceUserHistory";
import { GetUserDeviceHistoriesResponse } from "../models/device/GetUserDeviceHistoriesResponse";
import { DeviceApiService } from "../services/DeviceApiService";

interface IGraphProps {
  deviceUserIds: any;
  svc: DeviceApiService;
}

export default function Graph({ deviceUserIds, svc }: IGraphProps) {
  const tailwind = useTailwind();
  const [deviceUserHistories, setDeviceUserHistories] = useState<
    DeviceUserHistory[]
  >([]);
  const [hourlyEnergyUsage, setHourlyEnergyUsage] = useState<number[]>([]);
  const [todayEnergyUsage, setTodayEnergyUsage] = useState<number>(0);
  const start = new Date().setHours(0, 0, 0, 0);
  const end = new Date().setHours(23, 59, 59, 999);

  const getHourlyRanges = (start: number, end: number) => {
    let ranges = [];
    let current = start;
    while (current <= end) {
      ranges.push(current);
      current += 3600000;
    }
    return ranges;
  };

  let ranges = getHourlyRanges(start, end);
  const fetchHourlyEnergyUsage = () => {
    setHourlyEnergyUsage([]);
    setTodayEnergyUsage(0);
    let takenIds: number[] = [];
    ranges.forEach((range) => {
      let hourlyHistory = deviceUserHistories.filter((history) => {
        return (
          new Date(history.takenAt).getTime() >= range &&
          new Date(history.takenAt).getTime() < range + 3600000
        );
      });
      let hourlyEnergyUsageSum = hourlyHistory.reduce((a, b) => {
        if (!takenIds.includes(b.id)) {
          takenIds.push(b.id);
          setTodayEnergyUsage((prev) => prev + b.usage);
          return a + b.usage;
        }
        return a;
      }, 0);
      setHourlyEnergyUsage((prev) => [...prev, hourlyEnergyUsageSum]);
    });
  };

  const fetchDeviceUserHistories = () => {
    setDeviceUserHistories([]);
    deviceUserIds.forEach((deviceUserId: any) => {
      svc.getDeviceUserHistories(
        deviceUserId,
        new Date(new Date().setHours(0, 0, 0, 0)),
        new Date(new Date().setHours(23, 59, 59, 999)),
        (response: GetUserDeviceHistoriesResponse) => {
          response.data.forEach((history) => {
            setDeviceUserHistories((prev) => [...prev, history]);
          });
        }
      );
    });
  };

  useEffect(() => {
    fetchHourlyEnergyUsage();
    return () => {};
  }, [deviceUserHistories]);

  useEffect(() => {
    fetchDeviceUserHistories();
    return () => {};
  }, [deviceUserIds]);

  return (
    <View style={tailwind("bg-[#E0D5CA] h-full p-5")}>
      <View style={tailwind("flex flex-row")}>
        <Text style={tailwind("font-bold text-sm")}>Usage today</Text>
        <View style={tailwind("bg-black px-4 py-1 ml-2 rounded-full")}>
          <Text style={tailwind("text-xs font-bold text-white")}>
            {todayEnergyUsage}kw
          </Text>
        </View>
      </View>
      <ScrollView style={tailwind("p-2 mt-3")} horizontal={true}>
        <View
          style={tailwind("w-[1100px] h-full flex flex-row justify-between")}
        >
          {ranges.map((range, index) => {
            let hours = new Date(range).getHours();
            let maxUsage = Math.max(...hourlyEnergyUsage, 30);
            let usage = hourlyEnergyUsage[index];
            let height = Math.round((usage / maxUsage) * 100);
            return (
              <View key={index} style={tailwind("flex flex-col")}>
                <View
                  style={tailwind(
                    "flex-1 flex flex-row items-end justify-center"
                  )}
                >
                  <View
                    style={{
                      ...tailwind(
                        "rounded-full w-4 " +
                          (index % 2 ? "bg-[#C59350]" : "bg-black")
                      ),
                      height: `${height}%`,
                    }}
                    // style={tailwind(
                    //   "rounded-full w-4 h-12 " +
                    //     (index % 2 ? "bg-[#C59350]" : "bg-black")
                    // )}
                  ></View>
                </View>
                <Text
                  style={tailwind(
                    "text-xs font-bold text-black text-center mt-3"
                  )}
                >
                  {hours % 12 ? hours % 12 : 12} {hours >= 12 ? "pm" : "am"}
                </Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
