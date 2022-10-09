import { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  SafeAreaViewBase,
  StatusBar,
  Image
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import tw from "tailwind-react-native-classnames";
import { Octicons } from "@expo/vector-icons";
import *as Progress from 'react-native-progress'
import { useSelector } from "react-redux";
import { selectRestaurant } from "../../Features/restaurantSlice";

export default function Map({ navigation }) {
  const [location, setLocation] = useState({});
  const [errorMsg, setErrorMsg] = useState(null);
  const restaurant = useSelector(selectRestaurant)

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      // let { coords: { latitude, longitude }} = await Location.getCurrentPositionAsync({});
      // setLocation({ latitude, longitude });

      Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Lowest,
          timeInterval: 100,
          distanceInterval: 0.05,
        },
        (location) => {
          let {
            coords: { latitude, longitude },
          } = location;
          setLocation({ latitude, longitude });
        }
      );
    })();
  }, []);


  return (
    <>
      <View style={[tw`bg-gray-500 flex-1`, styles.containered]}>
        <SafeAreaView style={tw`z-50 `}>
          <View style={tw`flex-row justify-between items-center p-5`}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}
              style={tw``}
            >
              <Octicons name="x" size={30} color='#00CCBB' />
            </TouchableOpacity>
            <Text style={tw`font-light text-lg text-white`}>Order Help</Text>
          </View>
          <View style={tw`bg-white mx-5 my-2 rounded-md p-6 z-50 shadow-md`}>
            <View style={tw`flex-row justify-between`}>
              <View >
                <Text style={tw` text-lg text-gray-400`}> Estimated Arrival</Text>
                <Text style={tw`text-4xl font-bold`}>
                  35-40 Minutes
                </Text>
              </View>
              <Image style={tw`h-20 w-20`} source={{ uri: "https://links.papareact.com/fls" }} />
            </View>
            <Progress.Bar progress={0.3} size={30}  color='#00CCBB' indeterminate={true}/>
            <Text style={tw`mt-3 text-gray-500`}>Your order at {restaurant.name} is being prepared</Text>
          </View>
        </SafeAreaView>

        <MapView
          region={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.000002,
            longitudeDelta: 0.000001,
          }}
          style={tw`flex-1 mt-10 z-0`}
          mapType='mutedStandard'
        >
          <Marker
            coordinate={{
              latitude: location.latitude || 24.8964165,
              longitude: location.longitude || 67.0817985,
            }}
            title={"Your Order"}
            description={"Deliverd on 10 mins"}
            // image={{
            //   width: 100,
            //   uri: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/048b4913-5180-4a01-8b68-0b9f150c7dfb/d55casd-dbd46594-586e-4f7b-a9bc-ef79b9e627ba.png/v1/fill/w_900,h_566,strp/bike_png_stock_by_doloresminette_d55casd-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NTY2IiwicGF0aCI6IlwvZlwvMDQ4YjQ5MTMtNTE4MC00YTAxLThiNjgtMGI5ZjE1MGM3ZGZiXC9kNTVjYXNkLWRiZDQ2NTk0LTU4NmUtNGY3Yi1hOWJjLWVmNzliOWU2MjdiYS5wbmciLCJ3aWR0aCI6Ijw9OTAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.qY_X56LUF24mxsH5OFxE9o4JsgjI-HBEUEWV0ybSnCw",
            // }}
            identifier='origin'
            pinColor="#00CCBB"
          />
        </MapView>
        <SafeAreaView style={tw`bg-white flex-row items-center h-24 `}>
          <Image
          style={tw`h-12 w-12 bg-gray-300 p-4 rounded-full ml-5`}
          source={{uri:'https://links.papareact.com/wru'}}
          />
          <View style={tw`flex-1`}>
            <Text style={tw`text-lg pl-3`}>Hammas Khan</Text>
            <Text style={tw`text-gray-400 pl-4`}>Your Rider</Text>
          </View>
          <Text style={tw`text-gray-400 text-lg font-bold mr-5`}>Call</Text>
        </SafeAreaView>

      </View>
      {/* <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#d70f64",
          padding: 10,
          marginBottom: 100,
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>Another Order</Text>
      </TouchableOpacity>
      <View style={styles.container}>
        <MapView
          region={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.000002,
            longitudeDelta: 0.000001,
          }}
          style={styles.map}
        >
          <Marker
            coordinate={{
              latitude: location.latitude || 24.8964165,
              longitude: location.longitude || 67.0817985,
            }}
            title={"Your Order"}
            description={"Deliverd on 10 mins"}
            image={{
              width: 100,
              uri: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/048b4913-5180-4a01-8b68-0b9f150c7dfb/d55casd-dbd46594-586e-4f7b-a9bc-ef79b9e627ba.png/v1/fill/w_900,h_566,strp/bike_png_stock_by_doloresminette_d55casd-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NTY2IiwicGF0aCI6IlwvZlwvMDQ4YjQ5MTMtNTE4MC00YTAxLThiNjgtMGI5ZjE1MGM3ZGZiXC9kNTVjYXNkLWRiZDQ2NTk0LTU4NmUtNGY3Yi1hOWJjLWVmNzliOWU2MjdiYS5wbmciLCJ3aWR0aCI6Ijw9OTAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.qY_X56LUF24mxsH5OFxE9o4JsgjI-HBEUEWV0ybSnCw",
            }}
          />
        </MapView>
      </View> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  containered: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

// https://www.google.com/maps/place/National+Stadium+Karachi/@24.8964165,67.0817985,16.6z/data=!4m5!3m4!1s0x3eb33f30a80523ff:0xf18a3ecfe7cffbdd!8m2!3d24.8960659!4d67.08145
