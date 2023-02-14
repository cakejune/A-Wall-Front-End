import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity, View, Text, Image, SafeAreaView } from "react-native";

const Menu = ({ styles, onLogout, user }) => {
  const navigation = useNavigation();
  const friendsIcon = require("/home/cakejune/Development/code/phase-5/active-storage-test/aWallExpo/assets/friends.png");
  const homeIcon = require("/home/cakejune/Development/code/phase-5/active-storage-test/aWallExpo/assets/home-icon.png");
  const logoutIcon = require("/home/cakejune/Development/code/phase-5/active-storage-test/aWallExpo/assets/9104226_room_door_exit_entrance_hotel_icon.png")

  return (
    <SafeAreaView style={styles.menuContainer}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Friends', {user: user})}
      >
        <Image
          style={{
            width: 30,
            height: 30,
            marginBottom: 20,
            opacity: 0.8,
            borderRadius: 0,
          }}
          source={friendsIcon}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={onLogout}>
      <Image
          style={{
            width: 32,
            height: 32,
            marginBottom: 20,
            opacity: 0.8,
            borderRadius: 0,
          }}
          source={logoutIcon}
        />
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
    </SafeAreaView>
  );
};

export default Menu;
