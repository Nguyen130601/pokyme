import React, {Component, useState} from 'react'

import { View, Text, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { TouchableOpacity } from 'react-native-gesture-handler'

import { FONTS } from '../constants'

export default function LoginScreen () {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{...FONTS.h1}}>Login screen</Text>
            <TextInput
                style={{ 
                    height: 100
                }}
                value={email} 
                placeholder='Email'
                onChangeText={text => setEmail(text)}
            />
            <TextInput
                style={{ 
                    height: 100
                }}
                value={password}  
                placeholder='Password'
                onChangeText={text => setPassword(text)}
            />
            <TouchableOpacity>
                <Text>Login</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}