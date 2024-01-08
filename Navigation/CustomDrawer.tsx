import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { View, Text, ImageBackground, Image, Pressable } from "react-native";
import AppText from "../components/Display/AppText";
import apptw from "../utils/lib/tailwind";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import SearchBar from "../components/Input/SearchBar";
import { useState } from "react";
import Logo from "../assets/icons/Logo.svg"
export default function CustomDrawer(props: any) {
    const [useSearch, SetSearch] = useState("")
    const navigation = useNavigation()


    const search = (text: any) => {
        console.log(text)


        SetSearch(text)

        console.log(text)
    }

    return (
        <DrawerContentScrollView
            contentContainerStyle={{

                backgroundColor: "rgba(67, 145, 166, 1)",

                height: "100%"

            }}
            {...props}
        >







            <View
                style={apptw`flex flex-col justify-between  h-[50%]`}
            >


                <View

                    style={apptw`flex justify-between`}
                >
                    <View
                        style={apptw`mx-4 my-5`}
                    >

                        <Logo

                        />
                    </View>

                    <View>
                        <SearchBar onPress={search} />

                    </View>

                    <DrawerItemList {...props} />

                    <Pressable

                        style={apptw`bg- flex-row px-5 pt-5 -end`}
                    >
                        <SimpleLineIcons name="logout" size={24} color="#BC4B52" />
                        <AppText
                            style={apptw`mx-10`}
                        >
                            Logout
                        </AppText>
                    </Pressable>

                </View>
                <AppText
                    style={apptw`mx-10`}
                >
                    Logout
                </AppText>
            </View>


        </DrawerContentScrollView>
    )
}