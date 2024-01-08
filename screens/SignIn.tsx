import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, TextInput } from "react-native";
import AppButton from "../components/Display/AppButton";
import AppText from "../components/Display/AppText";
import AppTextField from "../components/Input/AppTextField";
import BasicBackButtonLayout from "../components/Layout/BasicBackButtonLayout";
import apptw from "../utils/lib/tailwind";
import { RootStackParamList } from "./allroutes";
import PressAppText from "../components/Display/PressAppText";
import Login from "../assets/icons/Login.svg"

import { Feather } from '@expo/vector-icons';
import Key from "../assets/icons/key.svg"
import InitialzeAll from "./initializeAll";

type SignInScreen = NativeStackScreenProps<
    RootStackParamList,
    "SignIn"
>;

const SignIn = ({ navigation }: SignInScreen) => {
    const [isButtonLoading, setButtonLoading] = useState(false)

    const navigatetoDashBoard = () => {
        navigation.navigate("DashBoardScreen")
    }


    const navigateToSignUp = () => {
        navigation.navigate("SignUp")
    }


    useEffect(() => {
        let result = InitialzeAll()


    }, [])

    return (
        <BasicBackButtonLayout>
            <View style={apptw`mt-30`}>
                <View style={apptw`mx-auto`}>
                    <Login />
                </View>
                <ScrollView
                    style={apptw`px-5 mt-5`}
                    contentContainerStyle={apptw.style(` justify-between`, {
                        flexGrow: 1,
                    })}
                >
                    <View style={apptw`gap-y-10`}>



                        <View
                            style={apptw` bg-white rounded-lg py-5 px-2  border flex-row`}
                        >
                            <Feather name="users" size={24} color="rgba(67, 145, 166, 1)" />
                            <TextInput
                                placeholder="Username"
                                style={apptw`px-2 w-full`}
                            />
                        </View>



                        <View
                            style={apptw` bg-white rounded-lg py-5 px-2  border flex-row justify-between`}
                        >
                            <View style={apptw`flex-row`}>
                                <Key height={30} width={30} />
                                <TextInput
                                    placeholder="Password"

                                    style={apptw`px-2 w-full`}
                                />
                            </View>




                            <PressAppText
                                // onPress={navigatetoForgotPassword}
                                style={apptw`text-primary `}
                            >
                                Forgot
                            </PressAppText>


                        </View>


                        <AppButton
                            buttonStyle={apptw`  my-6`}
                            // text={isButtonLoading ? "Loading..." : "Sign In"}
                            onPress={navigatetoDashBoard}
                            text="Sign In"

                        />






                    </View>

                </ScrollView>
                <View style={apptw` flex top-[20] left-[1]  `} >
                    <View style={apptw`mb-19 flex-row  justify-between mx-auto bg-`}>




                        <AppText style={apptw`self-center text-zinc-400 text-[4]`}>
                            Don't have an account?





                        </AppText>
                        <PressAppText
                            onPress={navigateToSignUp}
                            style={apptw`text-primary`}>
                            Sign Up
                        </PressAppText>



                    </View>

                </View>



            </View>
        </BasicBackButtonLayout>
    )
}




const styles = StyleSheet.create({
    Container: {
        // flex: 1,
        // justifyContent: 'flex-end',
        // alignItems: 'center',
        flexShrink: 0

    },

});

export default SignIn;