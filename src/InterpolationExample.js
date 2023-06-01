import React, { useState, useRef } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");
const BALL_SIZE = 40;

const BallAnimationApp = () => {
  const [balls, setBalls] = useState([]); // State to hold the balls
  const animationRefs = useRef([]); // Ref to hold the animation references

  const handlePress = () => {
    // Generate a new ball
    const ball = {
      id: Date.now(),
      position: new Animated.ValueXY({
        x: getRandomCoordinate(width - BALL_SIZE),
        y: getRandomCoordinate(height - BALL_SIZE),
      }),
      color: getRandomColor(),
    };

    setBalls((prevBalls) => [...prevBalls, ball]); // Add the new ball to the state

    animateBall(ball); // Start animating the ball
  };

  const animateBall = (ball) => {
    const toValue = {
      x: getRandomCoordinate(width - BALL_SIZE),
      y: getRandomCoordinate(height - BALL_SIZE),
    };

    const duration = getRandomDuration(); // Get a random duration for the animation

    animationRefs.current[ball.id] = Animated.timing(ball.position, {
      toValue,
      duration,
      useNativeDriver: false,
    });
    animationRefs.current[ball.id].start(() => {
      animateBall(ball); // Restart the animation once it completes
    });
  };

  const stopAllBalls = () => {
    animationRefs.current.forEach((animation) => animation.stop()); // Stop all animations
    animationRefs.current = []; // Clear the animation references
    setBalls([]); // Clear the balls from the state
  };

  const getRandomCoordinate = (max) => Math.floor(Math.random() * max); // Get a random coordinate within a range

  const getRandomColor = () => {
    const colors = [
      "red",
      "green",
      "blue",
      "yellow",
      "orange",
      "black",
      "aqua",
      "cyan",
      "magenta",
    ];
    return colors[Math.floor(Math.random() * colors.length)]; // Get a random color from the array
  };

  const getRandomDuration = () => Math.floor(Math.random() * 4000) + 2000; // Get a random duration between 2000ms and 6000ms

  const renderBalls = () => {
    return balls.map((ball) => (
      <Animated.View
        key={ball.id}
        style={[
          styles.ball,
          { backgroundColor: ball.color },
          ball.position.getLayout(),
        ]}
      />
    ));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <View style={styles.buttonText}>
          <Text style={styles.buttonText}>Generate Ball</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={stopAllBalls}>
        <View style={styles.buttonText}>
          <Text style={styles.buttonText}>Stop All Balls</Text>
        </View>
      </TouchableOpacity>
      {renderBalls()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  ball: {
    width: BALL_SIZE,
    height: BALL_SIZE,
    borderRadius: BALL_SIZE / 2,
    position: "absolute",
  },
});

export default BallAnimationApp;
