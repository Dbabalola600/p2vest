import { Octicons } from "@expo/vector-icons"
import { DrawerActions, useIsFocused, useNavigation } from "@react-navigation/native"
import { View, Pressable } from "react-native"
import apptw from "../../utils/lib/tailwind"
import AppText from "./AppText"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RootStackParamList } from "../../screens/allroutes"
import UserImage from "../../assets/icons/Ellipse 4.svg"
import { useEffect, useState } from "react"
import { SecureStorage } from "../../services/secureStorage"


// type ScreenProps = NativeStackScreenProps<RootStackParamList, "DashBoardScreen">


export default function MainHeader() {
    const [user, setUser]= useState <any>("")
    const navigation = useNavigation();
    const toggle = () => {
        navigation.dispatch(DrawerActions.toggleDrawer());
    }
    const isFocused = useIsFocused()




    const SetInfo = async () => {
        let lName = await SecureStorage.getInst().getValueFor("lName")
        let fName = await SecureStorage.getInst().getValueFor("fName")
        let AccBal = await SecureStorage.getInst().getValueFor("AccBal")
        let AccNo = await SecureStorage.getInst().getValueFor("AccNo")

        setUser({
            lName,
            fName,
            AccBal,
            AccNo
        })
    }


    useEffect(()=>{
SetInfo()
    },[isFocused])

    return (
        <View style={apptw`flex flex-row justify-between mx-4 mt-10`}>
            <Pressable
                style={apptw` flex-row`}
                onPress={toggle}
            >

                <View
                    style={apptw`rounded-full bg-primary h-15 w-15`}
                >

                    <UserImage
                    style={apptw`mx-auto my-auto h-10 w-10`}
                    height={55}
                    width={55}
                    />

                </View>

                <View style={apptw`my-auto mx-2`}>
                    <AppText>
                    {user.fName} {user.lName}
                    </AppText>
                </View>
            </Pressable>

            <Pressable
                style={apptw`px-5 py-5 bg-secondary rounded-lg `}
                onPress={toggle}
            >

                <Octicons name="bell-fill" size={24} color={`rgba(67, 145, 166, 1)`} />
            </Pressable>
        </View>


    )
}