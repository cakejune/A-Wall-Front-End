import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  Button,
  FlatList,
  Dimensions,
  View,
  ScrollView,
} from "react-native";
import react from "react";
import Alarm from "./Alarm";
import { Audio } from "expo-av";
import Menu from "./Menu";

export default function Home({ styles, user, fakeUser, onLogout }) {
  const jakeAlarms = user?.alarms;
  
  return (
    <View>
        <View>
          
        </View>
        <FlatList
          data={jakeAlarms}
          renderItem={({ item, index }) => {
            return (
              <Alarm
                styles={styles}
                title={item.name}
                time={item.just_time}
                alarmTime={item.alarm_time}
                alarmId={item.id}
                sounds={item.audio_files}
              />
            );
          }}
          keyExtractor={(item) => item.id}
        />
        <Button
        title="hey">

        </Button>    
    </View>
  );
}
