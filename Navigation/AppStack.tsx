import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawer from "./CustomDrawer";
import Tabs from "./Tabs";
import Test from "../screens/Tests/Test";
import DashBoardScreen from "../screens/DashBoard/DashBoardScreen";
import { View } from "react-native";

import { MaterialIcons } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();
const AppStack = () => {
    return (
        <Drawer.Navigator
            initialRouteName="DashBoard"

            screenOptions={{
                drawerLabelStyle: {
                    fontSize: 15,
                    color: "black"
                },
                drawerType: "slide",
                drawerStyle: {
                    width: '70%',

                },
                drawerActiveTintColor: "rgb(38,83,95)",
            }}
            drawerContent={props => <CustomDrawer{...props} />}
        >



            <Drawer.Screen
                name='DashBoard'
                component={DashBoardScreen}
                options={{
                    drawerIcon: () =>

                        <MaterialIcons 
                        name="dashboard" 
                        size={24} 
                        color="white" />
                    ,

                    title: "Dashboard",
                    headerShown: false,


                }}
            />




            <Drawer.Screen
                name='Test'
                component={Test}
                options={{


                    title: "Test",
                    headerShown: false,


                }}
            />



        </Drawer.Navigator>
    )
}

export default AppStack