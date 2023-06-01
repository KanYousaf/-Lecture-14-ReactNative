# Lecture-14-ReactNative
Using Animation API to perform animations on different React Native components

## Installing the React Native Reanimated library
1. To install the React Native Reanimated library, run this command inside your Expo project:
    - npx expo install react-native-reanimated

2. In babel.config.js file, paste below code: 
``` javascript
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: ["react-native-reanimated/plugin"],
  };
};
```
## Method to run this project:
1. Clone directory (git clone https://github.com/KanYousaf/Lecture-14-ReactNative) or download ZIP to extract folder
2. Use powershell or VS code terminal to goto the project directory
3. Run command "npm install" (It will install the necessary packages of package.json file)
4. Run command "expo start"
