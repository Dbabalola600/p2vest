import { View, Text, TouchableOpacity, Modal, StyleSheet, Pressable, Image, FlatList, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import apptw from '../../utils/lib/tailwind';
import AppText from '../../components/Display/AppText';
import Credit from "../../assets/icons/Credit.svg"
import Debit from "../../assets/icons/Debit.svg"
import { TransactionHistory } from '../../utils/lib/data/MockData';
import AppButton from '../../components/Display/AppButton';
import { useState } from 'react';
import AppPinCode from '../../components/Input/AppPinCode';
import { Controller, useForm } from 'react-hook-form';
import Toast from 'react-native-toast-message';



const WithdrawPin = ({ isVisible, onClose, subTract }: any) => {
    const {
        control,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm()



    const onSubmit = handleSubmit((data) => {
        console.log(data)


        if (data.verificationPin === "1234") {
            console.log("yes")
              subTract()
        } else {
            setError('verificationPin', {
                type: 'manual',
                message: 'Invalid verification pin',
              });
        }

      
    })

    return (
        <KeyboardAvoidingView
            style={apptw` flex-1`}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >



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

                            <View style={apptw` mx-auto mt-5 `}>
                                <AppText style={apptw`text-center`}>
                                    Enter 4 digits Code
                                </AppText>
                                <AppText style={apptw`text-sm text-center`}>
                                    Enter 4 digits PIN to authorize this transaction
                                </AppText>
                            </View>


                            <View>
                             


                                <Controller
                                    name="verificationPin"
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <AppPinCode
                                            numberOfPins={4}
                                            keyboardType="number-pad"
                                            containerStyle={apptw`mt-10`}
                                            onChangeText={onChange}
                                            value={value}
                                            errorMessage={errors?.verificationPin?.message}
                                        />
                                    )}
                                />
                            </View>

                            <AppButton
                                buttonStyle={apptw`py-2 mb-1 mt-5`}
                                text='Proceed'
                                onPress={onSubmit}
                            />






                        </View>


                    </KeyboardAvoidingView>

                </TouchableOpacity>

            </Modal>





        </KeyboardAvoidingView>

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

export default WithdrawPin