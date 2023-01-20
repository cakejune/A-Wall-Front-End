import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  Button,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Pressable,
} from "react-native";
import LoginScreen from "react-native-login-screen";
import { useState, useEffect } from "react";
import { HOST_WITH_PORT } from "./environment";
import LoginPage from "./components/LoginPage";
import Alarm from "./components/Alarm";
import { Audio } from "expo-av";

const screen = Dimensions.get("window");

export default function App() { 
  const [user, setUser] = useState("");
  const [errors, setErrors] = useState([]);
  const [fakeUser, setFakeUser] = useState(null);
  const jakeAlarms = user?.alarms;
  const [testSound, setTestSound] = useState();
  

  //this is a component

  useEffect(() => {
    //auto-login
    fetch(`${HOST_WITH_PORT}/jake`).then((r) => {
      if (r.ok) {
        r.json().then((jake) => {
          setUser(jake);
        });
      }
    });
  }, [fakeUser]);

  useEffect(() => {
    return testSound
      ? () => {
          console.log("Unloading Sound");
          testSound.unloadAsync();
        }
      : undefined;
  }, [testSound]);

  async function playTestSound(){
    const arcade = require("/home/cakejune/Development/code/phase-5/active-storage-test/aWallExpo/assets/arcade.wav");
    const { sound } = await Audio.Sound.createAsync(arcade);
    setTestSound(sound);
    console.log("Playing Sound");
    await sound.playAsync();
    console.log(sound);
  }

  return (
    <SafeAreaView styles={styles} backgroundColor={'#37004b'} height={screen.height}>
      {user ? (
        <>
          <Text style={styles.title}>Welcome, {user.username}</Text>
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
                  playTestSound={playTestSound}
                />
            )}
          }
            keyExtractor={(item) => item.id}
          />
          {/* <Pressable onPress={playTestSound} style={styles.container}>
            <Text>Play Test Sound</Text>
          </Pressable> */}
          <Button title="Log Out" onPress={() => setUser(null)}></Button>
        </>
      ) : (
        <LoginPage onLogin={setFakeUser} styles={styles} user={user} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  alarm: {
    backgroundColor: '#470061',
    borderRadius: 20
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  item: {
    backgroundColor: "#7d22fd",
    padding: 10,
    backgroundColor: `#33096f`,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  time: {
    fontSize: 20,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
    borderRadius: 20
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  playbackButton: {
    borderWidth: 10,
    borderColor: "#00ddff",
    backgroundColor: `rgba(0,0,255,0.2)`,
    width: screen.width / 2,
    height: screen.width / 2,
    borderRadius: screen.width / 2,
    alignItems: "center",
    justifyContent: "center",

  },
  global: {
    backgroundColor: `rgba(0,0,255,0.2)`
  }
});
