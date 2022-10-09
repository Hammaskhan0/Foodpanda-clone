import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'
import { borderWidth } from 'tailwindcss-classnames'
import { useState } from 'react'
import {
    Entypo
  } from "@expo/vector-icons";
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart, selectCartItems, selectCartItemsWithId } from '../../Features/cartSlice'
// import { addToCart, removeFromCart, selectCartItems, selectCartItemsWithId } from '../app/CartSlice'

const MenuItems = ({name,price,image,id,description}) => {
    const [isPressed,setIsPressed] =useState(false)
    const dispatch = useDispatch();
    const Items = useSelector((state) => selectCartItemsWithId(state,id));

    const AddItemToCart = () => {
        dispatch(addToCart({name,price,image,id,description}))
    }
    // console.log("Items",Items)
 
    const removeItemFromCart = () => {
        if (!Items) return

        dispatch(removeFromCart({ id }))
    }
  return (
    <>
    
    <TouchableOpacity onPress={()=> setIsPressed(!isPressed)} 
    style={tw`bg-white border p-4 border-gray-200 ${isPressed && 'border-b-0'}`}>
    
    
        <View style={tw`flex-row`}>
    <View style={tw`flex-1 pr-2`}>
      <Text style={tw`text-lg mb-1 `}>{name}</Text>
      <Text style={tw`text-gray-400`}>{description}</Text>
       <Text style={tw`text-gray-400 pt-2`}>
        Rs : {price}
       </Text>
    </View>
    <View>
        <Image 
        style={[tw`h-20 w-20 bg-gray-300 p-4 `,styles.image]}
        source={{uri: image}}/>
    </View>
    </View>

    </TouchableOpacity>
    {isPressed && (
        <View style={tw`bg-white px-4`}>     
               <View style={tw`flex-row items-center   pb-3`}>
            <TouchableOpacity style={tw `ml-1 `} disabled={!Items.length}  onPress={removeItemFromCart}>
             <Entypo name='circle-with-minus' size={28}
              color={Items.length > 0 ?"#00CCBB": 'gray'}/>
            </TouchableOpacity>
            <Text style={tw `ml-4` }>
              {Items.length}
              
            </Text>
            <TouchableOpacity style={tw ` ml-4`} onPress={AddItemToCart}>
             <Entypo name='circle-with-plus'  size={28} color='#00CCBB'/>
            </TouchableOpacity>
            
        </View>
        </View>

    )}
  </>
  ) 
}

export default MenuItems

const styles = StyleSheet.create({
    image:{
        borderWidth:1,
        borderColor:'#F3F4'
    }
})