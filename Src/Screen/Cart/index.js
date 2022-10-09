// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   ScrollView,
//   TouchableOpacity,
// } from "react-native";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// // import { removeItem } from "../../app/CartSlice";

// const Cart = ({ navigation }) => {
//   const cartItems = useSelector((state) => state.cart.items);
//   const calculateTotal = () => {
//     let total = 0;
//     cartItems.forEach((items) => {
//       total += items.menuData.id.price;
//     });
//     return total;
//   };

//   const dispatch = useDispatch();
//   const onRemove = (ids) => {
//     const r = dispatch(removeItem(ids));
//   };

//   return (
//     <>
//       <View style={{ flex: 1, backgroundColor: "#fff" }}>
//         <View
//           style={{
//             backgroundColor: "#fff",
//             flexDirection: "row",
//             justifyContent: "space-between",
//             padding: 20,
//           }}
//         >
//           <View
//             style={{
//               flexDirection: "row",
//               borderBottomWidth: 2,
//               borderColor: "#d70f64",
//             }}
//           >
//             <Text style={{ fontWeight: "bold", fontSize: 20 }}>
//               Cart Items{" "}
//             </Text>
//             <Text
//               style={{ color: "#d70f64", fontWeight: "bold", fontSize: 20 }}
//             >
//               {cartItems.length}
//             </Text>
//           </View>
//           <View
//             style={{
//               flexDirection: "row",
//               borderBottomWidth: 2,
//               borderColor: "#d70f64",
//             }}
//           >
//             <Text style={{ fontWeight: "bold", fontSize: 20 }}>Total </Text>
//             <Text
//               style={{ color: "#d70f64", fontWeight: "bold", fontSize: 20 }}
//             >
//               {calculateTotal()}
//             </Text>
//           </View>
//         </View>
//         <View style={{ backgroundColor: "#fff", marginBottom: 100 }}>
//           <ScrollView>
//             {!cartItems.length ? (
//               <View style={{ padding: 20 }}>
//                 <Text style={{ fontWeight: "bold" }}>
//                   No any singal items !
//                 </Text>
//               </View>
//             ) : (
//               <>
//                 {cartItems.map((items) => {
//                   return (
//                     <>
//                       <View
//                         style={{
//                           flexDirection: "row",
//                           justifyContent: "space-between",
//                           padding: 10,
//                           alignItems: "center",
//                         }}
//                       >
//                         <View
//                           style={{ flexDirection: "row", alignItems: "center" }}
//                         >
//                           <View>
//                             <Image
//                               style={styles.images}
//                               source={{ uri: items.menuData.id.image }}
//                             />
//                           </View>

//                           <View style={{ paddingLeft: 15 }}>
//                             <Text
//                               style={{
//                                 fontWeight: "bold",
//                                 width: 200,
//                                 // fontSize: 20,
//                               }}
//                             >
//                               {items.menuData.id.item}
//                             </Text>
//                             <Text style={{ color: "#d70f64" }}>
//                               Rs. {items.menuData.id.price}
//                             </Text>
//                           </View>
//                         </View>

//                         <View style={{ paddingRight: 10 }}>
//                           <MaterialCommunityIcons
//                             onPress={() => onRemove(items.menuData.id)}
//                             name="archive-remove-outline"
//                             size={34}
//                             color="#d70f64"
//                           />
//                         </View>
//                       </View>
//                       <View
//                         style={{
//                           borderBottomColor: "#DCDCDC",
//                           borderBottomWidth: 1,
//                         }}
//                       />
//                     </>
//                   );
//                 })}
//               </>
//             )}

//             {!cartItems?.length ? (
//               <View style={{ padding: 20, backgroundColor: "#fff" }}>
//                 <TouchableOpacity onPress={() => navigation.goBack()}>
//                   <Text style={{ color: "#d70f64" }}>Add Item</Text>
//                 </TouchableOpacity>
//               </View>
//             ) : (
//               <View style={{ padding: 20, backgroundColor: "#fff" }}>
//                 <TouchableOpacity onPress={() => navigation.goBack()}>
//                   <Text style={{ color: "#d70f64" }}>Add More Item</Text>
//                 </TouchableOpacity>
//               </View>
//             )}
//           </ScrollView>
//         </View>
//       </View>
//       {!cartItems.length ? (
//         ""
//       ) : (
//         <View
//           style={{
//             backgroundColor: "#fff",
//             justifyContent: "flex-end",
//           }}
//         >
//           <TouchableOpacity
//             onPress={() => navigation.navigate("Payment")}
//             style={{ alignItems: "center" }}
//           >
//             <Text
//               style={{
//                 backgroundColor: "#d70f64",
//                 color: "#fff",
//                 fontWeight: "bold",
//                 padding: 10,
//                 borderRadius: 6,
//                 marginBottom: 10,
//               }}
//             >
//               Confirm payment
//             </Text>
//           </TouchableOpacity>
//         </View>
//       )}
//     </>
//   );
// };

