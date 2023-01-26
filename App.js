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
import Home from "./components/Home";
import LoginScreen from "react-native-login-screen";
import { useState, useEffect, useCallback } from "react";
import { HOST_WITH_PORT } from "./environment";
import LoginPage from "./components/LoginPage";
import { Audio } from "expo-av";
import Appstyles from "./App.scss";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { ScrollView } from "react-native-web";
import About from "./components/About";
import Menu from "./components/Menu";
import Header from "./components/Header";
import UserProfile from "./components/UserProfile";

const screen = Dimensions.get("window");

export default function App() {
  const [user, setUser] = useState("");
  const [errors, setErrors] = useState([]);
  const [fakeUser, setFakeUser] = useState(null);
  

  useEffect(() => {
    //auto-login
    fetch(`${HOST_WITH_PORT}/jake`, { mode: "no-cors" }).then((r) => {
      if (r.ok) {
        r.json().then((jake) => {
          setUser(jake);
        });
      }
    });
  }, [fakeUser]);

  const Stack = createNativeStackNavigator();
  

  return (
    <>
    <NavigationContainer>
        <Header styles={styles} user={user} onLogout={()=>setUser(null)}/>
        <View
          style={styles.lineStyle}
        ></View>
      <Stack.Navigator initialRouteName="Home">
        {/*Home Screen below*/}
        <Stack.Screen
        name="Home"
        options={{
          headerShown: false,
        }}>
          {() => user ? 
          <Home onLogout={()=>setUser(null)} styles={styles} user={user} fakeUser={fakeUser}/> 
          : <LoginPage onLogin={setFakeUser} styles={styles} user={user}/>}
        </Stack.Screen>
        {/* Notification Screen */}
        <Stack.Group
        screenOptions={{headerStyle: {
        backgroundColor: '#F0EAD6'}}}>
        <Stack.Screen name="About" component={About}
        options={{
          headerTitleStyle: {
            fontSize: 25,
            
          
          },
          headerTitle: "About",
          headerTitleAlign: "left",
        }}/>
        <Stack.Screen name="UserProfile" user={user} component={UserProfile}
        options={{
          
          headerTitleStyle: {
            fontSize: 15,
          },
          headerTitle: "Profile",
          headerTitleAlign: "left",
        }}
        />
        </Stack.Group>
      </Stack.Navigator>
    <View styles={{flexDirection: "column"}}>
        <View style={styles.lineStyle}></View>
        <Menu styles={styles} onLogout={()=>setUser(null)}/>
        <View
          style={[
            styles.lineStyle,
            {
              marginVertical: 40,
            },
          ]}
        ></View>
      </View>
    </NavigationContainer>
    
    
    </>
  );
}

const styles = StyleSheet.create({
  alarm: {
    backgroundColor: "#F0EAD6",
    borderRadius: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  item: {
    backgroundColor: "#F0EAD6",
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
    color: "#313639",
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
    borderRadius: 20,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  lineStyle: {
    marginBottom: 0,
    borderWidth: 0.8,
    borderColor: "grey",
  },
  menuContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  headerContainer:{
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 80,
    marginLeft: 10,
    alignItems: "flex-start",
    backgroundColor: "#F0EAD6"
  },
  headerIcons: {

  },
  headerThumbnail: {

  },
  menuTextStyle:
  {
    textTransform: "uppercase",
  },
  textStyle: {
    color: "#313639",
    fontWeight: "bold",
    textAlign: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5
  },
  modalView: {
    margin: 20,
    backgroundColor: "#F0EAD6",
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
    backgroundColor: `rgba(0,0,255,0.2)`,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',      
    left: 0,
    right: 0,
    paddingTop: 10         
  },
  headerText: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center'
  },
});
