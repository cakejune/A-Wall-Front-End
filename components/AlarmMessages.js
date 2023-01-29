import React from "react";
import {
  Alert,
  Modal,
  Text,
  Pressable,
  View,
  Button,
  FlatList,
} from "react-native";
import { useState } from "react";
import { HOST_WITH_PORT } from "../environment";
import Appstyles from "../App.scss";

export default function AlarmMessages({
  show,
  styles,
  alarmSounds,
  handleClose,
  confirmDelete,
  playSound,
  alarmId
}) {
  //   const [modalVisible, setModalVisible] = useState(show);
  // console.log(time)
  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={show}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {alarmSounds?.map((alarm) => {
              return (
                <View key={alarm.id}>
                  <Text onPress={() => playSound(alarm)}>
                    ID: {alarm.id}: {alarm.duration}
                  </Text>
                  <Text
                    onPress={() => confirmDelete(alarmId, alarm.id)}
                    style={{
                      color: "blue",
                      fontWeight: "bold",
                      marginTop: 40,
                    }}
                  >
                    Delete Sound
                  </Text>
                </View>
              );
            })}
            <Button title="close" onPress={handleClose}></Button>
          </View>
        </View>
      </Modal>
    </View>
    )
        }

//             <FlatList
//               data={alarmSounds}
//               renderItem={({ item, index }) => {
//                 return (
//                   <View>
//                     <Pressable style={Appstyles.toggle}>
//                       <Text onPress={() => playSound(item)}>
//                         ID: {item.id}: {item.duration}
//                       </Text>
//                       <Text
//                         onPress={() => confirmDelete(alarmId, item.id)}
//                         style={{
//                           color: "blue",
//                           fontWeight: "bold",
//                           marginTop: 40,
//                         }}
//                       >
//                         Delete Sound
//                       </Text>
//                     </Pressable>
//                   </View>
//                 );
//               }}
//               keyExtractor={(item) => item.id}
//             />
//             <Button title="close" onPress={handleClose}></Button>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// }

// {/* <Text style={styles.modalText}>{title}</Text>
// <Text style={styles.textStyle}>{time}</Text>
// {/* <Text style={styles.textStyle}>Close</Text> */}
// <Button title="Close" onPress={handleClose}></Button> */}
