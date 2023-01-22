import React, { useEffect } from "react";
import {
  TouchableOpacity,
  Alert,
  Modal,
  Text,
  View,
  Button,
  Dimensions,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import { HOST_WITH_PORT } from "../environment";
import { Audio, Playback } from "expo-av";
import { TouchableHighlight } from "react-native";
require("/home/cakejune/Development/code/phase-5/active-storage-test/aWallExpo/assets/arcade.wav");
const screen = Dimensions.get("window");

export default function RecorderModal({
  style,
  show,
  handleClose,
  title,
  alarmId,
  alarmTime,
  submitRecording,
}) {
  const [recording, setRecording] = useState();
  const [recordings, setRecordings] = useState([]);
  const [message, setMessage] = useState("");
  const [sound, setSound] = useState();
  const [recordingObject, setRecordingObject] = useState();

  // useEffect(() => {
  //   return sound
  //     ? () => {
  //         console.log("Unloading Sound");
  //         sound.unloadAsync();
  //       }
  //     : undefined;
  // }, [sound]);

  async function startRecordingSingle(){
      try {
        const permission = await Audio.requestPermissionsAsync();
  
        if (permission.status === "granted") {
          await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            shouldDuckAndroid: true,
            interruptionModeAndroid: (Audio.DoNotMix = 1),
            interruptionModeIOS: (Audio.DoNotMix = 1),
            playsInSilentModeIOS: true,
            output: Audio.AUDIO_OUTPUT_ALARM,
          });
  
          const { recordingSingle } = await Audio.Recording.createAsync({
            ios: {
              extension: ".mp4",
              outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_MPEG4AAC,
            },
            android: {
              extension: ".wav",
              outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_MPEG_4,
            },
          });
  
          setRecordingObject(recordingSingle);
        } else {
          setMessage("Please grant permission to app to access microphone");
        }
      } catch (err) {
        console.error("Failed to start recording", err);
      }
    }

    async function stopRecordingSingle() {
      await recordingObject.stopAndUnloadAsync();
      
      setRecordingObject(undefined);
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: false,
      });
      const { soundObject, statusSingle } = await recording.createNewLoadedSoundAsync();
      setSound({
        sound: soundObject,
        duration: getDurationFormatted(statusSingle.durationMillis),
        file: recordingObject.getURI(),
      });
    }
  


  async function startRecording() {
    try {
      const permission = await Audio.requestPermissionsAsync();

      if (permission.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          shouldDuckAndroid: true,
          interruptionModeAndroid: (Audio.DoNotMix = 1),
          interruptionModeIOS: (Audio.DoNotMix = 1),
          playsInSilentModeIOS: true,
          output: Audio.AUDIO_OUTPUT_ALARM,
        });

        const { recording } = await Audio.Recording.createAsync({
          ios: {
            extension: ".mp4",
            outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_MPEG4AAC,
          },
          android: {
            extension: ".wav",
            outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_MPEG_4,
          },
        });

        setRecording(recording);
      } else {
        setMessage("Please grant permission to app to access microphone");
      }
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function handleSubmitRecording(recording) {
    console.log(recording);
    const file = await fetch(recording.file, { method: "GET" });
    const blob = await file.blob();
    const data = new FormData();
    data.append("file", blob);

    try {
      const response = await fetch(
        `${HOST_WITH_PORT}/alarms/${alarmId}/add_audio_message`,
        {
          method: "PATCH",
          body: data,
        }
      );
      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.error);
      }
      // Handle successful response
    } catch (error) {
      // Handle error
    }
  }

  async function stopRecording() {
    await recording.stopAndUnloadAsync();
    setRecording(undefined);
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      playsInSilentModeIOS: false,
    });
    let updatedRecordings = [...recordings];
    const { sound, status } = await recording.createNewLoadedSoundAsync();
  
    updatedRecordings.push({
      sound: sound,
      duration: getDurationFormatted(status.durationMillis),
      file: recording.getURI(),
    });

    setRecordings(updatedRecordings);
  }

  function getDurationFormatted(millis) {
    const minutes = millis / 1000 / 60;
    const minutesDisplay = Math.floor(minutes);
    const seconds = Math.round((minutes - minutesDisplay) * 60);
    const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutesDisplay}:${secondsDisplay}`;
  }

  // function getFileLine(){
   
  //     return (
  //       <View key={index} style={style.row}>
          
  //       </View>
  //     )
  // }

  function getRecordingLines() {
    return recordings.map((recordingLine, index) => {
      return (
        <View key={index} style={style.row}>
          <Text style={style.fill}>
            Recording {index + 1} - {recordingLine.duration}
          </Text>
          <Button
            style={style.playbackButton}
            onPress={() => recordingLine.sound.replayAsync()}
            title="Play"
          ></Button>
          <Button
            title="Submit Recording"
            onPress={() => handleSubmitRecording(recordingLine)}
          ></Button>
        </View>
      );
    });
  }
  async function playArcade() {
    const arcade = require("/home/cakejune/Development/code/phase-5/active-storage-test/aWallExpo/assets/arcade.wav");
    const { sound } = await Audio.Sound.createAsync(arcade);
    console.log("Playing Sound");
    await sound.playAsync();
  }

  return (
    <View style={style.centeredView}>
      <Modal animationType="slide" transparent={true} visible={show}>
        <View style={style.centeredView}>
          <View style={style.modalView}>
            <Button title="Play Arcade Sound" onPress={playArcade}></Button>
            <Button title="Close" onPress={handleClose}></Button>
            {/* <TouchableOpacity style={recorderStyles.playbackButton}>
            <Text>CLOSE</Text>
            </TouchableOpacity> */}
            <TouchableHighlight
              style={style.playbackButton}
              underlayColor={`rgba(0,0,255,0.5)`}
              onPress={recording ? stopRecording : startRecording}
            >
              <View>
                <Text>{recordingObject ? "Stop Recording" : "Start Recording"}</Text>
              </View>
            </TouchableHighlight>
            {getRecordingLines()}
            {/* {getFileLine()} */}
          </View>
        </View>
      </Modal>
    </View>
  );
}

//     },
//     button: {
//         borderWidth: 10,
//         borderColor: '#B9AAFF'
//     },
//     buttonText: {
//         fontSize: 45,
//         color: '#B9AAF'
//     },
//     centeredView: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 22,
//     }
// })
