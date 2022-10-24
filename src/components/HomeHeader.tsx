import { useTailwind } from "tailwind-rn";
import { View, Text, Image } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome5";

interface IHomeHeaderProps {
  temp: any;
  deviceCount: any;
  navigation: any;
}

export default function HomeHeader({
  temp,
  deviceCount,
  navigation,
}: IHomeHeaderProps) {
  const tailwind = useTailwind();
  const userProfilePicture = require("../../assets/images/user-avatar.jpg");

  return (
    <View
      style={tailwind(
        "flex flex-row justify-between items-start pt-8 pl-3 pr-3 pb-3 bg-white h-auto"
      )}
    >
      <View style={tailwind("w-4/6 flex flex-row")}>
        <Image
          style={tailwind("w-12 h-12 rounded-full")}
          source={userProfilePicture}
        />
        <View style={tailwind("flex flex-col ml-2 p-1 justify-between")}>
          <Text>
            Hi, <Text style={tailwind("font-bold")}>Lucy Connor</Text>
          </Text>
          <Text>{deviceCount} device on</Text>
        </View>
      </View>
      <View style={tailwind("p-2 my-auto bg-[#F3F6F2] rounded-full font-bold")}>
        <Text
          style={tailwind("text-[#B8BEB3]")}
          onPress={() => navigation.navigate("Weather")}
        >
          <Icon name="thermometer" size={16} color="#B8BEB3" />{" "}
          <Text style={tailwind("font-bold")}>{temp}</Text>°C
        </Text>
      </View>
    </View>
  );
}
