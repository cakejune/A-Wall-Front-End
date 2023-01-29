import React from "react";
import {
  Modal,
  Text,
  View,
  Button,
  TextInput,
  TouchableHighlight,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { HOST_WITH_PORT } from "../environment";

export default function AddAlarmModal({
  submitNewAlarm,
  styles,
  handleClose,
  show,
}) {
  const [time, setTime] = useState(new Date());
  const [mode, setMode] = useState("time");
  const [newAlarmName, setNewAlarmName] = useState("");

  const onChange = (event, selectedTime) => {
    const currentTime = selectedTime;
    setTime(currentTime);
  };

  function handleSubmitAlarm() {
    const formattedTime = time.toTimeString().split("").splice(0, 5).join("")
    submitNewAlarm(formattedTime, newAlarmName);
    handleClose();
  }

  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={show}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
                alignContent: "center",
              }}
            >
              <TouchableOpacity onPress={handleClose}>
                <Text style={{ fontSize: 20, color: "#313639" }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity>
              <Text style={{ fontSize: 20 }}>Add New Alarm</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSubmitAlarm}>
                <Text style={{ fontSize: 20, color: "#313639" }}>Add</Text>
              </TouchableOpacity>
            </View>
            <TextInput
              style={{ height: 40, margin: 12, borderWidth: 1, padding: 10 }}
              onChangeText={setNewAlarmName}
              value={newAlarmName}
              placeholder="Your Alarm Title Here"
            />
            <DateTimePicker
              testID="dateTimePicker"
              value={time}
              mode="time"
              is24Hour={true}
              onChange={onChange}
              display="spinner"
              neutralButton={{ label: "Clear", textColor: "grey" }}
              textColor="black"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

// centeredView: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 5
//   },
//   modalView: {
//     margin: 20,
//     backgroundColor: "#F0EAD6",
//     borderRadius: 20,
//     padding: 35,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//   },
