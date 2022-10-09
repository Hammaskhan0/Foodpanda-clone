import { View, Text, Image, SafeAreaView, StyleSheet, Platform, StatusBar, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Entypo } from '@expo/vector-icons';
import { getUserInfo } from '../../Config/Firebase';
import { Feather, AntDesign } from '@expo/vector-icons';


const Profile = ({ navigation }) => {
    const [user, setUser] = useState()

    useEffect(() => {
        myUsers()
    }, []);

    const myUsers = async () => {
        const result = await getUserInfo()
        setUser(result)
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.top_bar}>
                <View style={{
                    marginLeft: 10
                }}>
                    <Entypo name="cross" size={24} color='#d70f64' onPress={() => navigation.goBack()} />
                </View>
                <View style={{
                    marginLeft: 20
                }}>
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: 16
                    }}>Profile</Text>
                </View>
            </View>

            <View style={[styles.card, styles.elevation]}>
                <View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                        <Text>Name</Text>
                        <Feather name="edit-2" size={24} color='#d70f64' />
                    </View>
                    <Text style={styles.user_data}>{user && user.name}</Text>
                </View>
            </View>
            <View style={[styles.card, styles.elevation]}>
                <View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                        <Text>Email</Text>
                        <Feather name="edit-2" size={24} color='#d70f64' />
                    </View>
                    <Text style={styles.user_data}>{user && user.email}</Text>
                </View>
            </View>
            <View style={[styles.card, styles.elevation]}>
                <View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                        <Text>Mobile Number</Text>
                        <Feather name="edit-2" size={24} color='#d70f64' />
                    </View>
                    <Text style={styles.user_data}></Text>
                </View>
            </View>
            <View style={{
                padding: 10,
                paddingLeft: 35
            }}>
                <Text style={{
                    fontWeight: 'bold',
                    fontSize: 18
                }}>Connected accounts</Text>
            </View>
            <View style={[styles.card, styles.elevation]}>
                <View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <Entypo name="facebook-with-circle" size={24} color='#1B74E4' />
                            <Text style={{
                                position: 'relative',
                                left: 20,
                                fontWeight: 'bold'
                            }}>Facebook</Text>
                        </View>
                        <Text style={{
                            color: '#d70f64'
                        }}>Connect</Text>
                    </View>
                </View>
            </View>
            <View style={[styles.card, styles.elevation]}>
                <View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <AntDesign name="google" size={24} color="#DB4437" />
                            <Text style={{
                                position: 'relative',
                                left: 20,
                                fontWeight: 'bold'
                            }}>Google</Text>
                        </View>
                        <Text style={{
                            color: '#d70f64'
                        }}>Connect</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    top_bar: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        paddingVertical: 25,
        paddingHorizontal: 25,
        width: '80%',
        marginVertical: 10,
        padding: 10,
        marginLeft: 40
    },
    elevation: {
        // shadowColor: '#000',
        elevation: 20,
    },
    user_data: {
        position: 'relative',
        top: 10,
        fontWeight: 'bold'
    }
});



export default Profile