// export default Cart;

// const styles = StyleSheet.create({
//   images: {
//     width: 100,
//     height: 100,
//     borderRadius: 5,
//   },
// });

import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Octicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux';
import { selectRestaurant } from '../../../Features/restaurantSlice';
import tw from 'tailwind-react-native-classnames';
import { removeFromCart, selectCartItems, selectCartTotal } from '../../../Features/cartSlice';
import { useEffect } from 'react';
import { useState } from 'react';
// import { SafeAreaView } from 'react-native-web';

const Cart = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant)
  const items = useSelector(selectCartItems)
  const disptach = useDispatch();
  const [groupedItemsInCart, setGroupedItemsInCart] = useState([])
  const cartTotal = useSelector(selectCartTotal)

  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results
    }, {});

    setGroupedItemsInCart(groupedItems)
  }, [items])
  return (
    <>
      <SafeAreaView style={tw`flex-1 bg-white mt-9`}>
        <View style={tw`flex-1 bg-gray-100`}>
          <View style={[tw`p-5 border-b  bg-white `, styles.border]}>
            <View>
              <Text style={tw`text-lg font-bold text-center`}>Cart</Text>
              <Text style={tw`text-gray-400 text-center`}>{restaurant.name}</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.goBack()}
              style={tw`rounded-full bg-gray-100 absolute top-3 right-5`}
            >
              <Octicons name="x-circle-fill" size={30} color='#00CCBB' />
            </TouchableOpacity>
          </View>
          <View style={tw`flex-row items-center px-4 py-3 bg-white my-5`}>
            <Image
              style={tw`h-7 w-9 bg-gray-300 p-4 rounded-full  `}
              source={{
                uri: 'https://links.papareact.com/wru'
              }} />
            <Text style={tw`flex-1 px-3`}  >Deleiver  in  40-45 minutes</Text>
            <TouchableOpacity>
              <Text style={tw`pr-3 text-gray-400`}>Change</Text>
            </TouchableOpacity>
          </View>
          <ScrollView >
            {Object.entries(groupedItemsInCart).map(([key, items]) => (
              <View key={key} style={tw`flex-row items-center bg-white 
              py-2 px-5 border-b border-gray-300 `}>
                <Text style={tw`px-2 text-gray-500`}>{items.length} X</Text>
                <Image
                  style={tw`h-12 w-12 rounded-sm  px-2`}
                  source={{ uri: items[0]?.image }}
                />
                <Text style={tw`flex-1 px-2`}>{items[0]?.name}</Text>
                <Text style={tw`text-gray-600 px-3`}>
                  Rs : {items[0]?.price}
                </Text>
                <TouchableOpacity>
                  <Text style={tw`text-xs text-gray-400`}
                    onPress={() => disptach(removeFromCart({ id: key }))}
                  >
                    Remove
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
          <View style={tw`p-5 bg-white mt-5 px-4 py-6`}>
            <View style={{flexDirection:'row',justifyContent:"space-between",marginBottom:6}}>
              <Text style={tw`text-gray-500`}>SubTotal</Text>
              <Text style={tw`text-gray-500    `}>
                  Rs : {cartTotal}
                </Text>
            </View>
            <View style={{flexDirection:'row',justifyContent:"space-between",marginBottom:6}}>
              <Text style={tw`text-gray-500`}>Delivery Fee</Text>
              <Text style={tw`text-gray-500   `}>
                  Rs : {70}
                </Text>
            </View>
            <View style={{flexDirection:'row',justifyContent:"space-between",marginBottom:6}}>
              <Text style={tw`text-gray-500 font-extrabold`}>Total</Text>
              <Text style={tw`text-gray-500  font-extrabold  `}>
                  Rs : {cartTotal+70}
                </Text>
            </View>
            {/* <TouchableOpacity onPress={()=> navigation.navigate('Payment')} style={[tw`rounded-lg p-4 bg-gray-400`]}>
              <Text style={tw`text-center text-white text-lg font-bold`}>Continue</Text>
            </TouchableOpacity> */}
              <TouchableOpacity
              onPress={() => navigation.navigate("Payment")}
              style={styles.footer_button}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>
              Continue
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* <Text>Cart</Text> */}
      </SafeAreaView>
    </>
  )
}

export default Cart

const styles = StyleSheet.create({
  border: {
    borderColor: '#00CCBB'
  },
  footer_button: {
    backgroundColor: "#d70f64",
    width: "80%",
    padding: 10,
    borderRadius: 7,
    alignItems: "center",
    marginLeft: 40,
    // marginBottom: 20,
  },
})