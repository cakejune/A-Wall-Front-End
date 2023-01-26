import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, View, Button } from "react-native";

export default function UserProfile({route, navigation}){
    return(
        <View>
            <Text>Welcome, {route.params.user.username}</Text>
            <Button
            title="logout"
            onPress={route.params.onLO}></Button>
        </View>
    )
}