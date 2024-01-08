import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import { RootStackParamList } from "./allroutes";
import React from "react";
import AppButton from "../components/Display/AppButton";
import apptw from "../utils/lib/tailwind";
import Onboarding from 'react-native-onboarding-swiper';
import BasicBackButtonLayout from "../components/Layout/BasicBackButtonLayout";



type WelcomeProps = NativeStackScreenProps<RootStackParamList, "Welcome">
const Welcome = ({ navigation }: WelcomeProps) => {
    const slides = [
        {
            title: 'Convenient Telehealth: Virtual Consultations and Follow-up... Anytime, Anywhere',
            subtitle: 'With Hospyta',
            backgroundColor: '#fff',
            image: ""
        },
        {
            title: 'Prescriptions Plus..... Your One-Stop Shop For Medicines, Equipment and More',
            subtitle: 'With Hospyta',
            backgroundColor: '#fff',
            image: ""
        },
        {
            title: 'Logistics ....And Well Deliver it all  Too, In Record Time',
            subtitle: 'With Hospyta',
            backgroundColor: '#fff',
            image: ""
        },
        {
            title: 'Inspire Your Medical Practice Through the Power of Collaboration and Knowledge Sharing.',
            subtitle: 'With Hospyta',
            backgroundColor: '#fff',
            image: ""

        },
    ];

    const navigatetoLogin = () => {
        navigation.navigate("SignIn")
    }

    const navigatetoSignUp = () => {
        navigation.navigate("SignUp")
    }


    return (

        <BasicBackButtonLayout>

            <View style={apptw``}>

                <View style={apptw``}>
                    <AppButton
                        text="Sign In"
                        buttonStyle={apptw.style("  bg-blue-500 mb-5")}
                        onPress={navigatetoLogin}

                    />

                    <AppButton
                        text="Sign Up"
                        buttonStyle={apptw.style("border border-black bg-transparent")}
                        onPress={navigatetoSignUp}
                        textStyle={apptw`text-black`}
                    />



                </View>
            </View>
        </BasicBackButtonLayout>

    )
}



export default Welcome;