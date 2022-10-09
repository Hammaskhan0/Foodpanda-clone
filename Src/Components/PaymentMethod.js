import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RadioButton } from "react-native-paper";
import { useSelector } from "react-redux";
import { selectCartTotal } from "../../Features/cartSlice";
import tw from "tailwind-react-native-classnames";

const PaymentMethod = ({ navigation }) => {
  const [checked, setChecked] = useState();
  const cartTotal = useSelector(selectCartTotal)
  const deliveryFee = 70
  const cartItems = useSelector((state) => state.cart.items);
  const calculateTotal = () => {
    let total = 0;
    cartItems.forEach((items) => {
      total += items.menuData.id.price;
    });
    return total;
  };
  return (
    <>
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <View style={styles.div_wrapper}>
            <View style={styles.cash_icon}>
              <MaterialCommunityIcons name="cash-plus" size={20} color="gray" />
            </View>
            <Text style={{ fontWeight: "bold" }}>Cash</Text>
          </View>
          <View>
            <RadioButton
              value={checked}
              status={checked === "first" ? "checked" : "unchecked"}
              onPress={() => setChecked("first")}
              color="#d70f64"
            />
          </View>
        </View>
      </View>
      <View>
        <Image source={require("../../assets/Images/giphy.gif")} />
      </View>

      {checked && (
        // <View style={styles.footer}>
        //   <View style={styles.footer_alignment}>
        //     <View style={{ flexDirection: "row" }}>
        //       <Text style={{ fontWeight: "bold" }}>Total</Text>
        //       <Text style={{ fontSize: 10, margin: 5, color: "gray" }}>
        //         (incl.VAT)
        //       </Text>
        //     </View>
        //     <View>
        //       <Text
        //         style={{ fontWeight: "bold" }}
        //       > Rs . {cartTotal+deliveryFee}</Text>
        //     </View>
        //   </View>
        //   <View>
        //     <TouchableOpacity
        //       onPress={() => navigation.navigate("Map")}
        //       style={styles.footer_button}
        //     >
        //       <Text style={{ color: "#fff", fontWeight: "bold" }}>
        //         Place Order
        //       </Text>
        //     </TouchableOpacity>
        //   </View>
        // </View>
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
            <TouchableOpacity onPress={()=> navigation.navigate('Map')} style={[tw`rounded-lg p-4 bg-gray-500`]}>
              <Text style={tw`text-center text-white text-lg font-bold`}>Place Order</Text>
            </TouchableOpacity>
          </View>
      )}
    </>
  );
};

export default PaymentMethod;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  wrapper: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  div_wrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  cash_icon: {
    backgroundColor: "#FFFAFA",
    paddingRight: 5,
    paddingLeft: 3,
    marginRight: 10,
  },
  footer: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "flex-end",
  },
  footer_alignment: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  footer_button: {
    backgroundColor: "#d70f64",
    width: "80%",
    padding: 10,
    borderRadius: 7,
    alignItems: "center",
    marginLeft: 40,
    marginBottom: 20,
  },
});
