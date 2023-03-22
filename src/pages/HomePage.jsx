// imports
import { View, Text, StyleSheet, SafeAreaView, ScrollView, RefreshControl, Alert, Image, Button } from 'react-native'
import { useState, useEffect } from 'react'
import axios from 'axios'

// page
const HomePage = () => {
    // data
    const [refreshing, changeRefresh] = useState(false)
    const [rates, setRates] = useState([])
    const [error, setError] = useState(true)

    // created
    useEffect(() => {
        getExchangeRates()
    }, [])

    // methods
    async function getExchangeRates() {
        try {
            changeRefresh(true)
            const response = await axios.get('https://cbu.uz/oz/arkhiv-kursov-valyut/json/')
            setError(false)
            setRates(response.data)
        } catch (e) {
            setError(true)
            setRates([])
        } finally {
            changeRefresh(false)
        }
    }

    function refreshedPage() {
        getExchangeRates()
    }

    // element
    const MainElement = () => {
        if (!error) {
            return (
                <View>
                    <Text style={{ marginTop: 5 }}>
                        Valyuta yangilangan sana: <Text style={{fontWeight: '600'}}>{rates[0]?.Date}</Text>
                    </Text>
                    {
                        rates.map((rate) => {
                            return (
                                <View style={style.boxes} key={rate.id}>
                                    <Text style={style.parenText}>
                                        <Text style={style.text}>
                                            {rate.Ccy}
                                        </Text>
                                    </Text>

                                    <Text style={style.parenText}>
                                        <Text style={style.rate}>
                                            {rate.Nominal}
                                        </Text>
                                        <Text>
                                            {rate.Ccy}
                                        </Text>
                                    </Text>

                                    <Text style={style.parenText}>
                                        <Text style={style.rate}>
                                            {parseInt(rate.Rate).toLocaleString().split('.')}
                                        </Text>
                                        <Text>
                                            UZS
                                        </Text>
                                    </Text>
                                </View>
                            )
                        })
                    }
                </View>
            )
        } else {
            return (
                <View style={style.imageView}>
                    <Image style={style.image} source={require('../../assets/error.png')} />
                    <Button title='Qayta urunish' onPress={() => getExchangeRates()} />
                </View>
            )
        }
    }


    // view
    return (
        <SafeAreaView style={style.container}>
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => refreshedPage()} />}>
                {
                    MainElement()
                }
            </ScrollView>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10
    },
    boxes: {
        backgroundColor: '#fff',
        marginTop: 8,
        height: 70,
        borderRadius: 10,
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    parenText: {
        padding: 20,
    },
    text: {
        fontSize: 25,
        color: '#0229f2',
        fontWeight: '600'
    },
    rate: {
        fontSize: 25,
        fontWeight: '500',
    },
    imageView: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: 300,
        height: 300,
    }
})

export default HomePage