import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TextInput,
  Button,
  Pressable,
  Modal,
} from "react-native";
import { useState, useEffect } from "react";
import { HOST_WITH_PORT } from "../environment";

export default function LoginPage({
  onLogin,
  styles,
  onRealLogin,
  onSignup,
  onHandleClearCache,
  errors
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signupUsername, setSignupUsername] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupPasswordConfirmation, setSignupPasswordConfirmation] =
    useState("");

  const [show, setShow] = useState(false);
  const [item, setItem] = useState("");
  const showSignup = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setSignupUsername("");
    setSignupPassword("");
    setSignupPasswordConfirmation("");
  };

  function onHandleSubmitLogin(e) {
    onLogin(username, password);
  }

  function onHandleSignup(e) {
    onSignup(signupUsername, signupPassword, signupPasswordConfirmation);
  }

  function onHandleClearCache(e){
    onLogout()
  }

  function showAlarmsTest() {
    fetch(`${HOST_WITH_PORT}/alarms`)
      .then((res) => res.json())
      .then((alarms) => alert(`${alarms[0].just_time}`));
  }

  useEffect(() => {
    setUsername("");
    setPassword("");
  }, []);

  return (
    <>
      <View>
        <SafeAreaView>
          <Text>Login Page</Text>
          <TextInput
            style={styles.input}
            onChangeText={(e) => {
              setUsername(e);
              console.log(username);
            }}
            value={username}
            placeholder="username"
            autoCapitalize="none"
            autoComplete="off"
          />
          <TextInput
            style={styles.input}
            onChangeText={(e) => setPassword(e)}
            value={password}
            placeholder="password"
            autoCapitalize="none"
            autoComplete="off"
            secureTextEntry="true"
          />
          <Text style={{color: "red", alignSelf: 'center'}}>{errors ? errors : ""}</Text>
          <Button title="Log In" onPress={() => onHandleSubmitLogin()} />
          <Button title="Clear Cache" onPress={() => onHandleSubmitLogin()} />
        </SafeAreaView>
      </View>

      <View style={styles.centeredView}>
        <Text>Don't have an account?</Text>
        <Button title="Sign up now" onPress={showSignup} />
        <Modal animationType="slide" transparent={true} visible={show}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Button title="x" onPress={handleClose} />

              <TextInput
                style={styles.input}
                onChangeText={(e) => {
                  setSignupUsername(e);
                }}
                value={signupUsername}
                placeholder="username"
                autoCapitalize="none"
                autoComplete="off"
                placeholderTextColor="#00000056"
              />

              <TextInput
                style={styles.input}
                onChangeText={(e) => setSignupPassword(e)}
                value={signupPassword}
                placeholder="password"
                autoCapitalize="none"
                autoComplete="off"
                secureTextEntry="true"
                placeholderTextColor="#00000056"
              />
              <TextInput
                style={styles.input}
                onChangeText={(e) => setSignupPasswordConfirmation(e)}
                value={signupPasswordConfirmation}
                placeholder="password confirmation"
                autoCapitalize="none"
                autoComplete="off"
                secureTextEntry="true"
                placeholderTextColor="#00000056"
              />
              <Button title="Signup" onPress={() => onHandleSignup()} />
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
}
