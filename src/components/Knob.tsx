import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTailwind } from "tailwind-rn";
import { Dial } from "./Dial";

export default function Knob() {
  const tailwind = useTailwind();
  const [value, setValue] = useState(20);

  const MIN_VALUE = 10;
  const MAX_VALUE = 30;

  const MAX_RADIUS = 0;
  const MIN_RADIUS = 0;
  const DIF_RADIUS = MAX_RADIUS - MIN_RADIUS;

  const valueWithinLimits = (v: any) =>
    Math.min(Math.max(v, MIN_VALUE), MAX_VALUE);

  const styles = StyleSheet.create({
    responderStyle: {
      backgroundColor: "white",
      elevation: 3,
      shadowColor: "rgba(0,0,0,.7)",
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 10,
      borderRadius: 500,
    },
    wheelWrapper: {
      borderRadius: 120,
      elevation: 5,
      padding: 0,
      shadowColor: "rgba(0,0,0,.7)",
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 10,
      zIndex: 1,
    },
  });

  return (
    <View style={tailwind("")}>
      <Dial
        initialRadius={(value * DIF_RADIUS) / 100 + MIN_RADIUS}
        initialAngle={0}
        radiusMax={MAX_RADIUS}
        radiusMin={MIN_RADIUS}
        // onPress={() => this.toggle()}
        responderStyle={styles.responderStyle}
        wrapperStyle={styles.wheelWrapper}
        onValueChange={(a, r) => {
          // console.log(r);
          // console.log(a);
        }}
      />
    </View>
  );
}
