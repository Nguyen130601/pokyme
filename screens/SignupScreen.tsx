import React, {Component, useState} from 'react'

import { Text } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FONTS, SIZES, COLORS } from '../constants'

import { Modal, View } from 'react-native'

import { auth } from '../firebase'


export default function SignupScreen () {
    const [email, setEmail] = useState('')

    const [password, setPassword] = useState('')

    const [modalVisible, setModalVisible] = useState(false);

    const handleSignUp = () => {
        auth
        .createUserWithEmailAndPassword(email, password)
        .then((userCredentials : any) => {
          const user = userCredentials.user;
          console.log('Registered with:', user.email);
        })
        .catch((error : any) => alert(error.message))
    }

    const renderModal = () => {
        return (
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  setModalVisible(!modalVisible);
                }}
                style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end',  backgroundColor: 'black'}}
              >
                  <View
                    style={{
                        height: SIZES.height,
                        width: SIZES.width,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: SIZES.padding,
                        paddingHorizontal: SIZES.padding * 2,
                        marginBottom: SIZES.padding * 0.5,
                        backgroundColor: COLORS.white
                    }}
                >
                    <Text style={{ marginVertical: 10, textAlign: 'center', ...FONTS.h2 }}>Success</Text>
                    <TouchableOpacity 
                      onPress={() => {
                        setModalVisible(!modalVisible)
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
                      <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Try again</Text>
                    </TouchableOpacity>
                </View>
    
              </Modal>
            
        )
      }

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{ marginVertical: 10, textAlign: 'center', ...FONTS.h2 }}>Signup right now</Text>
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
            handleSignUp()
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
          <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Signup</Text>
        </TouchableOpacity>
        </SafeAreaView>
    )
}