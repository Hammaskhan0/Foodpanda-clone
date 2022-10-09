import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { getUserInfo } from "../Config/Firebase";
import { getAuth, signOut } from "firebase/auth";

const CustomDrawer = (props) => {
  const [user, setUser] = useState();
  const [getData, setGetData] = useState();
  useEffect(() => {
    myUsers();
    // getUserInfo()
  }, []);

  const myUsers = async () => {
    const result = await getUserInfo();
    setUser(result);
  };

  const logOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        props.navigation.navigate("Login");
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <View style={styles.container}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: "#d70f64" }}
      >
        <View
          style={{
            paddingLeft: 15,
            height: 200,
            paddingTop: 20,
          }}
        >
          <Image
            source={require("../../assets/Images/fp-profile.jpg")}
            style={{
              height: 100,
              width: 100,
              borderRadius: 50,
              marginBottom: 10,
              borderWidth: 2,
              borderColor: "#fff",
            }}
          />
          <Text
            style={{
              // paddingLeft: 15,
              fontWeight: "bold",
              color: "#fff",
              fontSize: 20,
              paddingTop: 45,
              position: "relative",
              bottom: 10,
              left: 10,
            }}
          >
            {user ? (
              user.name
            ) : (
              <TouchableOpacity
                onPress={myUsers}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    color: "#fff",
                    marginRight: 10,
                  }}
                >
                  Click Here
                </Text>
                <Ionicons name="arrow-back-outline" size={24} color="#fff" />
              </TouchableOpacity>
            )}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: "#fff",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  color: "#d70f64",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                panda
              </Text>
              <Text
                style={{
                  fontStyle: "italic",
                  fontSize: 16,
                  backgroundColor: "#d70f64",
                  color: "#fff",
                  paddingLeft: 5,
                  paddingRight: 5,
                }}
              >
                pay
              </Text>
            </View>
            <View
              style={{
                backgroundColor: "#F6D2FA",
                paddingRight: 5,
                paddingLeft: 5,
                borderRadius: 7,
              }}
            >
              <Text
                style={{
                  color: "#d70f64",
                }}
              >
                Rs.0.00
              </Text>
            </View>
          </View>
          <Text style={{ paddingLeft: 15, position: "relative", bottom: 10 }}>
            Credite and payment method
          </Text>
          <View
            style={{
              borderBottomColor: "#DCDCDC",
              borderBottomWidth: 1,
              marginTop: 10,
            }}
          />

          <View
            style={{
              marginTop: 20,
            }}
          >
            <DrawerItemList {...props} />
          </View>
        </View>
      </DrawerContentScrollView>
      <View
        style={{
          borderBottomColor: "#DCDCDC",
          borderBottomWidth: 1,
        }}
      />
      <View
        style={{
          padding: 15,
          marginBottom: 10,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            marginRight: 12,
          }}
        >
          <Ionicons name="md-settings-outline" size={24} color="#d70f64" />
        </View>
        <View>
          <Text>Setting</Text>
        </View>
      </View>

      <View
        style={{
          padding: 15,
          marginBottom: 10,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            marginRight: 12,
          }}
        >
          <MaterialIcons name="privacy-tip" size={24} color="#d70f64" />
        </View>
        <View>
          <Text>Terms & Conditions / Privacy</Text>
        </View>
      </View>

      <View
        style={{
          padding: 15,
          marginBottom: 10,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            marginRight: 12,
          }}
        >
          <SimpleLineIcons name="logout" size={24} color="#d70f64" />
        </View>
        <View>
          <TouchableOpacity onPress={logOut}>
            <Text>Log out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CustomDrawer;
