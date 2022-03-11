import React, {Component} from 'react'
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'

import { SIZES, FONTS, COLORS } from '../constants'

export default function ResultScreen ({ navigation, route }: {navigation: any, route: any}) {
    const playerScore = (route.params) ? route.params.playerScore : 0
    return (
      <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View
            style={{
                width: SIZES.width,
                alignItems: 'center',
                marginTop: 15,
                paddingHorizontal: SIZES.padding * 2,
                marginBottom: SIZES.padding
            }}
        >
            <Text style={{ marginVertical: 10, textAlign: 'center', ...FONTS.h2 }}>You have earned { playerScore } gold</Text>
        </View>
        <TouchableOpacity 
          onPress={() => {
            navigation.navigate('Quiz')
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
        <TouchableOpacity 
          onPress={() => {
            navigation.navigate('Home')
          }}
          style={{
            width: SIZES.width * 0.7,
            backgroundColor: COLORS.primary,
            alignItems: 'center',
            borderRadius: SIZES.radius,
            padding: SIZES.padding * 0.5
          }}
        >
          <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Choose other topics</Text>
        </TouchableOpacity>
      </SafeAreaView>
    )
  }