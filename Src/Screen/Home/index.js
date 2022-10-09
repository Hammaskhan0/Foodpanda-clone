import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Platform,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  FontAwesome5,
  AntDesign,
  MaterialIcons,
  Feather,
  Ionicons
} from "@expo/vector-icons";
import DashboardItem from "../../Components/DashboardItem";
import { getRestaurantData } from "../../Config/Firebase";

const Home = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const [rest, setrest] = useState([]);

  useEffect(() => {
    Resturants();
  }, []);

  const Resturants = async () => {
    const result = await getRestaurantData();
    setrest(result);
  };
  return (
    <>
      <SafeAreaView style={styles.container}>
        {/* Header Start */}
        <View style={styles.header}>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Ionicons name="md-menu-sharp" size={30} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                paddingLeft: 10,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: 15,
                }}
              >
                Current Location
              </Text>
              <Text
                style={{
                  color: "#fff",
                }}
              >
                Nazimabad
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.flexses}>
            <TouchableOpacity
              style={{
                position: "relative",
                right: 20,
              }}
            >
              <AntDesign name="hearto" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialIcons
                onPress={() => navigation.navigate("Cart")}
                name="add-shopping-cart"
                size={24}
                color="#fff"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <TextInput
            style={{
              position: "relative",
              bottom: 60,
              marginLeft: 20,
              width: "90%",
              overflow: "hidden",
              backgroundColor: "#fff",
              padding: 7,
              paddingLeft: 43,
              borderRadius: 20,
            }}
            placeholder="Seacrh for shops & resturants"
          />
          <View
            style={{
              position: "relative",
              bottom: 93,
              left: 30,
            }}
          >
            <Feather name="search" size={24} color="gray" />
          </View>
        </View>

        {/* ----> Header End <----  */}

        {/* ----> DashboardItem Start <----  */}
        <View
          style={{
            padding: 20,
            position: "relative",
            bottom: 50,
            paddingBottom: 150,
          }}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <>
              {rest ? (
                <>
                  {rest.map((e) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("Details", {
                            itemId: e.id,
                          });
                        }}
                      >
                        <DashboardItem
                        key={e.id}
                          image={{ uri: e.image }}
                          name={e.name}
                          type={e.type}
                          sub_title={e.sub_title}
                        />
                      </TouchableOpacity>
                    );
                  })}
                </>
              ) : (
                ""
              )}
            </>
          </ScrollView>
        </View>

        {/* ----> DashboardItem End <----  */}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  header: {
    backgroundColor: "#d70f64",
    height: "17%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
  },
  flexses: {
    flexDirection: "row",
    // marginTop: 20,
    // marginRight: 20,
  },
});

export default Home;
