import { View, Text, TouchableOpacity, Modal, StyleSheet, Pressable, Image, FlatList } from 'react-native';
import apptw from '../../utils/lib/tailwind';
import AppText from '../../components/Display/AppText';
import Credit from "../../assets/icons/Credit.svg"
import Debit from "../../assets/icons/Debit.svg"
import { TransactionHistory } from '../../utils/lib/data/MockData';
import AppButton from '../../components/Display/AppButton';
import { useState } from 'react';
import WithdrawWallet from '../withDrawWallet';
import Toast from 'react-native-toast-message';


const TransActionSummary = ({ isVisible, onClose, info, toggleOpenPin, newBal }: any) => {

    // console.log(typeof pinStatus)


    const total = (parseFloat(info.replace(/,/g, '')) + 25)



    const [isReaction, setReaction] = useState("")

    const setPinStuff = async () => {

        const response = await WithdrawWallet((parseFloat(info.replace(/,/g, '')) + 25))
        // toggleOpenPin();
        // onClose()
        // console.log(response)
        if (response === "insufficient"  || response === "error") {
            setReaction("insufficient")
            Toast.show({
                type: "error",
                text1: "Insufficient Funds"
            })
        }else{
            toggleOpenPin();
            onClose(response) 
            newBal(response)
        }
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}

            onRequestClose={onClose}
        >

            <TouchableOpacity
                style={styles.modalContainer}
                activeOpacity={1}
                onPressOut={onClose}
            >
                <View style={styles.drawerContainer}>
                    <View style={apptw`h-2 bg-[#626262CC] rounded-full mx-auto w-10`}>

                    </View>

                    <View style={apptw` mx-auto mt-5 mb-7 `}>
                        <AppText style={apptw`text-center`}>
                            Transaction Summary
                        </AppText>
                        <AppText style={apptw`text-sm text-center`}>
                            Please Review the detials of your transactions
                        </AppText>
                    </View>

                    <View style={apptw`gap-y-1`}>

                        <View style={apptw`flex-row justify-between`}>
                            <AppText>
                                Transaction Type
                            </AppText>
                            <AppText>
                                Wallet Withdrawal
                            </AppText>
                        </View>

                        <View style={apptw`h-0.5 bg-[#626262CC] rounded-full w-full `} />


                        <View style={apptw`flex-row justify-between`}>
                            <AppText>
                                Amount
                            </AppText>
                            <AppText>
                                {info}
                            </AppText>
                        </View>

                        <View style={apptw`h-0.5 bg-[#626262CC] rounded-full w-full `} />

                        <View style={apptw`flex-row justify-between`}>
                            <AppText>
                                Fee
                            </AppText>
                            <AppText>
                                25
                            </AppText>
                        </View>
                        <View style={apptw`h-0.5 bg-[#626262CC] rounded-full w-full `} />


                        <View style={apptw`flex-row justify-between`}>
                            <AppText>
                                {" "}
                            </AppText>
                            <AppText
                                style={apptw`
                            ${isReaction === "insufficient" || isReaction === "error" ? 
                                        "text-red-500" : "text-black"
                                    }
                            `}
                            >
                                {total.toLocaleString()}
                            </AppText>
                        </View>
                    </View>


                    <View style={apptw`mx-3 gap-y-4 mt-5 mb-3`}>
                        <AppButton
                            onPress={() => setPinStuff()}
                            buttonStyle={apptw`bg- w-full py-2`}
                            text="Withdraw"
                        />

                        <AppButton
                            buttonStyle={apptw`bg-gray-300 w-full py-2`}
                            text="Cancel"
                            onPress={onClose}
                        />
                    </View>







                </View>

            </TouchableOpacity>

        </Modal>
    )
}


const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    drawerContainer: {
        backgroundColor: '#F2F2F2',
        padding: 16,
        width: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
});

export default TransActionSummary