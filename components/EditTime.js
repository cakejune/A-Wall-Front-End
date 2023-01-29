import React from "react";
import { Alert, Modal, Text, Pressable, View, Button } from "react-native";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { HOST_WITH_PORT } from "../environment";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import {RNDateTimePicker} from "@react-native-community/datetimepicker";

export default function EditTime({
  alarmTime,
  submitTime,
  styles,
  time,
  title,
  handleClose,
  show,
  minutesTilAlarm
}) {
  const [date, setDate] = useState(new Date(alarmTime));
  const [mode, setMode] = useState("time");
  const timeUntilAlarm = minutesTilAlarm
  //   const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    if (Platform.OS === "android") {
      handleClose;
      // for iOS, add a button that closes the picker
    }
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  function handleSubmitTime() {
    // console.log(alarmTime)
    // console.log(alarmTime.toString().split("").splice(11,15))
    submitTime(date.toTimeString().split("").splice(0, 5).join(""));
    handleClose();
  }

  //   const [modalVisible, setModalVisible] = useState(show);
  // console.log(time)
  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={show}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Button title="confirm" onPress={handleSubmitTime}></Button>
            <Text>Time Until Alarm: {minutesTilAlarm} minutes</Text>
            {/* {Platform.OS === "android" ? (
              <RNDateTimePicker
                testID="dateTimePickerAndroid"
                value={date}
                mode="time"
                is24Hour={true}
                onChange={onChange}
                display="spinner"
                neutralButton={{ label: "Clear", textColor: "grey" }}
              />
            ) : (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode="time"
                is24Hour={true}
                onChange={onChange}
                display="spinner"
                neutralButton={{ label: "Clear", textColor: "grey" }}
              />
              
            )} */}
            <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode="time"
                is24Hour={true}
                onChange={onChange}
                display="spinner"
                neutralButton={{ label: "Clear", textColor: "grey" }}
                textColor="black"
                
              />
            <Button title="cancel" onPress={handleClose}></Button>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// {/* <Text style={styles.modalText}>{title}</Text>
// <Text style={styles.textStyle}>{time}</Text>
// {/* <Text style={styles.textStyle}>Close</Text> */}
// <Button title="Close" onPress={handleClose}></Button> */}
