import { ImageBackground, Image, View, Text, Dimensions } from "react-native";
import { useState } from "react";
import { useTailwind } from "tailwind-rn";

export default function Welcome({ navigation }) {
  const logo = require("../../assets/images/logo/logo-border.png");
  const welcome = require("../../assets/images/background/welcome.jpg");
  const chevron = require("../../assets/icons/triple-chevron-icon.png");
  const tailwind = useTailwind();
  const screen = Dimensions.get("screen");
  const [touchStart, setTouchStart] = useState(0);

  return (
    <View style={tailwind("flex-1")}>
      <ImageBackground
        source={welcome}
        resizeMode="cover"
        style={tailwind("justify-center items-center")}
        blurRadius={2}
      >
        <View
          style={tailwind(
            "flex flex-col justify-between items-center py-16 h-full"
          )}
        >
          <View
            style={tailwind("flex flex-row h-16 justify-between items-center")}
          >
            <Text
              style={tailwind(
                "text-2xl text-white uppercase tracking-widest font-bold"
              )}
            >
              Jerovis
            </Text>
            <Image
              source={logo}
              style={{
                tintColor: "#fff",
                resizeMode: "contain",
                height: 30,
                width: 30,
                marginLeft: 10,
              }}
            />
            <Text
              style={tailwind(
                "text-2xl text-white uppercase tracking-widest ml-3 font-bold"
              )}
            >
              Mansion
            </Text>
            {/* <Text style={tailwind("text-xs text-white")}>大厦</Text> */}
          </View>
          <View
            style={{
              height: 200,
              width: screen.width,
              alignItems: "center",
              alignContent: "center",
              justifyContent: "center",
            }}
            onTouchStart={(e) => setTouchStart(e.nativeEvent.pageX)}
            onTouchEnd={(e) => {
              if (e.nativeEvent.pageX - touchStart > 50) {
                console.log("swipe right");
                navigation.navigate("Weather");
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
              }}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
