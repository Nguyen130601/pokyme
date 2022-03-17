import React, {Component} from 'react'

import { Image, View } from 'react-native'

import HomeScreen from '../screens/HomeScreen'

import LoginScreen from '../screens/LoginScreen'
import SignupScreen from '../screens/SignupScreen'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Svg, { Path } from 'react-native-svg'

import { icons, COLORS } from '../constants'
import { TouchableOpacity } from 'react-native-gesture-handler'
import ResultScreen from '../screens/ResultScreen'
import GameScreen from '../screens/GameScreen'

const Tab = createBottomTabNavigator()

const TabBarCustomButton = ({ accessibilityState, children, onPress  }) => {

    const isSelected = accessibilityState.selected

    if (isSelected) {
        return (
            <View style={{ flex: 1, alignItems: "center" }}>
                <View style={{ flexDirection: 'row', position: 'absolute', top: 0 }}>
                    <View style={{ flex: 1, backgroundColor: COLORS.white }}></View>
                    <Svg
                        width={70}
                        height={61}
                        viewBox="0 0 75 61"
                    >
                        <Path
                            d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
                            fill={COLORS.white}
                        />
                    </Svg>
                    <View style={{ flex: 1, backgroundColor: COLORS.white }}></View>
                </View>

                <TouchableOpacity
                    style={{
                        top: -22.5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        backgroundColor: COLORS.white
                    }}
                    onPress={onPress}
                >
                    {children}
                </TouchableOpacity>
            </View>
        )
    } else {
        return (
            <View style={{ flex: 1, alignItems: "center", backgroundColor: COLORS.white }}>
                <TouchableOpacity
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        backgroundColor: COLORS.white
                    }}
                    onPress={onPress}
                >
                    {children}
                </TouchableOpacity>
            </View>
        )
    }
}

export default Tabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                    right: 0,
                    borderTopWidth: 0,
                    backgroundColor: "transparent",
                    elevation: 0
                }
            }}
        >
            <Tab.Screen 
                name='TabOne'
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image 
                            source={icons.heart}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? COLORS.primary : COLORS.secondary
                            }}
                        />
                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton 
                            {...props}
                        />
                    )
                }}
            />
            <Tab.Screen 
                name='TabTwo'
                component={ResultScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image 
                            source={icons.heart}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? COLORS.primary : COLORS.secondary
                            }}
                        />
                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton 
                            {...props}
                        />
                    )
                }}
            />
            <Tab.Screen 
                name='TabThree'
                component={GameScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image 
                            source={icons.heart}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? COLORS.primary : COLORS.secondary
                            }}
                        />
                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton 
                            {...props}
                        />
                    )
                }}
            />
            <Tab.Screen 
                name='TabFour'
                component={SignupScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image 
                            source={icons.heart}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? COLORS.primary : COLORS.secondary
                            }}
                        />
                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton 
                            {...props}
                        />
                    )
                }}
            />
        </Tab.Navigator>
    )
}