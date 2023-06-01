import React, { useRef, useState } from "react";
import {
  View,
  Animated,
  StyleSheet,
  TouchableOpacity,
  Text,
  PanResponder,
  SafeAreaView,
} from "react-native";

const AnimationComponent = () => {
  const [isAnimating, setIsAnimating] = useState(false); // Animation status
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const listData = [
    "Silicon Valley",
    "Game of Thrones",
    "Big Bang Theory",
    "Prison Break",
    "Citizen Khan",
    "Divinci Demons",
    "Mr. Robot",
    "House of Cards",
    "Sherlock Holmes",
    "The Witcher",
    "Squid Game",
    "Beef",
    "Money Heist",
  ]; // Sample data for the FlatList
  const listOpacity = useRef(new Animated.Value(0)).current;
  const pan = useRef(listData.map(() => new Animated.ValueXY())).current;
  const animation = useRef(null);

  const startAnimation = () => {
    setIsAnimating(true); // Set animation status to true

    const fadeIn = Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    });

    const fadeOut = Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1500,
      useNativeDriver: true,
    });

    const loopAnimation = Animated.sequence([fadeIn, fadeOut]);

    const loop = Animated.loop(loopAnimation, {
      iterations: -1, // -1 means infinite loop
      delay: 5000, // Delay of 5 seconds between each iteration
    });

    animation.current = loop;
    loop.start();

    // Example animation using Animated.decay
    Animated.decay(listOpacity, {
      velocity: 0.5,
      deceleration: 0.997,
      useNativeDriver: true,
    }).start();

    // Example animation using Animated.spring
    Animated.spring(listOpacity, {
      toValue: 1,
      useNativeDriver: true,
    }).start();

    // Example parallel animation using Animated.parallel
    Animated.parallel([
      Animated.timing(listOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      // Add more parallel animations here
    ]).start();
  };

  const stopAnimation = () => {
    setIsAnimating(false); // Set animation status to false

    if (animation.current) {
      animation.current.stop(() => {
        // Animation stopped callback
        fadeAnim.setValue(0);
      });
    }
  };

  // Example interpolation for the list opacity
  const interpolatedListOpacity = listOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const createPanResponder = (index) =>
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        pan[index].x.setValue(gestureState.dx);
      },
      onPanResponderRelease: () => {
        Animated.sequence([
          Animated.timing(pan[index].x, {
            toValue: -50,
            duration: 200,
            useNativeDriver: false,
          }),

          Animated.timing(pan[index].x, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
          }),

          Animated.timing(pan[index].x, {
            toValue: 50,
            duration: 200,
            useNativeDriver: false,
          }),
        ]).start();
      },
    });

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={isAnimating ? stopAnimation : startAnimation} // Toggle between start and stop animation
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          {isAnimating ? "Stop Animation" : "Start Animation"}
        </Text>
      </TouchableOpacity>
      <View style={styles.content}>
        <Animated.View style={[styles.box, { opacity: fadeAnim }]} />
        <Animated.FlatList
          style={{ opacity: interpolatedListOpacity }}
          data={listData}
          keyExtractor={(item) => item.toString()}
          renderItem={({ item, index }) => (
            <Animated.View
              style={[
                styles.listItem,
                { transform: [{ translateX: pan[index].x }] },
              ]}
              {...createPanResponder(index).panHandlers}
            >
              <Text style={styles.listItemText}>{item}</Text>
            </Animated.View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
  },
  content: {
    flex: 1,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  box: {
    width: 200,
    height: 200,
    backgroundColor: "red",
  },
  listItem: {
    backgroundColor: "green",
    padding: 10,
    marginVertical: 5,
  },
  listItemText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AnimationComponent;
