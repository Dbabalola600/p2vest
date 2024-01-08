import { useNavigation } from "@react-navigation/native";
import { Keyboard, Platform, Pressable, SafeAreaView, TouchableWithoutFeedback, View, Text, ScrollView } from "react-native";
import tw from "twrnc";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons"
import apptw from "../../utils/lib/tailwind";



type LoggedInLayoutProp = {
    children: React.ReactNode;
};

const LoggedInLayout = ({ children }: LoggedInLayoutProp) => {
    const navigation = useNavigation();


    return (
        <TouchableWithoutFeedback
            onPress={() => (Platform.OS != "web" ? Keyboard.dismiss() : null)}
        >

            <ScrollView
                style={apptw.style(`bg-white  flex-1 shadow-md `)}
                contentContainerStyle={apptw`flex-grow`}

            // edges={["top", "left", "right", "bottom"]}
            >

               


                {children}
            </ScrollView>
        </TouchableWithoutFeedback>
    )



}

export default LoggedInLayout;