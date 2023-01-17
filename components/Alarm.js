import React from "react";
import { useState } from "react";
import EditTime from "./EditTime";
import { HOST_WITH_PORT } from "../environment";
import { Text, View, Pressable } from "react-native";

export default function Alarm({ alarmTime, alarmId, title, time, styles }) {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true);
  function submitTime(newTime) {
    
    fetch(`${HOST_WITH_PORT}/alarms/${alarmId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({        
        alarm_time: newTime
      })
    }).then((res)=> {
      if(res.ok)
      {
        res.json().then((newAlarm)=>{
          console.log(newAlarm.just_time)
        })
      }
      else {
        res.json().then((err)=>{console.log(`${err.errors}`)})
      }
    })

  }
  return (
    <>
      <View style={styles.item}>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setShow(true)}
        >
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.textStyle}>{time} (edit)</Text>
        </Pressable>
      </View>
      <EditTime
        show={show}
        handleClose={handleClose}
        styles={styles}
        time={time}
        title={title}
        alarmId={alarmId}
        alarmTime={alarmTime}
        submitTime={(submitTime)}
      />
    </>
  );
}
