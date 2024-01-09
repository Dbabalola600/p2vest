import { View, Text, TouchableOpacity, Modal, StyleSheet, Pressable, Image, FlatList } from 'react-native';
import apptw from '../../utils/lib/tailwind';
import AppText from '../../components/Display/AppText';
import Credit from "../../assets/icons/Credit.svg"
import Debit from "../../assets/icons/Debit.svg"
import { TransactionHistory } from '../../utils/lib/data/MockData';


const TransActionsDrawer = ({ isVisible, onClose }:any) => {


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

                    <View style={apptw`flex-row justify-between mt-4 `}>
                        <AppText style={apptw`font-bold`}>
                            Last Transactions
                        </AppText>

                        <AppText style={apptw`text-primary`}>
                            See All
                        </AppText>
                    </View>

                    <View style={apptw`mt-5 mb-10`}>
                        {TransactionHistory.map((item) => (

                            <View style={apptw`flex-row justify-between `}>

                                <View style={apptw`flex-row `}>
                                    <View style={apptw`my-auto`}>

                                        {item.type === "credit" && <Credit />}
                                        {item.type === "debit" && <Debit />}
                                    </View>


                                    <View style={apptw`mx-auto ml-1`}>
                                        <AppText style={apptw`font-bold `}>
                                            {item.name}
                                        </AppText>
                                        <AppText style={apptw`text-sm`}>
                                            {item.date}
                                        </AppText>
                                    </View>
                                </View>


                                <View>
                                    <AppText>
                                      {item.type === "debit" && "-"}{item.amount}
                                    </AppText>
                                </View>


                            </View>

                        ))}

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

export default TransActionsDrawer