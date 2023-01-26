import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";

const Menu = ({ styles, onLogout }) => {
  const navigation = useNavigation();
  const friendsIcon = require("/home/cakejune/Development/code/phase-5/active-storage-test/aWallExpo/components/Header.js");
  const homeIcon = require("/home/cakejune/Development/code/phase-5/active-storage-test/aWallExpo/assets/home-icon.png");

  return (
    <View style={styles.menuContainer}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("About")}
      >
        <Image
          style={{
            width: 25,
            height: 25,
            marginBottom: 20,
            opacity: 0.8,
            borderRadius: 0,
          }}
          source={friendsIcon}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={onLogout}>
        <Text>Log Out</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Home")}
      >
        <Image
          style={{
            width: 25,
            height: 25,
            marginBottom: 20,
            opacity: 0.8,
            borderRadius: 0,
          }}
          source={homeIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Menu;
