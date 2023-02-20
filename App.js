import {useFonts} from "expo-font";
import {StatusBar} from "expo-status-bar";
import {StyleSheet, View} from "react-native";

import UnAuth from "./src/screen/UnAuth";

export default function App() {
  // const [loaded, error] = useFonts({
  //   "Popins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
  //   "Popins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
  //   "Popins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
  // });
  // if (loaded) {
  //   console.log(loaded, error);
  //   return <Text preset="p1">Font Loaded...</Text>;
  // }
  return (
    <View style={styles.container}>
      <>
        <UnAuth />
      </>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
