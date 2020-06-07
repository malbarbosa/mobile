import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator } from "@react-navigation/stack";

import Home from "../src/pages/Home";
import Points from "../src/pages/Points";
import Detail from "../src/pages/Detail";


const AppNavigation = createStackNavigator();

const Routes = () => {
    return (
        <NavigationContainer>
            <AppNavigation.Navigator headerMode="none" screenOptions={{
                cardStyle:{
                    backgroundColor:'#f0f0f5'
                }
            }}>
                <AppNavigation.Screen component={Home} name="Home"/>
                <AppNavigation.Screen component={Points} name="Points"/>
                <AppNavigation.Screen component={Detail} name="Detail"/>
            </AppNavigation.Navigator>
        </NavigationContainer>
    )
}

export default Routes;