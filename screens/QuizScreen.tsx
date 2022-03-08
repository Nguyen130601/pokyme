import React, {Component} from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { useState, useEffect, useCallback} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native'

const quizzes = [
  {
    question: "What land animal can open its mouth the widest?",
    options: ["Alligator","Crocodile","Baboon","Hippo"],
    correct_option: "Hippo"
  },
  {
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

  const renderProgressBar = () => {
    return (
      <Text 
        style={{
          fontSize: 20,
          color: 'white'
        }}
      >Progress bar</Text>
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
      <Text
        style={{
          fontSize: 20,
          color: 'white'
        }}
      >00:{timeLeft}</Text>
    )
  }

  const renderQuestion = () => {
    return (
      <Text
        style={styles.question}
      > 
        {quizzes[currentQuestion].question}
      </Text>
    )
  }
  
  const renderMultipleChoice = () => {
    return (
      <View>
        { quizzes[currentQuestion].options.map(e => (
          <TouchableOpacity
            key={e}
            onPress={()=>{
              setAnswer(e)
            }}
            style= {(answer === e) ? styles.selectedChoice : styles.normalChoice}
          >
            <View>
              <Text style={{
                color: '#000'
              }}>{e}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    )
  }
  
  const renderNextButton = () => {
    return (
      <TouchableOpacity
        style={styles.nextButton}
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
        <Text>Next</Text>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>

        { renderProgressBar() }

        { renderCountDownClock() }

        { renderQuestion() }

        { renderMultipleChoice() }

        { renderNextButton() }

      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  question: {
    color: "white",
    fontSize: 30
  },
  normalChoice: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    height: 60,
    borderRadius: 20,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  selectedChoice: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    height: 60,
    borderRadius: 20,
    paddingHorizontal: 20,
    marginVertical: 10,
    backgroundColor: 'red'
  },
  nextButton: {
    width: "100%",
    height: 60,
    borderWidth: 3,
    alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginVertical: 10
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
