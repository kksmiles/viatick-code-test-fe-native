import { Animated, StyleSheet } from "react-native";
import React, { useEffect, useState, useRef } from "react";

interface SkeletonProps {
  width: string | number;
  height: string | number;
}

export default function Skeleton({ width, height }: SkeletonProps) {
  const opacity = useRef(new Animated.Value(0.3));

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity.current, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity.current, {
          toValue: 0.7,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [opacity]);

  const styles = StyleSheet.create({
    skeleton: {
      backgroundColor: "#eee",
      borderRadius: 8,
    },
  });

  return (
    <Animated.View
      style={[{ opacity: opacity.current, height, width }, styles.skeleton]}
    ></Animated.View>
  );
}
