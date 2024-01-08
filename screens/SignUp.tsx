import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { ScrollView, View, Pressable, Image, TextInput } from "react-native";
import AppButton from "../components/Display/AppButton";
import AppText from "../components/Display/AppText";
import PressAppText from "../components/Display/PressAppText";
import AppTextField from "../components/Input/AppTextField";
import BasicBackButtonLayout from "../components/Layout/BasicBackButtonLayout";
import apptw from "../utils/lib/tailwind";
import { RootStackParamList } from "./allroutes";
import tw from "twrnc"
import { Checkbox } from "expo-checkbox";
import CreateAccount from "../assets/icons/createAccount.svg"
import Toast from "react-native-toast-message";

type SignUpScreen = NativeStackScreenProps<
    RootStackParamList,
    "SignUp"
>;

const SignUp = ({ navigation }: SignUpScreen) => {
    const [isButtonLoading, setButtonLoading] = useState(false)
    const [isPhonenum, setPhone] = useState("")

    const navigateToSignIn = () => {
        navigation.navigate("SignIn")
    }

    const [isChecked, setChecked] = useState(false);



    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handlePasswordChange = (value: any) => {
        setPassword(value);
    };

    const handleConfirmPasswordChange = (value: any) => {
        setConfirmPassword(value);
    };


    const handlePhone = (thing: any) => {

        console.log(thing)
        setPhone(thing)
    }


    const comparePasswords = () => {
        if (password === confirmPassword && password!== "" && confirmPassword !== "") {
            console.log(isPhonenum);

            Toast.show({
                type: "success",
                text1: "Sent"
            })

            navigation.navigate("VerificationScreen", {number: isPhonenum})
        } else {
            Toast.show({
                type: "error",
                text1: "Passwords must match"
            })
            console.log('Passwords do not match');
        }
    };



  


    return (
        <BasicBackButtonLayout>
            <View
                style={apptw`mt-30`}
            >
                <View style={apptw`mx-auto`}>
                    <CreateAccount />
                </View>

                <ScrollView
                    style={tw`px-5 `}
                    contentContainerStyle={tw.style(` justify-between`, {
                        flexGrow: 1,
                    })}
                >
                    <View style={apptw`gap-y-4`}>

                        <AppText
                            style={apptw`text-xl text-black`}>
                            Create your  Account
                        </AppText>


                        <View
                            style={apptw` bg-white rounded-lg py-5 px-2  border flex-row`}
                        >
                            <TextInput
                                placeholder="Phone Number"
                                style={apptw`px-2 w-full`}
                                keyboardType="phone-pad"
                                onChangeText={handlePhone}
                                value={isPhonenum}
                            />
                        </View>





                        <View
                            style={apptw` bg-white rounded-lg py-5 px-2  border flex-row`}
                        >
                            <TextInput
                                placeholder="Password"
                                style={apptw`px-2 w-full`}

                                onChangeText={handlePasswordChange}
                                value={password}
                            />
                        </View>



                        <View
                            style={apptw` bg-white rounded-lg py-5 px-2  border flex-row`}
                        >
                            <TextInput
                                placeholder=" Confirm Pasword"
                                style={apptw`px-2 w-full`}

                                value={confirmPassword}
                                onChangeText={handleConfirmPasswordChange}
                                onBlur={comparePasswords}
                            />
                        </View>




                    </View>





                    <View style={apptw`mb-19`}>

                        <AppButton
                            buttonStyle={apptw`  my-6`}
                            text={isButtonLoading ? "Loading..." : "Register"}
                            onPress={comparePasswords}
                        // text="Create Account"
                        />


















                        <View style={apptw`mb-19 flex-row  justify-between mx-auto bg-`}>
                            <AppText style={apptw`self-center text-zinc-400 text-[4]`}>
                                Already have an account?{' '}
                            </AppText>
                            <PressAppText
                                onPress={navigateToSignIn}
                                style={apptw`text-primary   `}>
                                Sign In
                            </PressAppText>

                        </View>


                    </View>
                </ScrollView>

            </View>

        </BasicBackButtonLayout>
    )
}

export default SignUp