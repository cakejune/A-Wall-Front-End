import React, { useEffect } from "react";
import { useState } from "react";
import EditTime from "./EditTime";
import {
  HOST_WITH_PORT,
  A_WALL_USER_2_ACCESS_KEY_ID,
  A_WALL_2_SECRET_ACCESS_KEY,
} from "../environment";
import { Text, View, Pressable, Button, FlatList, Alert } from "react-native";
import RecorderModal from "./RecorderModal";
import Appstyles from "../App.scss";
import { setStatusBarBackgroundColor } from "expo-status-bar";
import { Audio, Playback } from "expo-av";
// import RNFetchBlob from "react-native-fetch-blob";

export default function Alarm({
  playTestSound,
  alarmTime,
  alarmId,
  title,
  time,
  styles,
  sounds,
  refreshAlarms,
}) {
  const [show, setShow] = useState(false);
  const [recorderVisible, setRecorderVisible] = useState(false);
  const handleCloseRecorder = () => setRecorderVisible(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [minutesTilAlarm, setMinutesTilAlarm] = useState(null);
  const [newJustTime, setNewJustTime] = useState(time);
  const [newAlarmTime, setNewAlarmTime] = useState(alarmTime);
  const [currentSound, setCurrentSound] = useState();
  const [alarmSounds, setAlarmSounds] = useState(sounds);

  function alertAndClose() {
    Alert.alert("Submitted", "Your recording has been submitted", [
      {
        text: "OK",
        onPress: () => {
          handleCloseRecorder();
          refreshAlarms();
        },
        style: "cancel",
      },
    ]);
  }
  useEffect(() => {
    console.log("updated alarm sounds flatlist");
  }, [alarmSounds]);

  useEffect(() => {
    return currentSound
      ? () => {
          console.log("Unloading Sound");
          currentSound.unloadAsync();
        }
      : undefined;
  }, [currentSound]);

  useEffect(() => {
    if (minutesTilAlarm) {
      const timer = setTimeout(() => {
        console.log(`This will play after ${minutesTilAlarm} minutes.`);
        playAlarms(alarmSounds);
      }, minutesTilAlarm * 60 * 1000);
      return () => clearTimeout(timer);
    }
  }, [minutesTilAlarm]);

  useEffect(() => {
    var currentDate = new Date(); //To get the Current Date
    const timeInMinutes =
      currentDate.getHours() * 60 + currentDate.getMinutes();
    const alarmInMinutes =
      parseInt(newAlarmTime.split("").splice(11, 2).join("")) * 60 +
      parseInt(newAlarmTime.split("").splice(14, 2).join(""));

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

  async function playAlarms(allSounds) {
    for (let i = 0; i < allSounds.length; i++) {
      const { sound } = await Audio.Sound.createAsync({
        uri: allSounds[i].url,
      });
      sound.playAsync();
      setCurrentSound(sound);
    }
  }

  async function playSound(audio_file) {
    // console.log(audio_file)
    setCurrentSound(null);
    const { sound } = await Audio.Sound.createAsync({ uri: audio_file.url });
    sound.playAsync();
    setCurrentSound(sound);

    console.log(sound);
  }

  function confirmDelete(alarmId, audioId) {
    Alert.alert(
      "",
      "Are you sure you want to delete this recording?",
      [
        {
          text: "confirm",
          onPress: () => {
            deleteAudio(alarmId, audioId);
          },
          style: "cancel",
        },
        {
          text: "cancel",
          onPress: () => {
            console.log('deletion cancelled.')
          },

        }
      ],
    );
  }

  function deleteAudio(alarmId, audioId) {
    fetch(`${HOST_WITH_PORT}/alarms/${alarmId}/messages/${audioId}/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        // 'Access-Key': `${A_WALL_USER_2_ACCESS_KEY_ID}`,
        // 'Secret-Key': `${A_WALL_2_SECRET_ACCESS_KEY}`
      },
    }).then((res) => {
      if (res.ok) {
        res.json();
      } else {
        res.json((err) => console.log(err));
      }
    });
    setAlarmSounds(
      alarmSounds.filter(
        (alarmsWithoutDeleted) => alarmsWithoutDeleted.id != audioId
      )
    );
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
        <FlatList
          data={alarmSounds}
          renderItem={({ item, index }) => {
            return (
              <View>
                <Pressable style={Appstyles.toggle}>
                  <Text onPress={() => playSound(item)}>{item.id}</Text>
                  <Text
                    onPress={() => confirmDelete(alarmId, item.id)}
                    style={{ color: "blue", fontWeight: "bold", marginTop: 40 }}
                  >
                    Delete Sound
                  </Text>
                </Pressable>
              </View>
            );
          }}
          keyExtractor={(item) => item.id}
        />
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
        alertAndClose={alertAndClose}
      />
    </>
  );
}
