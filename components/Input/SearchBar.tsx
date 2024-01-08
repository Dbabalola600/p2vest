import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Pressable } from 'react-native';
// import Searchbutton from "../../assets/Searchbutton.svg"

import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';


type buttonProp = {
    onPress?: any
    // onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
}


const SearchBar = (props: buttonProp) => {
    const [searchText, setSearchText] = useState('');
    const navigation = useNavigation();

    // const search = () => {
    //   if (searchText !== "") {
    //     navigation.navigate("FindScreen", {find :searchText} )

    //   }
    // }

    const locate = `Users/${searchText}`

    const handlePress = () => {
        // Access the searchText value here
        props.onPress(searchText);
    };
    return (
        <View style={styles.container}>


            <Pressable
                onPress={handlePress}

            >
                <FontAwesome name="search" size={24} color="rgb(62,132,152)" />
            </Pressable>

            <TextInput
                style={styles.input}
                placeholder="Search"
                value={searchText}
                onChangeText={setSearchText}
            />


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'transparent',
        width: "95%",
        backgroundColor:"rgb(81,171,196)",
        padding: 10,
        borderRadius: 10, // Making the container rounded
        margin: 10,
        overflow: 'hidden', // Clip the content to the rounded borders
    },
    input: {
        flex: 1,
        paddingVertical: 5,
        color:"white",
       
    },
});

export default SearchBar;
