import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectCartItems, selectCartTotal } from '../../Features/cartSlice'
import { useNavigation } from '@react-navigation/native'
import tw from 'tailwind-react-native-classnames'

const CartIcon = () => {
    const items = useSelector(selectCartItems)
    const navigation = useNavigation();
    const cartTotal = useSelector(selectCartTotal)
    if (items.length === 0) return null;
  return (
    <View style={tw`absolute bottom-10 w-full z-50`}>
        <TouchableOpacity 
        onPress={()=> navigation.navigate('Cart')}
         style={[tw`mx-5 p-4 rounded-lg flex-row items-center ml-4`,styles.viewCart]}>
      <Text style={[tw`text-white font-extrabold text-lg py-1 px-2 `,styles.text]}>{items.length}</Text>
      <Text style={tw`flex-1 text-white font-extrabold text-center text-lg`}>View Cart</Text>
      <Text style={tw`text-lg font-extrabold text-white`}>Rs: {cartTotal}</Text>

        </TouchableOpacity>
    </View>
  )
}

export default CartIcon

const styles = StyleSheet.create({
    viewCart:{
        backgroundColor:'#d70f64',
        
    },
    text:{
        backgroundColor:'#01a296'
    }
})