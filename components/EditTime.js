import React from "react";
import { Alert, Modal, Text, Pressable, View, Button } from "react-native";
import { useState } from 'react';
import DateTimePicker from "@react-native-community/datetimepicker";

export default function EditTime({ styles, time, title, handleClose, show }) {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
//   const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    handleClose;
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

  //   const [modalVisible, setModalVisible] = useState(show);
  // console.log(time)
  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={show}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            
            <Text>selected: {date.toLocaleString()}</Text>
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={"time"}
                is24Hour={true}
                onChange={onChange}
              />
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
