import { View, Text } from "react-native";
import { useTailwind } from "tailwind-rn";
interface IStatusCardProps {
  label: any;
  value: any;
}
export default function StatusCard({ label, value }: IStatusCardProps) {
  const tailwind = useTailwind();
  return (
    <View style={tailwind("p-2 w-1/2")}>
      <View
        style={tailwind(
          "w-full h-28 rounded-3xl p-5 flex flex-col justify-between bg-white"
        )}
      >
        <Text style={tailwind("text-2xl font-bold text-center")}>{value}</Text>
        <Text style={tailwind("text-lg capitalize text-center")}>{label}</Text>
      </View>
    </View>
  );
}
