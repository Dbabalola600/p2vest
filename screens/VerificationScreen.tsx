import { View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native"
import BasicBackButtonLayout from "../components/Layout/BasicBackButtonLayout"
import Verification from "../assets/icons/verification.svg"
import apptw from "../utils/lib/tailwind"
import AppText from "../components/Display/AppText"
import AppPinCode from "../components/Input/AppPinCode"
import { RouteProp, useNavigation } from "@react-navigation/native"
import { RootStackParamList } from "./allroutes"
import { useState, useEffect } from "react"
import AppButton from "../components/Display/AppButton"
import Toast from "react-native-toast-message"



type ScreenProps = RouteProp<RootStackParamList, "VerificationScreen">


type Props = {
    route: ScreenProps
}
const VerifcationScreen: React.FC<Props> = ({ route }) => {

    const [seconds, setSeconds] = useState(60);
const navigation = useNavigation()
    useEffect(() => {
        const timer = setInterval(() => {
            setSeconds((prevSeconds) => {
                if (prevSeconds === 0) {
                    clearInterval(timer);
                    return prevSeconds;
                }
                return prevSeconds - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (seconds === 0 || seconds < 0) {
            // Timer has reached 0, do something here
            console.log('Timer has reached 0');
        }
    }, [seconds]);



    const onsubmit = ()=>{
        Toast.show({
            type:"success",
            text1:"Sucess"
        })
        navigation.navigate("SignIn")
    }


    return (

        <KeyboardAvoidingView
            style={{ flex: 20 }} behavior="padding"
        >
            <BasicBackButtonLayout>
                <View style={apptw`mt-30`}>
                    <View style={apptw`mx-auto mt-40`}>
                        <Verification />
                        <AppText style={apptw`text-primary font-bold text-center`}>
                            Verification
                        </AppText>
                    </View>



                    <View
                        style={apptw`my-3`}
                    >
                        <AppText style={apptw`text-center`}>
                            Enter the 4 digits number that was  sent to {route?.params?.number}
                        </AppText>

                    </View>



                    <View style={apptw`mx-3`}>
                        <AppPinCode
                            numberOfPins={4}
                            keyboardType="number-pad"

                        />


                        <AppButton
                            buttonStyle={apptw``}
                            onPress={onsubmit}
                            text="Confrim"
                        />
                    </View>





                    <View>
                        <AppText style={apptw`text-center`}>
                            Resend conde in <AppText style={apptw`text-primary`}> 0.{seconds}</AppText>
                        </AppText>
                    </View>


                </View>
            </BasicBackButtonLayout>

        </KeyboardAvoidingView>

    )
}



const styles = StyleSheet.create({

    keyboardAvoidingContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: "100%"
    },

});
export default VerifcationScreen