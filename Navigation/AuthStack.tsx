import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../screens/allroutes";
import Welcome from "../screens/Welcome";
import AppStack from "./AppStack";
import DashBoardScreen from "../screens/DashBoard/DashBoardScreen";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Pressable, TouchableOpacity } from "react-native";
import apptw from "../utils/lib/tailwind";
import { AntDesign, MaterialIcons, SimpleLineIcons } from "@expo/vector-icons";
import WithdrawScreen from "../screens/WithdrawPage/WithdrawScreen";
import VerifcationScreen from "../screens/VerificationScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();



const AuthStack = () => {
    const navigation = useNavigation();



    const toggle = () => {
        navigation.dispatch(DrawerActions.toggleDrawer());
    }
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                headerTitle: "",
                headerStyle: {
                    backgroundColor: "transparent"
                },
                headerShadowVisible: false
            }}
            initialRouteName='SignIn'

        >
            <Stack.Screen
                name="Welcome"
                component={Welcome}
            />
            <Stack.Screen
                name="SignIn"
                component={SignIn}

                options={{
                    headerTitle: '',
                    headerLeft: () => (
                        <Pressable onPress={() => navigation.goBack()} >
                            <MaterialIcons
                                name="keyboard-arrow-left"
                                size={40}
                                style={apptw`bg-white`}
                                color="black"
                            />
                        </Pressable>
                    )
                }}
            />
            <Stack.Screen
                name="SignUp"
                component={SignUp}
            />


            <Stack.Screen
                name="VerificationScreen"
                component={VerifcationScreen}
            />


            <Stack.Screen
                name="DashBoardScreen"
                component={DashBoardScreen}
                options={{
                    headerTitle: '',
                    headerShown: false,


                }}
            />




            <Stack.Screen
                name="WithdrawScreen"
                component={WithdrawScreen}
                options={{
                    headerTitle: '',
                    headerShown: false,


                }}
            />
        </Stack.Navigator>
    )
}

export default AuthStack