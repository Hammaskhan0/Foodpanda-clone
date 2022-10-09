import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Share,
  ActivityIndicator,
} from "react-native";
import React from "react";
import {
  MaterialIcons,
  EvilIcons,
  Feather,
  AntDesign,
} from "@expo/vector-icons";
import { useState, useEffect, useLayoutEffect } from "react";
import { getdetail, getMenuId, getRestaurentMenu } from "../Config/Firebase";

const DetailHeader = ({ route }) => {
  const [idData, setIdData] = useState();

  useEffect(() => {
    getDetailbyid();
  }, []);

  const { itemId } = route.params;

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: idData.image,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  const getDetailbyid = async () => {
    const data = await getdetail(itemId);
    setIdData(data);
  };
  if (!idData) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }

  var RandomNumber = Math.floor(Math.random() * 50) + 20;
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View>
          <ImageBackground style={styles.image} source={{ uri: idData.image }}>
            <View
              style={{
                padding: 20,
                paddingTop: 50,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={styles.top_menu_icon}>
                <Feather
                  onPress={() => navigation.goBack()}
                  name="arrow-left"
                  size={24}
                  color="#d70f64"
                />
              </View>
              <View style={styles.top_menu_icon}>
                <AntDesign
                  onPress={onShare}
                  name="sharealt"
                  size={24}
                  color="#d70f64"
                />
              </View>
            </View>
          </ImageBackground>
        </View>
        <Text style={{ fontWeight: "bold", padding: 10 }}>{idData.title}</Text>
        <View style={styles.texts}>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ paddingRight: 5, color: "gray", fontSize: 12 }}>
              2.7km away
            </Text>
            <Text style={{ paddingRight: 5, fontSize: 12 }}>|</Text>
            <Text
              style={{
                paddingRight: 5,
                color: "gray",
                fontSize: 12,
                fontWeight: "bold",
              }}
            >
              Rs Minimum{" "}
            </Text>
            <Text style={{ paddingRight: 5, fontSize: 12 }}>|</Text>
            <Text>
              <MaterialIcons name="star-rate" size={14} color="#d70f64" />
              <MaterialIcons name="star-rate" size={14} color="#d70f64" />
              <MaterialIcons name="star-rate" size={14} color="#d70f64" />
              <MaterialIcons name="star-rate" size={14} color="#d70f64" />
              <MaterialIcons name="star-rate" size={14} color="gray" />
            </Text>
            <Text style={{ fontSize: 12, color: "gray", marginLeft: 5 }}>
              1000+ ratings
            </Text>
          </View>
          <View style={styles.moreInfo}>
            <Text
              style={{
                color: "#d70f64",
                fontWeight: "bold",
              }}
            >
              More Info
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", padding: 5, marginTop: 10 }}>
          <EvilIcons name="clock" size={24} color="#d70f64" />
          <Text style={{ marginLeft: 10, fontWeight: "bold" }}>
            Delivery: {RandomNumber} min
          </Text>
        </View>
        <View
          style={{
            borderBottomColor: "#DCDCDC",
            borderBottomWidth: 1,
            marginTop: 20,
          }}
        />
        <View
          style={{
            marginTop: 10,
            padding: 15,
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: "#fff",
          }}
        >
          <View>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 20,
              }}
            >
              Variation
            </Text>
            <Text
              style={{
                color: "gray",
              }}
            >
              Select Item
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "#D2DAE1",
              borderRadius: 15,
              height: 35,
              width: 90,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>Required</Text>
          </View>
        </View>

        <View
          style={{
            borderBottomColor: "#DCDCDC",
            borderBottomWidth: 1,
            marginTop: 20,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default DetailHeader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  top_menu_icon: {
    backgroundColor: "#fff",
    borderRadius: 50,
    padding: 10,
  },
  image: {
    width: "100%",
    height: 180,
  },
  texts: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
});
