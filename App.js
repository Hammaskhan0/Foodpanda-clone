import * as React from "react";

// import CustomCamera from './src/components/CustomCamera'
import MainNavigator from "./Src/Config/Navigation";

import "react-native-gesture-handler";
import Signup from "./Src/Screen/Signup";
import { Provider } from "react-redux";
import { store } from "./Store";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Src/Screen/Login";
import Home from "./Src/Screen/Home";
import DetailsScreen from "./Src/Components/DetailScreen";
import Cart from "./Src/Screen/Cart";
import PaymentMethod from "./Src/Components/PaymentMethod";
// import { store } from "./Src/app/store";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <Provider store={store}>
      <MainNavigator />

      {/* <NavigationContainer>   
          <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Signup} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Payment" component={PaymentMethod} />
      <Stack.Screen name="Map" component={Map} />
    </Stack.Navigator>
    </NavigationContainer> */}
 
      </Provider>
  );
}
