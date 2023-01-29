import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";

const Header = ({styles, user}) => {
    const profileIcon = require('/home/cakejune/Development/code/phase-5/active-storage-test/aWallExpo/assets/user.png')
    const navigation = useNavigation();

    return( 
    <View style={styles.headerContainer}>
        <TouchableOpacity
        style={styles.headerIcons}
        onPress={()=> navigation.navigate('UserProfile', {user: user})}
        >
            <Image
            style={{width: 40, height: 40, marginBottom: 20, opacity: 0.8, borderRadius: 50}}
            source={profileIcon}/>
        </TouchableOpacity>
        
    </View>
    )


}

export default Header;