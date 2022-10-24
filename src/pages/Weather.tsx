import React, { useEffect, useState } from "react";
import { ImageBackground, Image, View, Text, Dimensions } from "react-native";
import { useTailwind } from "tailwind-rn";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Coord } from "../models/weather/Coord";
import { CurrentWeatherResponse } from "../models/weather/CurrentWeatherResponse";
import { WeatherApiService } from "../services/WeatherApiService";
import Skeleton from "../components/Skeleton";

export default function Weather({ navigation }) {
  const screen = Dimensions.get("screen");
  const svc = new WeatherApiService();
  const images = {
    welcome: require("../../assets/images/background/welcome.jpg"),
    night: require("../../assets/images/background/night.jpg"),
    morning: require("../../assets/images/background/morning.jpg"),
    afternoon: require("../../assets/images/background/afternoon.jpg"),
  };
  const chevron = require("../../assets/icons/triple-chevron-icon.png");

  let [timeOfDay, setTimeOfDay] = useState<string>("welcome");
  let [currentWeatherResponse, setCurrentWeatherResponse] =
    useState<CurrentWeatherResponse>();
  let [weatherIcon, setWeatherIcon] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [touchStart, setTouchStart] = useState(0);

  const getCoordinates = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      return new Coord(103.8198, 1.3521);
    }
    let location: any = await Location.getCurrentPositionAsync({});
    return new Coord(
      location.coords.longitude ?? 103.8198,
      location.coords.latitude ?? 1.3521
    );
  };

  // Check if current time is morning, afternoon, night
  const checkCurrentTime = (seconds: any) => {
    const date = new Date(0);
    if (seconds) {
      date.setSeconds(seconds);
      var curHr = date.getHours();
    } else {
      var curHr = new Date().getHours();
    }
    if (curHr >= 6 && curHr < 12) {
      setTimeOfDay("morning");
    } else if (curHr >= 12 && curHr < 18) {
      setTimeOfDay("afternoon");
    } else {
      setTimeOfDay("night");
    }
  };

  const getCurrentWeather = async () => {
    const coord = await getCoordinates();
    svc.getCurrentWeather(coord, (response: CurrentWeatherResponse) => {
      checkCurrentTime(response.dt);
      setCurrentWeatherResponse(response);
      setWeatherIcon(
        "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png"
      );
      storeTemp(response.main.temp);
      setIsLoading(false);
    });
  };

  const storeTemp = async (value) => {
    try {
      await AsyncStorage.setItem("@temp", value.toString());
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getCurrentWeather();
    return () => {};
  }, []);

  const tailwind = useTailwind();
  return (
    <View style={tailwind("flex-1")}>
      <ImageBackground
        source={images[timeOfDay]}
        resizeMode="cover"
        style={tailwind("justify-center items-center")}
        blurRadius={2}
      >
        <View
          style={tailwind(
            "flex flex-col justify-between items-center py-16 h-full"
          )}
        >
          <Text
            style={tailwind(
              "text-2xl text-white uppercase tracking-widest h-16 font-bold"
            )}
            onPress={() => navigation.navigate("Welcome")}
          >
            Welcome
          </Text>
          <View style={tailwind("flex-1 flex w-80")}>
            {isLoading ? (
              <Skeleton width={120} height={20} />
            ) : (
              <Text style={tailwind("text-2xl text-white")}>
                {currentWeatherResponse?.name}
              </Text>
            )}
            {isLoading ? (
              <View style={tailwind("mt-5")}>
                <Skeleton width={140} height={40} />
              </View>
            ) : (
              <Text style={tailwind("text-4xl text-white mt-5")}>
                {currentWeatherResponse?.main.temp &&
                  currentWeatherResponse?.main.temp + "°C"}
              </Text>
            )}
            {isLoading ? (
              <View style={tailwind("mt-3")}>
                <Skeleton width={140} height={20} />
              </View>
            ) : (
              <View style={tailwind("flex flex-row")}>
                <Text style={tailwind("text-white mt-3")}>
                  {currentWeatherResponse?.weather[0].main}
                </Text>
                <Image
                  source={{ uri: weatherIcon }}
                  style={tailwind("ml-2 w-10 h-10 mt-1")}
                />
              </View>
            )}
          </View>
          <View
            style={{
              height: 200,
              width: screen.width,
              alignItems: "center",
              alignContent: "center",
              justifyContent: "center",
            }}
            onTouchStart={(e) => setTouchStart(e.nativeEvent.pageY)}
            onTouchEnd={(e) => {
              if (touchStart - e.nativeEvent.pageY > 100) {
                console.log("swipe up");
                navigation.navigate("HomeTabs", { screen: "DeviceList" });
              }
            }}
          >
            <Image
              source={chevron}
              style={{
                tintColor: "#fff",
                resizeMode: "contain",
                height: 80,
                width: 80,
                marginLeft: 10,
                transform: [{ rotate: "270deg" }],
              }}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
