import React, {Component, useState} from 'react'

import { View, Text, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { TouchableOpacity } from 'react-native-gesture-handler'

import { FONTS, SIZES, COLORS } from '../constants'

export default function LoginScreen () {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{ marginVertical: 10, textAlign: 'center', ...FONTS.h2 }}>Login right now</Text>
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
                secureTextEntry
            />
        <TouchableOpacity 
          onPress={() => {
          }}
          style={{
              width: SIZES.width * 0.7,
              backgroundColor: COLORS.primary,
              alignItems: 'center',
              borderRadius: SIZES.radius,
              padding: SIZES.padding * 0.5,
              marginBottom: SIZES.padding
          }}
        >
          <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Login</Text>
        </TouchableOpacity>
        </SafeAreaView>
    )
}