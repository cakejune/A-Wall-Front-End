import React, { useEffect } from "react";
import { useState } from "react";
import EditTime from "./EditTime";
import { HOST_WITH_PORT } from "../environment";
import { Text, View, Pressable, Button } from "react-native";
import RecorderModal from "./RecorderModal";
import Appstyles from '../App.scss';

export default function Alarm({ playTestSound, alarmTime, alarmId, title, time, styles }) {
  const [show, setShow] = useState(false);
  const [recorderVisible, setRecorderVisible] = useState(false);
  const handleCloseRecorder = () => setRecorderVisible(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [minutesTilAlarm, setMinutesTilAlarm] = useState(null);
  const [newJustTime, setNewJustTime] = useState(time);
  const [newAlarmTime, setNewAlarmTime] = useState(alarmTime);
  const [updateTime, setUpdateTime] = useState(true);
  const [goOff, setGoOff] = useState(false)
  
  useEffect(() => {
if(minutesTilAlarm){
    const timer = setTimeout(() => {
      console.log(`This will play after ${minutesTilAlarm} minutes.`)
      playTestSound();
    }, (minutesTilAlarm*60*1000));
    return () => clearTimeout(timer);
  }
  }, [minutesTilAlarm]);

  useEffect(() => {
  
    var currentDate = new Date(); //To get the Current Date
    const timeInMinutes =
      currentDate.getHours() * 60 + currentDate.getMinutes();
    const alarmInMinutes = parseInt(newAlarmTime.split("").splice(11, 2).join("")) * 60 +
      parseInt(newAlarmTime.split("").splice(14, 2).join("")) 
      

    setMinutesTilAlarm(calculateTimeout(timeInMinutes, alarmInMinutes));
  
  }, [newAlarmTime]);

  const calculateTimeout = (currentTime, alarmTime) => {
    let delta = alarmTime - currentTime;
    if (delta > 0) {
      return delta;
    } else {
      return 1440 + delta;
    }
  };
  function submitTime(newTime) {
    fetch(`${HOST_WITH_PORT}/alarms/${alarmId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        alarm_time: newTime,
      }),
    }).then((res) => {
      if (res.ok) {
        res.json().then((newAlarm) => {
          // var newCurrentTime = new Date();
          // newTimeInMinutes = newCurrentTime.getHours() * 60 + newCurrentTime.getMinutes();
          setNewJustTime(newAlarm.just_time);
          setNewAlarmTime(newAlarm.alarm_time);
          // setMinutesTilAlarm(calculateTimeout(newTimeInMinutes, newAlarm.just_time));
        });
      } else {
        res.json().then((err) => {
          console.log(`${err.errors}`);
        });
      }
    });
  }

  function submitRecording(newRecording) {
    console.log(newRecording);
  }

  return (
    <>
      <View style={Appstyles.container}>
        <Pressable style={[styles.buttonOpen]} onPress={() => setShow(true)}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.textStyle}>
            {newJustTime} (edit). Time til alarm: {minutesTilAlarm} minutes
          </Text>
        </Pressable>
        <Button
          title="Recordings"
          onPress={() => setRecorderVisible(true)}
        ></Button>
      </View>
      <EditTime
        show={show}
        handleClose={handleClose}
        styles={styles}
        time={time}
        title={title}
        alarmId={alarmId}
        alarmTime={alarmTime}
        submitTime={submitTime}
      />
      <RecorderModal
        show={recorderVisible}
        handleClose={handleCloseRecorder}
        style={styles}
        title={title}
        alarmId={alarmId}
        alarmTime={alarmTime}
        submitRecording={submitRecording}
      />
    </>
  );
}
