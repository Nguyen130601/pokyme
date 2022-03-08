import React, {Component} from 'react'
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

export default function HomeScreen ({navigation}: {navigation: any}) {

    const topics = [
      { 
        name: 'Topic 1',
        description: 'Animal'
      }, 
      {
        name: 'Topic 2',
        description: 'Human'
      }
    ]

    const renderTopic = () => {
      return (
        <View>
          {
            topics.map((e : any) => (
              <View key={e.name}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Quiz')
                  }}
                >
                  <Text>{e.name}</Text>
                  <Text>{e.description}</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text> 10 Like 10 Share 10 People currently playing</Text>
                </TouchableOpacity>
              </View>
            ))
          }
        </View>
      )
    }

    return (
      <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <LinearGradient
          // Background Linear Gradient
          colors={['rgba(0,0,0,0.8)', 'transparent']}
        />
        <LinearGradient
          // Button Linear Gradient
          colors={['#4c669f', '#3b5998', '#192f6a']}
        >
          <Text >Choose your topic</Text>
        </LinearGradient>
        { renderTopic() }
      </SafeAreaView>
    )
  }