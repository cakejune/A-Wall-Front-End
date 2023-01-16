import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TextInput,
  Button
} from "react-native";
import { useState, useEffect } from "react";

export default function LoginPage({onLogin, styles}){

    const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  function onSubmit(e){
    fetch(`http://localhost:3000/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((res)=>
    {
      
      if(res.ok)
      {res.json().then((user)=>
        {
          onLogin(user)
          alert(`Welcome, ${user.username}!`)
        }
      )  
        }
        else
      {res.json().then((err)=>{alert(`${err.errors}`)})
    }
    })
  }

useEffect(()=>{
setUsername("")
setPassword("")
}, [])

return (
    <View style={styles.container}>
    <Text>Login</Text>
    <SafeAreaView>
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
          />
        <Button
        title="Press me"
        onPress={() => onSubmit()}
        />
      </SafeAreaView>
      <StatusBar style="auto" />
      </View>
      )
    }