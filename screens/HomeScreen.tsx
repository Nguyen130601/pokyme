import React, {Component, useState} from 'react'
import { SafeAreaView, Text, TouchableOpacity, View, StyleSheet, Image, Modal} from 'react-native'
import { FlatList} from 'react-native-gesture-handler'

import { SIZES, icons, COLORS, FONTS, images } from '../constants'

import { renderHeader } from '../components/renderHeader'

export default function HomeScreen ({navigation}: {navigation: any}) {

    const topics = [
      { 
        id: '1',
        name: 'Animal',
        icon: icons.garden
      }, 
      {
        id: '2',
        name: 'Human',
        icon: icons.flash
      }
    ]

    const quizlists = [
      {
        id: '1',
        name: 'Animal in the jungle',
        photo: images.plant1,
        level: 'rookie',
        categories: ['Animal', 'Human']
      },
      {
        id: '2',
        name: 'Human in the city',
        photo: images.plant3,
        level: 'rookie',
        categories: ['Animal', 'Human']
      }
    ]

    const renderTopics = () => {

      const [selectedCategory, chooseCategory] = useState('1')
      const renderItem = ({ item }: {item : any}) => (
        <TouchableOpacity
            style={{
              padding: SIZES.padding* 0.5,
              backgroundColor: (selectedCategory === item.id) ? COLORS.primary : COLORS.white,
              borderRadius: SIZES.radius,
              alignItems: "center",
              justifyContent: "center",
              marginRight: SIZES.padding,
              ...styles.shadow
          }}
          onPress={() => {
            chooseCategory(item.id)
          }}
        >
          <View
              style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: (selectedCategory == item.id) ? COLORS.white : COLORS.lightGray
              }}
          >
              <Image
                  source={item.icon}
                  resizeMode="contain"
                  style={{
                      width: 30,
                      height: 30
                  }}
              />
          </View>

          <Text
              style={{
                  marginTop: SIZES.padding * 0.5,
                  color: (selectedCategory == item.id) ? COLORS.white : COLORS.black,
                  ...FONTS.body4
              }}
          >
              {item.name}
          </Text>
        </TouchableOpacity>
      )
      return (
        <View style={{ padding: SIZES.padding }}>
          <Text style={{...FONTS.h1}}>Chose your topics</Text>
          <FlatList
            horizontal
            data={topics} 
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>
      )
    }

    const renderquizlists = () => {
      const renderItem = ({ item }: {item : any}) => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Quiz")
          }}
          style={{ marginBottom: SIZES.padding * 2 }}
        >
          <View
              style={{
                  marginBottom: SIZES.padding
              }}
          >
              <Image
                  source={item.photo}
                  resizeMode="cover"
                  style={{
                      width: "100%",
                      height: 200,
                      borderRadius: SIZES.radius
                  }}
              />

              <View
                  style={{
                      position: 'absolute',
                      bottom: 0,
                      height: 50,
                      width: SIZES.width * 0.3,
                      backgroundColor: COLORS.white,
                      borderTopRightRadius: SIZES.radius,
                      borderBottomLeftRadius: SIZES.radius,
                      alignItems: 'center',
                      justifyContent: 'center',
                      ...styles.shadow
                  }}
              >
                  <Text style={{ ...FONTS.h4 }}>{item.level}</Text>
              </View>
          </View>

          {/* Restaurant Info */}
          <Text style={{ ...FONTS.body2 }}>{item.name}</Text>

          <View
              style={{
                  marginTop: SIZES.padding,
                  flexDirection: 'row'
              }}
          >
              {/* Rating */}
              <Image
                  source={icons.heartRed}
                  style={{
                      height: 20,
                      width: 20,
                      tintColor: COLORS.primary,
                      marginRight: 10
                  }}
              />
              <Text style={{ ...FONTS.body3 }}>{item.rating}</Text>

              {/* Categories */}
              <View
                  style={{
                      flexDirection: 'row',
                      marginLeft: 10
                  }}
              >
                  {
                      item.categories.map((categoryId : any) => {
                          return (
                              <View
                                  style={{ flexDirection: 'row' }}
                                  key={categoryId}
                              >
                                  <Text style={{ ...FONTS.body3 }}>{categoryId}</Text>
                                  <Text style={{ ...FONTS.body3 }}>.</Text>
                              </View>
                          )
                      })
                  }
              </View>
          </View>
        </TouchableOpacity>
      )

      return (
        <View>
          <Text style={{...FONTS.h1, paddingLeft: SIZES.padding, paddingBottom: SIZES.padding}}>Choose your quizzz</Text>
          <FlatList
            data={quizlists}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            style={{
              paddingHorizontal: SIZES.padding,
              paddingBottom: 30
              }}
          />
        </View>
      )
    }

    return (
      <SafeAreaView  style={ styles.container }>

        { renderHeader() }

        { renderTopics() }

        {renderquizlists()}

      </SafeAreaView>
    )
  }

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGray
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 1,
    }
})