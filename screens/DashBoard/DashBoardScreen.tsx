import { View } from "react-native"
import LoggedInLayout from "../../components/Layout/LoggedLayout"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RootStackParamList } from "../allroutes"
import { DrawerActions, useIsFocused } from "@react-navigation/native"
import Menu from "../../assets/icons/Menu.svg"
import apptw from "../../utils/lib/tailwind"
import { Pressable } from "react-native"
import { Octicons } from '@expo/vector-icons';
import AppText from "../../components/Display/AppText"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import Withdraw from "../../assets/icons/Withdraw.svg"
import TransActionsDrawer from "./TransActionsDrawer"
import { useEffect, useState } from "react"
import { SecureStorage } from "../../services/secureStorage"
import UserImage from "../../assets/icons/Ellipse 4.svg"


type ScreenProps = NativeStackScreenProps<RootStackParamList, "DashBoardScreen">



function DashBoardScreen({ navigation }: ScreenProps) {
    const [isDrawerVisible, setDrawerVisible] = useState(false);
    const [user, setUser] = useState<any>("")
    const toggle = () => {
        navigation.dispatch(DrawerActions.toggleDrawer());
    }
    const isFocused = useIsFocused()
    const openDrawer = () => setDrawerVisible(true);
    const closeDrawer = () => setDrawerVisible(false);

    useEffect(() => {

        openDrawer()
    }, [])


    const navtoWithdraw = () => {
        navigation.navigate("WithdrawScreen")
    }



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


    useEffect(() => {
        SetInfo()
    }, [isFocused])




    return (
        <LoggedInLayout>
            <View style={apptw`mt-4`}>

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



                {/* wallet */}
                <View style={apptw`mx-auto mt-10`}>
                    <View
                        style={apptw`bg-primary rounded-3xl h-50 w-90  px-3 pt-2 pb-5 flex-col justify-between`}
                    >
                        <View style={apptw`flex-row justify-between`}>

                            <View >

                                <View style={apptw`text-white flex-row `}>
                                    <AppText style={apptw`text-white`}>N</AppText>
                                    <AppText style={apptw`text-3xl text-white`} > {parseFloat(user.AccBal).toLocaleString()}</AppText>
                                </View>

                                <AppText style={apptw`text-white mx-auto`}>Balance</AppText>
                            </View>

                            <View>
                                <MaterialCommunityIcons name="wallet" size={50} color="white" />
                            </View>
                        </View>



                        <View
                            style={apptw`flex-row justify-between`}
                        >

                            <View>
                                <AppText style={apptw`text-white`}>
                                    Account Number
                                </AppText>

                                <AppText style={apptw`text-white`}>
                                    {user.AccNo}
                                </AppText>
                            </View>

                            <View>
                                <AppText style={apptw`text-white`}>
                                    Bank
                                </AppText>

                                <AppText style={apptw`text-white`}>
                                    Access Bank
                                </AppText>
                            </View>


                        </View>
                    </View>
                </View>

                {/* cards */}
                <View style={apptw`flex-row justify-around gap-x-0 mt-10`}>

                    <View style={apptw`flex-row bg-secondary justify-between py-3 px-2 rounded-lg`}>

                        <Ionicons name="add-circle-outline" style={apptw`my-auto`} size={24} color="rgba(67, 145, 166, 1)" />
                        <AppText> Top Up Wallet</AppText>
                    </View>


                    <Pressable

                        onPress={navtoWithdraw}
                        style={apptw`flex-row bg-secondary py-3 px-2 rounded-lg`}>
                        <View
                            style={apptw`my-auto`}
                        >
                            <Withdraw

                            />
                        </View>

                        <AppText> Withdraw Funds</AppText>
                    </Pressable>
                </View>

                <TransActionsDrawer isVisible={isDrawerVisible} onClose={closeDrawer} >


                </TransActionsDrawer>


            </View>
        </LoggedInLayout>
    )
}



export default DashBoardScreen