import React from "react";
import { View, StyleSheet } from "react-native";
import AnimationComponent from "./src/AnimationComponent";
// import BallAnimationApp from "./src/InterpolationExample";

const App = () => {
  return (
    <View style={styles.container}>
      <AnimationComponent />
      {/* <BallAnimationApp /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
