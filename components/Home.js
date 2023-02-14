import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  Button,
  FlatList,
  Dimensions,
  View,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity
} from "react-native";
import Alarm from "./Alarm";
import Menu from "./Menu";
import Header from "./Header";
import AddAlarmModal from "./AddAlarmModal";
import { useEffect, useState } from "react";
import { HOST_WITH_PORT } from "../environment";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home({ styles, user, fakeUser, onLogout }) {
  // const jsonUser = JSON.parse(user);
  let jakeAlarms = userAlarms
  const handleClose = () => setShowAdd(false);
  const [showAdd, setShowAdd] = useState(false);
  const [homeUser, setHomeUser] = useState(user)
  const [errors, setErrors] = useState("")
  const [userAlarms, setUserAlarms] = useState([])
  const [refreshAlarms, setRefreshAlarms] = useState(false)
  const [showRemoveAlarms, setShowRemoveAlarms] = useState(false)

  useEffect(()=>{
      AsyncStorage.getItem('user').then((user) => {
          setHomeUser(user)
          console.log(homeUser)
          fetchUserAlarms();
      });
  },[refreshAlarms])

  function fetchUserAlarms(){
    fetch(`${HOST_WITH_PORT}/users/${user.id}/alarms`).then((res)=>{
      if(res.ok){
        res.json().then((userAlarms)=>setUserAlarms(userAlarms))
        console.log(userAlarms)
      }
      else{
        res.json().then((err)=>setErrors(err.error))
      }
    })
  }

  function addNewAlarm(newAlarm_Time, newAlarm_Name, newAlarm_Owner){
    fetch(`${HOST_WITH_PORT}/alarms`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        alarm_time: newAlarm_Time,
        name: newAlarm_Name,
        user_id: user.id
      }),
    })
    .then((res)=> {
      if (res.ok) {
        res.json().then((newAlarm)=>{
          setRefreshAlarms(!refreshAlarms)
        })
      }
      else{
        res.json().then((err)=>{
            console.log(`${err.errors}`);
        })
      }
    })
  }
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={{position: 'sticky'}}>
        <Header styles={styles} user={homeUser}/>
        <View
          style={styles.lineStyle}
          ></View>
          </View>
          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', height: '5%', alignItems: 'center'}}>
          <Text>{userAlarms.length>0 ? `Alarms: ${userAlarms.length}` : errors} User-Id: {user.id}</Text>
          <TouchableOpacity onPress={()=>setShowRemoveAlarms(!showRemoveAlarms)}><Text> edit </Text></TouchableOpacity>
          </View>
        <FlatList
          data={userAlarms}
          renderItem={({ item, index }) => {
            return (
              <Alarm
                styles={styles}
                title={item.name}
                time={item.just_time}
                alarmTime={item.alarm_time}
                alarmId={item.id}
                sounds={item.audio_files}
                userId={user.id}
                showRemoveAlarms={showRemoveAlarms}
              />
            );
          }}
          keyExtractor={(item) => item.id}
        />
        <View style={{width: '100%', display: 'flex', alignItems: 'center'}}>
        <TouchableHighlight 
        underlayColor={`rgba(0,0,255,0.5)`}
        style={styles.addAlarmButton}
        onPress={()=>setShowAdd(true)}>

          <Text style={{fontSize: 30}}>+</Text>
        </TouchableHighlight>
        </View>
        <AddAlarmModal
        show={showAdd}
        submitNewAlarm={addNewAlarm}
        styles={styles}
        handleClose={handleClose}
        />
     
        <View styles={{flexDirection: "row"}}>
        <View style={styles.lineStyle}></View>
        <Menu styles={styles} onLogout={onLogout} user={homeUser}/>
        
      </View>
    </SafeAreaView>
  );
}
