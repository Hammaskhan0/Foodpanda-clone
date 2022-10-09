import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const DashboardItem = ({ image, name, type, sub_title, navi }) => {

    return (
        <View style={styles.container}>
            {/* <TouchableOpacity onPress={navi}> */}
                <Image style={styles.image} source={image} />
            {/* </TouchableOpacity> */}
            <View style={styles.details}>
                <Text style={styles.text}>{name}</Text>
                <Text style={styles.dollar}> $$ {type}</Text>
                <View style={styles.flexes}>
                    <MaterialCommunityIcons name="bike-fast" size={14} color="gray" />
                    <Text style={styles.sub_title}>{sub_title}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 15,
        backgroundColor: "#fff",
        marginBottom: 20,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 200,
    },
    details: {
        padding: 10
    },
    text: {
        fontWeight: 'bold',
        marginBottom: 10
    },
    dollar: {
        marginBottom: 10,
        color: 'gray'
    },
    flexes: {
        flexDirection: 'row',
    },
    sub_title: {
        marginLeft: 10,
        color: 'gray'
    }
})

export default DashboardItem;
