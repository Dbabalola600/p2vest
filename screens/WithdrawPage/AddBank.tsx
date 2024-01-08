import { View, Text, TouchableOpacity, Modal, StyleSheet, Pressable, Image, FlatList, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import apptw from '../../utils/lib/tailwind';
import AppText from '../../components/Display/AppText';
import Credit from "../../assets/icons/Credit.svg"
import Debit from "../../assets/icons/Debit.svg"
import { TransactionHistory, bankOptions } from '../../utils/lib/data/MockData';
import AppButton from '../../components/Display/AppButton';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import AppTextField from '../../components/Input/AppTextField';
import DropdownField from '../../components/Input/Dropdown';
import { SecureStorage } from '../../services/secureStorage';
import Toast from 'react-native-toast-message';
import { useBankStore } from '../../utils/lib/data/bankDetails';

const AddBank = ({ isVisible, onClose, info }: any) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm()


    const [isBank, setBank] = useState("")
    const [openPin, setOpenPin] = useState(false)



    const pickBank = (item: any) => {
        setBank(item)
    }

    const addBanks = useBankStore((state: any) => state.addToBank)
    const onSubmit = handleSubmit(async (data) => {

        const bank = {
            bank: isBank
        }

        Object.assign(data, bank)
        let lName = await SecureStorage.getInst().getValueFor("lName")
        let fName = await SecureStorage.getInst().getValueFor("fName")

        if (lName && fName) {
            const name = {
                name: fName + " " + lName
            }


            Object.assign(data, name)


        }

        Toast.show({
            type: "success",
            text1: "Added"
        })


        addBanks(data)
        // console.log(data)

        onClose()


    })





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
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.keyboardAvoidingContainer}
                >
                    <View style={styles.drawerContainer}>
                        <View style={apptw`h-2 bg-[#626262CC] rounded-full mx-auto w-10`}>

                        </View>
                        <View style={apptw` mx-auto my-3 `}>
                            <AppText style={apptw`text-center font-bold text-xl`}>
                                Add New Bank
                            </AppText>
                        </View>
                        <View>
                            <AppTextField
                                control={control}
                                title='Account Number'
                                validationName='accNo'
                                keyboardType='number-pad'
                            />
                            <View
                                style={apptw``}
                            >

                                <DropdownField
                                    title='Bank Name'
                                    data={bankOptions}
                                    onChange={(selectedValue) => pickBank(selectedValue)}
                                />
                            </View>

                        </View>
                        <View style={apptw`mx-3 gap-y-4 mt-5 mb-3`}>
                            <AppButton
                                onPress={onSubmit}
                                buttonStyle={apptw`bg-primary w-full py-2`}
                                text="Add Bank"
                            />
                        </View>
                    </View>
                </KeyboardAvoidingView>
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
    keyboardAvoidingContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: "100%"
    },
    drawerContainer: {
        backgroundColor: '#F2F2F2',
        padding: 16,
        width: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
});

export default AddBank;
