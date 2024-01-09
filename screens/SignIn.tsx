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
import { useIsFocused } from "@react-navigation/native";
import { UserBanks } from "../utils/lib/data/MockData";
import { useBankStore } from "../utils/lib/data/bankDetails";
import { Controller, useForm } from "react-hook-form";
import Toast from "react-native-toast-message";

type SignInScreen = NativeStackScreenProps<
    RootStackParamList,
    "SignIn"
>;

const SignIn = ({ navigation }: SignInScreen) => {
    const [isButtonLoading, setButtonLoading] = useState(false)
    const isFocused = useIsFocused()
    const navigatetoDashBoard = () => {
        navigation.navigate("DashBoardScreen")
    }


    const navigateToSignUp = () => {
        navigation.navigate("SignUp")
    }

    const allBanks = useBankStore((state: any) => state.bank)
    const addBanks = useBankStore((state: any) => state.addToBank)
    const clearBanks = useBankStore((state: any) => state.clearBank)



    const {
        control,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm()


    useEffect(() => {
        let result = InitialzeAll()
        // clearBanks()

        console.log(allBanks.length)

        if (allBanks.length < 1) {
            console.log("do ir")
            addBanks(UserBanks[0])
            addBanks(UserBanks[1])

        } else {
            console.log(allBanks)
        }



    }, [isFocused])




    const onSubmit = handleSubmit((data) => {
        console.log(data)


        if (data.username !== "Admin") {
            setError("username", {
                type: "manual",
                message: "Invalid username"
            })
        } if (data.password !== "Password") {
            setError("password", {
                type: "manual",
                message: "Invalid password"
            })
        } else if(data.username === "Admin" && data.password === "Password" ) {
            Toast.show({
                type: "success",
                text1: "Sucess"
            })
            navigatetoDashBoard()
        }



    })
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


                        < View>

                            <View
                                style={apptw` bg-white rounded-lg py-5 px-2  border flex-row`}
                            >
                                <Feather name="users" size={24} color="rgba(67, 145, 166, 1)" />

                                <Controller
                                    name="username"
                                    control={control}

                                    render={({ field: { onChange, value } }) => (

                                        <TextInput
                                            placeholder="Username"
                                            value={value}
                                            onChangeText={onChange}
                                            style={apptw`px-2 w-full`}
                                        />

                                    )}

                                />


                            </View>

                            {errors.username && (
                                <AppText style={apptw`text-red-500`}>
                                    {errors?.username?.message}
                                </AppText>
                            )}
                        </View>



                        <View>
                            <View
                                style={apptw` bg-white rounded-lg py-5 px-2  border flex-row justify-between`}
                            >
                                <View style={apptw`flex-row`}>
                                    <Key height={30} width={30} />

                                    <Controller
                                        name="password"
                                        control={control}
                                        render={({ field: { onChange, value } }) => (

                                            <TextInput
                                                placeholder="Password"
                                                value={value}
                                                onChangeText={onChange}
                                                style={apptw`px-2 w-1/2`}

                                            />
                                        )}
                                    />



                                </View>




                                <PressAppText
                                    // onPress={navigatetoForgotPassword}
                                    style={apptw`text-primary `}
                                >
                                    Forgot
                                </PressAppText>


                            </View>

                            {errors.password && (
                                <AppText style={apptw`text-red-500`}>
                                    {errors?.password?.message}
                                </AppText>
                            )}

                        </View>



                        <AppButton
                            buttonStyle={apptw`my-6`}
                            // text={isButtonLoading ? "Loading..." : "Sign In"}
                            onPress={onSubmit}
                            text="Sign In"

                        />






                    </View>

                </ScrollView>
                <View style={apptw` flex top-[15] left-[1]  `} >
                    <View style={apptw`mb-19 flex-row  justify-between mx-auto bg-`}>




                        <AppText style={apptw`self-center text-zinc-400 text-[4]`}>
                            Don't have an account?{' '}





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