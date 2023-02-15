import React, { useEffect } from "react";
import { useState } from "react";
import EditTime from "./EditTime";
import {
  HOST_WITH_PORT,
  A_WALL_USER_2_ACCESS_KEY_ID,
  A_WALL_2_SECRET_ACCESS_KEY,
} from "../environment";
import {
  Text,
  View,
  Pressable,
  Button,
  FlatList,
  Alert,
  TouchableOpacity,
  Image,
  TouchableHighlight,
} from "react-native";
import RecorderModal from "./RecorderModal";
import Appstyles from "../App.scss";
import { Audio } from "expo-av";
// import RNFetchBlob from "react-native-fetch-blob";
import AlarmMessages from "./AlarmMessages";

export default function Alarm({
  alarmTime,
  alarmId,
  title,
  time,
  styles,
  sounds,
  userId,
  showRemoveAlarms,
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
  const [alarmSoundIndex, setAlarmSoundIndex] = useState(null);
  const [showSounds, setShowSounds] = useState(false);
  const [messagesVisible, setMessagesVisible] = useState(false);
  const recordIcon = require("/home/cakejune/Development/code/phase-5/active-storage-test/aWallExpo/assets/118789_media_record_icon.png");
  const messagesIcon = require("/home/cakejune/Development/code/phase-5/active-storage-test/aWallExpo/assets/134220_play_next_icon.png");

  function alertAndClose() {
    Alert.alert("Submitted", "Your recording has been submitted", [
      {
        text: "OK",
        onPress: () => {
          handleCloseRecorder();
        },
        style: "cancel",
      },
    ]);
  }

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
        setAlarmSoundIndex(0);
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

  async function startAlarmChain() {
    setAlarmSoundIndex(0);
  }

  useEffect(() => {
    if (alarmSoundIndex !== null && alarmSounds[alarmSoundIndex]) {
      playAlarmOneByOne(alarmSoundIndex);
    } else {
      console.log("no alarms will play just yet");
    }
  }, [alarmSoundIndex]);

  const setNextAlarmTimer = (timer) => {
    setTimeout(() => {
      setAlarmSoundIndex(alarmSoundIndex + 1);
    }, timer + 500);
    return () => clearTimeout(timer);
  };

  const playAlarmOneByOne = async (soundIndex) => {
    const { sound } = await Audio.Sound.createAsync({
      uri: alarmSounds[soundIndex].url,
    });
    sound.playAsync();
    setNextAlarmTimer(alarmSounds[soundIndex].duration);
  };

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

  async function playSound(audio_file) {
    // console.log(audio_file)
    setCurrentSound(null);
    const { sound } = await Audio.Sound.createAsync({ uri: audio_file.url });
    sound.playAsync();
    setCurrentSound(sound);

    console.log(sound);
  }
  function displayRemoveAlarm() {
    Alert.alert(
      "",
      "Are you sure you want to delete this alarm? All of its messages will be deleted along with it.",
      [
        {
          text: "delete",
          onPress: () => {
            deleteAlarm(alarmId)
            console.log("deleteAlarm function");
          },
          style: "cancel",
        },
        {
          text: "cancel",
          onPress: () => {
            console.log("deletion cancelled.");
          },
        },
      ]
    );
  }

  function deleteAlarm(alarmId) {
    fetch(`${HOST_WITH_PORT}/alarms/${alarmId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        res.json();
      } else {
        res.json((err) => console.log(err));
      }
    });
  }

  function confirmDelete(alarmId, audioId) {
    Alert.alert("", "Are you sure you want to delete this recording?", [
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
          console.log("deletion cancelled.");
        },
      },
    ]);
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
        <Pressable
          style={{
            backgroundColor: "#2196F35a",
            borderWidth: 1,
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <View style={{ display: "flex", flexDirection: "row" }}>
              <TouchableOpacity
                style={{ display: showRemoveAlarms ? "" : "none" }}
                onPress={displayRemoveAlarm}
              >
                <Text style={styles.removeAlarmButton}> ⊝ </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShow(true)}>
                <Text style={styles.alarmTime}>{newJustTime}</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={{ justifyContent: "center", marginRight: 20 }}
              onPress={() => setRecorderVisible(true)}
            >
              <Image
                style={{
                  width: 32,
                  height: 32,
                  marginBottom: 20,
                  opacity: 0.8,
                  borderRadius: 0,
                }}
                source={recordIcon}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Text style={styles.textStyle}>Alarm Title: {title}</Text>
            <TouchableOpacity
              style={{ justifyContent: "center", marginRight: 20 }}
              onPress={() => setShowSounds(true)}
            >
              <Image
                style={{
                  width: 23,
                  height: 23,
                  marginBottom: 20,
                  opacity: 0.8,
                  borderRadius: 0,
                }}
                source={messagesIcon}
              />
            </TouchableOpacity>
          </View>
          <View style={{ width: "100%" }}>
            <Button
              title={messagesVisible ? "v" : ">"}
              onPress={() => setMessagesVisible(!messagesVisible)}
            />
          </View>
        </Pressable>

        {/* <Button
          title="Play All Sounds"
          onPress={() => setAlarmSoundIndex(0)}
        ></Button> */}
        {/* <Button
        title={showSounds ? "Hide Sounds" : "View Messages"}
        onPress={()=> setShowSounds(!showSounds)}>

        </Button> */}
        {/* <View style={showSounds ? {display: 'block'} : {display: 'none'}}>
        <FlatList
          data={alarmSounds}
          renderItem={({ item, index }) => {
            return (
              <View>
                <Pressable style={Appstyles.toggle}>
                  <Text onPress={() => playSound(item)}>ID: {item.id}: {item.duration}</Text>
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
        </View> */}
      </View>

      {/* modals */}
      <EditTime
        show={show}
        handleClose={handleClose}
        styles={styles}
        time={time}
        title={title}
        alarmId={alarmId}
        alarmTime={alarmTime}
        submitTime={submitTime}
        minutesTilAlarm={minutesTilAlarm}
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
      <AlarmMessages
        alarmSounds={alarmSounds}
        show={showSounds}
        handleClose={() => setShowSounds(false)}
        confirmDelete={confirmDelete}
        styles={styles}
        playSound={playSound}
        alarmId={alarmId}
      />
    </>
  );
}
