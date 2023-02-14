import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Text, View, Button, FlatList, ScrollView, SafeAreaView } from "react-native";
import { HOST_WITH_PORT } from "../environment";


export default function Friends({route}){

    const jsonUser = JSON.parse(route.params.user)
    const [friendRequests, setFriendRequests] = useState([])

useEffect(()=>{
    fetch(`${HOST_WITH_PORT}/${jsonUser.id}/friend_requests`)
    .then((res)=>res.json()).then((requests)=>setFriendRequests(requests))
},[])


function acceptFriend(friendId){
    fetch(`${HOST_WITH_PORT}/accept_friend`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: jsonUser.id,
          friend_id: friendId
        }),
      }).then((res)=>{
        if(res.ok){
            res.json().then((newFriendship)=> console.log(newFriendship))
        }
        else{
            res.json().then((err)=>setErrors(err))
        }
      })
    

}

    return(
        <SafeAreaView>

            <Text>Friends Tab. User Id: {jsonUser.id}</Text>
            <Button title="Pending Friend Requests" onPress={()=>console.log(friendRequests)}></Button>
            
            <FlatList
            style={{height: "100%", flexGrow: 0, backgroundColor: '#2196F35a'}}
          data={friendRequests}
          renderItem={({ item, index }) => {
            return (
            <View style={{backgroundColor: "#2196F3",
            borderWidth: 1,
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",}}>

                <Text style={{fontSize: 10, width: "50%"}}>{item.requestor.email} has requested to follow you. {item.requestor.created_at}</Text>
                <Button title="Accept" onPress={()=>acceptFriend(item.requestor.id)} color={'pink'}/>
                {/* <Pressable><Text color={}>Accept</Text></Pressable> */}
                <Button title="Reject" onPress={()=>console.log("rejected")} color={'black'}/>
            </View>
            );
          }}
          keyExtractor={(item)=>item.id}
          />
         
          </SafeAreaView>
    )
}
