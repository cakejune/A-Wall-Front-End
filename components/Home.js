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
  TouchableHighlight
} from "react-native";
import Alarm from "./Alarm";
import Menu from "./Menu";
import Header from "./Header";
import AddAlarmModal from "./AddAlarmModal";
import { useState } from "react";
import { HOST_WITH_PORT } from "../environment";

export default function Home({ styles, user, fakeUser, onLogout }) {
  let jakeAlarms = user?.alarms;
  const handleClose = () => setShowAdd(false);
  const [showAdd, setShowAdd] = useState(false);

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
          console.log(newAlarm)
          jakeAlarms.push(newAlarm)
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
        <Header styles={styles} user={user}/>
        <View
          style={styles.lineStyle}
          ></View>
          </View>
          <Text>Alarms</Text>
        <FlatList
          data={jakeAlarms}
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
        <Menu styles={styles} onLogout={onLogout}/>
        
      </View>
    </SafeAreaView>
  );
}
