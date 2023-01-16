import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TextInput,
  Button,
  FlatList,
  Pressable,
} from "react-native";
import LoginScreen from "react-native-login-screen";
import { useState, useEffect } from "react";
import { HOST_WITH_PORT } from "./environment";
import LoginPage from "./components/LoginPage";
import { TouchableOpacity } from "react-native";
import Alarm from "./components/Alarm";

export default function App() {
  const [user, setUser] = useState("");
  const [errors, setErrors] = useState([]);
  const [fakeUser, setFakeUser] = useState(null);
  const jakeAlarms = user.alarms;

  //this is a component

  useEffect(() => {
    //auto-login
    fetch("http://localhost:3000/jake").then((r) => {
      if (r.ok) {
        r.json().then((jake) => {
          setUser(jake);
        });
      }
    });
  }, [fakeUser]);

  return (
    <SafeAreaView style={styles.container}>
      {user ? (
        <>
          <Text>Welcome, {user.username}</Text>
          <FlatList
            data={jakeAlarms}
            renderItem={({ item, index }) => (
              <>
                <Text>{index + 1}</Text>
                
                  <Alarm
                    styles={styles}
                    title={item.name}
                    time={item.just_time}
                
                  />
               
              </>
            )}
            keyExtractor={(item) => item.id}
          />
          <Button title="Log Out" onPress={() => setUser(null)}></Button>
        </>
      ) : (
        <LoginPage onLogin={setFakeUser} styles={styles} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: "#f9c2ff",
    padding: 20,
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
});
