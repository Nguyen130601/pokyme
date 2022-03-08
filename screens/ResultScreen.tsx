import { View, Text, TouchableOpacity } from 'react-native'

export default function ResultScreen ({ navigation, route }: {navigation: any, route: any}) {
    const playerScore = (route.params) ? route.params.playerScore : 0
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>You earned { playerScore } gold</Text>
        <TouchableOpacity 
          onPress={() => {
            navigation.navigate('Quiz')
          }}
        >
          <Text>Try quiz again</Text>
        </TouchableOpacity>
      </View>
    )
  }