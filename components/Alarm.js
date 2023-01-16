import React from "react";
import { useState } from "react";
import EditTime from "./EditTime";
import { Text, View, Pressable } from "react-native";

export default function Alarm({ title, time, styles }) {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true);
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
      />
    </>
  );
}
