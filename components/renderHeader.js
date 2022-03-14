import React, {Component, useState} from 'react'
import { View, Text } from 'react-native'
import { SIZES, COLORS, FONTS } from '../constants'
export const renderHeader = () => {
    return (
      <View style={{
        flexDirection: 'row', 
        height: 50, 
        width: SIZES.width, 
        justifyContent: 'center', 
        alignItems: 'center', 
        }}
      >
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <View
              style={{
                  width: '70%',
                  height: "100%",
                  backgroundColor: COLORS.gray,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: SIZES.radius
              }}
          >
              <Text style={{ ...FONTS.h3 }}>10 LIFE</Text>
          </View>
      </View>
  </View>
    )
  }