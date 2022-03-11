import React, {Component} from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { useState, useEffect, useCallback} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native'
import { COLORS, SIZES, FONTS } from '../constants'
import { FlatList } from 'react-native-gesture-handler'

const quizzes = [
  {
    id: '1',
    question: "What land animal can open its mouth the widest?",
    options: ["Alligator","Crocodile","Baboon","Hippo"],
    correct_option: "Hippo"
  },
  {
      id: '2',
      question: "What is the largest animal on Earth?",
      options: ["The African elephant","The blue whale","The sperm whale","The giant squid"],
      correct_option: "The blue whale"
  },
]

export default function QuizScreen ({ navigation}: {navigation: any}) {

  const [playerScore, setPlayerScore] = useState(0)
  const [currentQuestion, setCurrentQuestion]  = useState(0)
  const [answer, setAnswer] = useState('')

  const [timeLeft, setTimeLeft] = useState(10)

  let timer: any = () => {}

  const startTimer = () => {
    
    timer = setTimeout(() => {
          if(timeLeft <= 0){
              clearTimeout(timer)
              navigation.navigate('Result')
              return false;
          }
       setTimeLeft(timeLeft-1)
      }, 1000)
   }

   useEffect(() => {
    startTimer();
    return () => clearTimeout(timer);
   })

  const start = () => {
      setTimeLeft(10);
      clearTimeout(timer)
      startTimer();
  }

  const renderHeader = () => {
    return (
      <View style={{
        flexDirection: 'row', 
        height: 50, 
        width: SIZES.width, 
        justifyContent: 'center', 
        alignItems: 'center', 
        position: 'absolute',
        top: SIZES.padding 
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
              <Text style={{ ...FONTS.h3 }}>Location</Text>
          </View>
      </View>
  </View>
    )
  }

  useFocusEffect(
    useCallback(() => {

      start()
      console.log('Screen was focused');

      return () => {

        console.log('Screen was unfocused');
        // Useful for cleanup functions

      };
    }, [])
  )
  
  const renderCountDownClock = () => {

    return (
      <View
          style={{
              width: SIZES.width,
              height: 50,
              justifyContent: 'center',
              flexDirection: 'row',
              marginTop: SIZES.padding * 3
          }}
      >
          <View
              style={{
                  width: 50,
                  backgroundColor: COLORS.white,
                  alignItems: 'center',
                  justifyContent: 'center'
              }}
          >
              <Text style={{ ...FONTS.h2 }}>{timeLeft}</Text>
          </View>
      </View>
    )
  }

  const renderQuestion = () => {
    return (
      <View
        style={{
            width: SIZES.width,
            alignItems: 'center',
            marginTop: 15,
            paddingHorizontal: SIZES.padding * 2,
            marginBottom: SIZES.padding
        }}
    >
        <Text style={{ marginVertical: 10, textAlign: 'center', ...FONTS.h2 }}>{quizzes[currentQuestion].question}</Text>
    </View>
    )
  }
  
  const renderMultipleChoice = () => {
    const renderItem = ({ item }: {item : any}) => (
      <TouchableOpacity
            onPress={()=>{
              setAnswer(item)
            }}
            style= {(item === answer) ? styles.selectedChoice : styles.normalChoice}
          >
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: SIZES.padding* 0.5,
                    width: SIZES.width* 0.7,
                    borderBottomColor: COLORS.lightGray,
                    borderBottomWidth: 1
                }}
            >
                <Text style={{ ...FONTS.h3 }}>{item}</Text>
            </View>

          </TouchableOpacity>
    )
    return (
        <FlatList
          scrollEnabled={false} 
          data={quizzes[currentQuestion].options}
          renderItem={renderItem}
          keyExtractor={item => item}
        />
    )
  }
  
  const renderNextButton = () => {
    return (
      <View
          style={{
              padding: SIZES.padding * 2,
              alignItems: 'center',
              justifyContent: 'center'
          }}
      >
          <TouchableOpacity
              style={{
                  width: SIZES.width * 0.7,
                  backgroundColor: COLORS.primary,
                  alignItems: 'center',
                  borderRadius: SIZES.radius,
                  padding: SIZES.padding * 0.5
              }}
              onPress={() => {
                if (answer === quizzes[currentQuestion].correct_option && currentQuestion !== (quizzes.length-1)) { 
                  setCurrentQuestion(currentQuestion + 1)
                  setPlayerScore(playerScore + 100)
                  start()
                }
                else if (answer === quizzes[currentQuestion].correct_option) {
                  const result = playerScore + 100
                  setCurrentQuestion(0)
                  setPlayerScore(0)
                  setAnswer('')
                  clearTimeout(timer)
                  navigation.navigate('Result', { playerScore: result })
                }
                else {
                  setCurrentQuestion(0)
                  setPlayerScore(0)
                  setAnswer('')
                  clearTimeout(timer)
                  navigation.navigate('Result', { playerScore })
                }
              }}
          >
              <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Next</Text>
          </TouchableOpacity>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>

        { renderHeader() }

        { renderCountDownClock() }

        { renderQuestion() }

        { renderMultipleChoice() }

        { renderNextButton() }

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.lightGray
  },
  normalChoice: {
    backgroundColor: COLORS.white,
    marginBottom: SIZES.padding,
    borderRadius: 18
  },
  selectedChoice: {
    backgroundColor: 'orange',
    marginBottom: SIZES.padding,
    borderRadius: 18
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  }
})
