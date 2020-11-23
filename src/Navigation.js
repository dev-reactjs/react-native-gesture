import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabView, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Swiper from "./Swiper";
import TrashScreen from "./TrashScreen";


const Tab = createBottomTabNavigator();

export default function AppNavigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator tabBarOptions={{
               labelStyle: {
                fontSize: 20,
                paddingBottom: 5,
              },
            }}>
                <Tab.Screen name="ListData" component={Swiper} />
                <Tab.Screen name="Trash" component={TrashScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}