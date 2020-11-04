import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import UserInfoEdit from '../screens/UserInfoEdit';
import Userlisting from '../screens/Userlisting';

const Stack = createStackNavigator();


export const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="UserListing"
                    component={Userlisting}
                    options={{ title: 'Available Users' }}
                >

                </Stack.Screen>
                <Stack.Screen
                    name="UserForm"
                    component={UserInfoEdit}
                    options={{ title: 'Update User Details' }}
                >

                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
}