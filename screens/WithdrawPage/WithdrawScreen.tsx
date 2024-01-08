import { Pressable, TextInput, View } from "react-native";
import LoggedInLayout from "../../components/Layout/LoggedLayout";
import AppText from "../../components/Display/AppText";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../allroutes";
import { DrawerActions, useIsFocused } from "@react-navigation/native";
import { Ionicons, Octicons } from "@expo/vector-icons";
import apptw from "../../utils/lib/tailwind";
import MainHeader from "../../components/Display/MainHeader";
import AppTextField from "../../components/Input/AppTextField";
import { UserBanks } from "../../utils/lib/data/MockData";
import { useEffect, useState } from "react";
import AppButton from "../../components/Display/AppButton";
import TransActionSummary from "./TransActionSummary";
import WithdrawPin from "./WithDrawPin";
import AddBank from "./AddBank";
import { SecureStorage } from "../../services/secureStorage";
import Toast from "react-native-toast-message";
import { useBankStore } from "../../utils/lib/data/bankDetails";

type ScreenProps = NativeStackScreenProps<RootStackParamList, "WithdrawScreen">



export default function WithdrawScreen({ navigation }: ScreenProps) {
    const [isDrawerVisible, setDrawerVisible] = useState(false);
    const [isBankVisible, setBankVisible] = useState(false)
    const [user, setUser] = useState<any>("")
    const toggle = () => {
        navigation.dispatch(DrawerActions.toggleDrawer());
    }

    const [isAmount, setAmount] = useState('')


    const [openPin, setOpenPin] = useState(false)

    const [isSelected, setSelected] = useState<any>(0)
    const openDrawer = () => setDrawerVisible(true);
    const closeDrawer = () => setDrawerVisible(false);
    const closePin = () => setOpenPin(false)


    const openBank = () => setBankVisible(true)
    const closeBank = () => setBankVisible(false)



    const handleSelection = async (id: any) => {
        setSelected(id);
    }
    const isFocused = useIsFocused()

    const handleAmountChange = (text: string) => {
        const parsedAmount = parseFloat(text);
        const cleanedText = text.replace(/,/g, '');

        // Insert commas after every three digits
        const formattedText = cleanedText.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        setAmount(formattedText);
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





    const toggleOpenPin = () => {
        setOpenPin((prevOpenPin) => !prevOpenPin);
    };


    const navBack = () => {
        navigation.goBack()
    }





    // new balance  

    const [getNewBal, setNewBal] = useState("")
    const isNewBal = (response: any) => {
        setNewBal(response)
    }



    const subTract = async () => {
        // console.log(getNewBal)

        Toast.show({
            type:"success",
            text1:"Sucessful"
        })
        await SecureStorage.getInst().save("AccBal", getNewBal.toString())


        // console.log( await SecureStorage.getInst().getValueFor("AccBal"))
        navigation.navigate("DashBoardScreen")
      
    }






    const allBanks = useBankStore((state: any) => state.bank)
    const addBanks = useBankStore((state: any) => state.addToBank)


    return (
        <LoggedInLayout>
            <View style={apptw` mt-3 mb-5`}>

                <View>
                    <MainHeader />
                </View>


                <View style={apptw`flex-row justify-around my-10`}>
                    <AppText>
                        Your Balance
                    </AppText>
                    <View style={apptw`flex-row`}>
                        <AppText>N</AppText>
                        <AppText style={apptw`text-3xl`}> {parseFloat(user.AccBal).toLocaleString()}</AppText>
                    </View>


                </View>


                <View
                    style={apptw`mx-5`}
                >
                    <AppText style={apptw`text-primary text-3xl font-bold`}>Withdraw</AppText>
                    <AppText style={apptw`text- text-lg font-semibold`}>Amount</AppText>

                    <TextInput

                        style={apptw` bg-secondary rounded-lg py-5 px-5 text-center border border-primary`}
                        keyboardType="number-pad"
                        onChangeText={handleAmountChange}
                        value={isAmount}

                    />


                </View>


                <View style={apptw`flex-row justify-between mx-4  my-5`}>
                    <AppText>
                        Select Bank
                    </AppText>

                    <Pressable
                        onPress={openBank}
                        style={apptw`flex-row `}>
                        <Ionicons name="add-circle-outline" style={apptw`my-auto`} size={24} color="rgba(67, 145, 166, 1)" />
                        <AppText>Add New Bank </AppText>
                    </Pressable>
                </View>



                <View>

                    {allBanks.map((item:any, index:any) => (
                        <Pressable
                        key={index}
                            onPress={() => handleSelection(index)}
                            style={apptw`mx-3 mb-2   py-5 px-3
                            
                            ${isSelected === index ?
                                    `bg-secondary` : `bg-gray-200`
                                }
                            `}
                        >
                            <View style={apptw`flex-row justify-between`}>

                                <View style={apptw` my-auto flex-row`}>
                                    <View>
                                        <View style={apptw`rounded-full  border border-black  h-5 w-5 my-auto`}>

                                            {isSelected === index &&
                                                <View style={apptw`rounded-full bg-primary h-2 w-2 mx-auto my-auto `} />
                                            }


                                        </View>
                                    </View>
                                    <View style={apptw`ml-3`}>
                                        <AppText style={apptw`font-bold `}>
                                            {item.name}
                                        </AppText>
                                        <AppText>
                                            {item.accNo}
                                        </AppText>
                                    </View>

                                </View>


                                <View style={apptw` `}>
                                    <AppText>
                                        Bank
                                    </AppText>
                                    <AppText>
                                        {item.bank}
                                    </AppText>
                                </View>

                            </View>


                        </Pressable>
                    ))}

                </View>


                <View style={apptw`mx-3 gap-y-4`}>
                    <AppButton
                        onPress={() => openDrawer()}
                        buttonStyle={apptw`bg- w-full`}
                        text="Withdraw"
                    />

                    <AppButton
                        onPress={navBack}
                        buttonStyle={apptw`bg-gray-300 w-full`}
                        text="Cancel"
                    />
                </View>
                <WithdrawPin isVisible={openPin} onClose={closePin} subTract={subTract}></WithdrawPin>
                <TransActionSummary isVisible={isDrawerVisible} onClose={closeDrawer} info={isAmount} toggleOpenPin={toggleOpenPin} newBal={isNewBal}  > </TransActionSummary>
                <AddBank isVisible={isBankVisible} onClose={closeBank} ></AddBank>
            </View>


        </LoggedInLayout>
    )
}