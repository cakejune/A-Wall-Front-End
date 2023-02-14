import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Text, View, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function UserProfile({route, navigation}){
const jsonUser = JSON.parse(route.params.user)
    // const [user, setUser] = useState({})
    // useEffect(()=>{
    //     AsyncStorage.getItem('user').then((asyncUser)=> 
    //     {
    //         setUser(JSON.parse(asyncUser))
    //         console.log(user)
    //     }
    //     )
    // },[])
    return(
        <View>
            <Text>Welcome, {jsonUser.email}!</Text>
            <Button
            title="logout"
            onPress={route.params.onLO}></Button>
            <Button title="see user hash"
            onPress={()=> console.log(jsonUser)}/>
        </View>
    )
}