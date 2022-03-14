import React, {Component, useRef} from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { useState, useEffect, useCallback} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Animated } from 'react-native'
import { COLORS, SIZES, FONTS } from '../constants'
import { FlatList } from 'react-native-gesture-handler'
import { renderHeader } from '../components/renderHeader'
import { Audio } from 'expo-av'

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

  const progress = useRef(new Animated.Value(0)).current

  const [playerScore, setPlayerScore] = useState(0)

  const [currentQuestion, setCurrentQuestion]  = useState(0)

  const [answer, setAnswer] = useState('')

  const [timeLeft, setTimeLeft] = useState(10)

  const [disable, setDisable] = useState(true)


  let timer: any = () => {}

  const startTimer = () => {
    
    timer = setTimeout(() => {
          if(timeLeft <= 0){
              clearTimeout(timer)
              //navigation.navigate('Result')
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

  useFocusEffect(
    useCallback(() => {

      //start()
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
              setDisable(false)
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
    const backgroundSound = async () => {
      await Audio.setAudioModeAsync({ playsInSilentModeIOS: true })

      const playbackObject = new Audio.Sound()

      await playbackObject.loadAsync(require('../assets/sounds/Correct-answer.mp3'))
      await playbackObject.playAsync()
    }
    const backgroundSlideIn = () => {
      Animated.timing(progress, {
        toValue: 2,
        duration: 2000,
        useNativeDriver: false
      }).start(() => {
        if (answer === quizzes[currentQuestion].correct_option && currentQuestion !== (quizzes.length-1)) {
          progress.setValue(0)
          setCurrentQuestion(currentQuestion + 1)
          setPlayerScore(playerScore + 100)
          setAnswer('')
          setDisable(true)
          start()
        }
        else if (answer === quizzes[currentQuestion].correct_option) {
          const result = playerScore + 100
          progress.setValue(0)
          setCurrentQuestion(0)
          setPlayerScore(0)
          setAnswer('')
          setDisable(true)
          clearTimeout(timer)
          navigation.navigate('Result', { playerScore: result })
        }
        else {
          progress.setValue(0)
          setCurrentQuestion(0)
          setPlayerScore(0)
          setAnswer('')
          setDisable(true)
          clearTimeout(timer)
          navigation.navigate('Result', { playerScore })
        }
      })
    }
    return (
      <View style={{flex:1}}>
        <Animated.View
            style={{
                flex: 1,
                position: 'absolute',
                top: -SIZES.padding,
                left: -SIZES.width*0.5,
                height: SIZES.height * 0.15,
                width: SIZES.width,
                alignSelf: 'center',
                justifyContent: 'center',
                backgroundColor: 'green',
                borderTopRightRadius: 25,
                borderTopLeftRadius: 25,
                opacity: progress
            }}
        >
        </Animated.View>
        <TouchableOpacity
                disabled={disable}
                style= { (disable === true) ? styles.disableButton : styles.enableButton  }
                onPress={() => {
                  backgroundSound()
                  backgroundSlideIn()
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
  disableButton: {
    position: 'absolute',
    marginBottom: SIZES.padding,
    alignSelf: 'center',
    width: SIZES.width * 0.7,
    backgroundColor: COLORS.gray,
    alignItems: 'center',
    borderRadius: SIZES.radius,
    padding: SIZES.padding * 0.5,
  },
  enableButton: {
    position: 'absolute',
    marginBottom: SIZES.padding,
    width: SIZES.width * 0.7,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: SIZES.radius,
    padding: SIZES.padding * 0.5
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
