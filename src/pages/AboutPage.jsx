// imports
import { View, Text, StyleSheet, Alert } from 'react-native'
import { useState } from 'react'
import * as ExpoClipboard from 'expo-clipboard'

// page
const AboutPage = () => {
    // data
    const [card, setCard] = useState('9860 1901 1473 0590')

    // methods
    async function copyToClipboard() {
        await ExpoClipboard.setStringAsync(card)
        Alert.alert('Karta raqamidan nusxa olindi!')
    }

    return (
        <View style={style.container}>
            <Text>
                Dasturchi: <Text style={style.developer}>Qodirov Oybekjon</Text>
            </Text>

            <Text style={style.text}>
                Dastur haqida: <Text style={style.developer}>Siz ushbu dastur orqali kunlik valyuta kursini kuzatib borishingiz mumkin!</Text>
            </Text>

            <Text style={style.text}>
                Donate: <Text style={style.donate} onPress={() => copyToClipboard()}>{card}</Text> (Oybekjon Qodirov)
            </Text>
        </View>
    )
}

// style
const style = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 10,
        margin: 12,
        padding: 5,
    },
    developer: {
        fontWeight: '600'
    },
    text: {
        marginTop: 10
    },
    donate: {
        fontWeight: '600',
        color: '#0229f2'
    }
})

export default AboutPage