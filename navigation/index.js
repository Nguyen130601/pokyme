import React, {Component} from 'react'

import { Image } from 'react-native'

import logo from '../assets/icons/cube_icon.png'

import HomeScreen from '../screens/HomeScreen'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { icons, COLORS } from '../constants'

const Tab = createBottomTabNavigator()

export default Tabs = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen 
                name='TabOne'
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image 
                            source={icons.camera}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? COLORS.primary : COLORS.secondary
                            }}
                        />
                    )
                }}
            />
            <Tab.Screen 
                name='TabTwo'
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image 
                            source={icons.search}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? COLORS.primary : COLORS.secondary
                            }}
                        />
                    )
                }}
            />
            <Tab.Screen 
                name='TabThree'
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image 
                            source={logo}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? COLORS.primary : COLORS.secondary
                            }}
                        />
                    )
                }}
            />
            <Tab.Screen 
                name='TabFour'
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image 
                            source={icons.camera}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? COLORS.primary : COLORS.secondary
                            }}
                        />
                    )
                }}
            />
        </Tab.Navigator>
    )
}