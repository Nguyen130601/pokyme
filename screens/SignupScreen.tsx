import React, {Component, useState} from 'react'

import { Text } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FONTS } from '../constants'

import { auth } from '../firebase'


export default function SignupScreen () {
    const [email, setEmail] = useState('mathematiciannguyen@gmail.com')
    const [password, setPassword] = useState('HelloWorld')

    const handleSignUp = () => {
        auth
        .createUserWithEmailAndPassword(email, password)
        .then((userCredentials : any) => {
          const user = userCredentials.user;
          console.log('Registered with:', user.email);
        })
        .catch((error : any) => alert(error.message))
    }

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{...FONTS.h1}}>Signup screen</Text>
            <TextInput
                style={{ 
                    height: 100
                }}
                value={email} 
                placeholder='Email'
                onChangeText={text => setEmail(text)}
                secureTextEntry
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
                    handleSignUp()
                }}
            >
                <Text>Signup</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}