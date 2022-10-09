import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import {  toLogin } from "../../Config/Firebase";
import {getAuth} from 'firebase/auth'


const Login = ({ navigation }) => {
  const [form, setForm] = useState({});
  const [newMessage, setNewMessage] = useState();
  const [loading, setLoading] = useState(false);
  const auth = getAuth();


  
  const input = (e, key) => {
    setForm({ ...form, [key]: e });
  };
  const Continue = () => {
    setNewMessage(form);
  };

  function goBack() {
    setNewMessage("");
    setForm("");
  }
  const loginForm = async () => {
    // const { email, password } = form

    setLoading(true);
    try {
      const r = await toLogin(form);
      // alert('login success')
      navigation.navigate("Home");
    } catch (e) {
      alert(e.form);
      setLoading(false);
    } finally {
      setLoading(fasle);
      alert("logged")
    }
  };
  return (
    <>
      {!newMessage ? (
        <View style={styles.container}>
          <View style={styles.email_icon}>
            <View>
              <Text>
                <MaterialIcons name="email" size={44} color="#d70f64" />
              </Text>
              <Text
                style={{
                  backgroundColor: "#d70f64",
                  width: 44,
                  borderRadius: 5,
                  textAlign: "center",
                }}
              >
                <Entypo name="star" size={10} color="#fff" />
                <Entypo name="star" size={10} color="#fff" />
                <Entypo name="star" size={10} color="#fff" />
                <Entypo name="star" size={10} color="#fff" />
              </Text>
            </View>
            <View>
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text
                  style={{
                    color: "#d70f64",
                    fontWeight: "bold",
                  }}
                >
                  Don't have account!
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.Texts}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 22,
              }}
            >
              What's your email?
            </Text>
            <Text
              style={{
                fontWeight: "300",
                marginTop: 10,
              }}
            >
              We'll check if you have an account
            </Text>
          </View>
          <View style={styles.input}>
            <TextInput
              style={styles.my_input}
              placeholder="Email"
              onChangeText={(e) => input(e, "email")}
            />
          </View>
          <View style={{ justifyContent: "flex-end", flex: 1 }}>
            <TouchableOpacity
              disabled={!form}
              onPress={Continue}
              style={{ alignItems: "center", marginBottom: 20 }}
            >
              <Text
                style={{
                  backgroundColor: "#d70f64",
                  width: 370,
                  textAlign: "center",
                  padding: 15,
                  borderRadius: 10,
                  fontWeight: "bold",
                  color: "#fff",
                }}
              >
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <>
          <View style={styles.container}>
            <View style={styles.input}>
              <View>
                <TouchableOpacity onPress={goBack}>
                  <AntDesign name="arrowleft" size={24} color="#d70f64" />
                </TouchableOpacity>
              </View>
              <View style={styles.email_icon1}>
                <Text style={{ alignItems: "center" }}>
                  <Ionicons
                    name="ios-shield-checkmark"
                    size={34}
                    color="#d70f64"
                  />
                </Text>
                <Text
                  style={{
                    backgroundColor: "#d70f64",
                    width: 40,
                    borderRadius: 5,
                    textAlign: "center",
                    position: "relative",
                    right: 4,
                  }}
                >
                  <Entypo name="star" size={10} color="#fff" />
                  <Entypo name="star" size={10} color="#fff" />
                  <Entypo name="star" size={10} color="#fff" />
                  <Entypo name="star" size={10} color="#fff" />
                </Text>
              </View>
              <View style={styles.Texts}>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 22,
                  }}
                >
                  Log in with your email
                </Text>
              </View>
              <Text
                style={{
                  paddingLeft: 15,
                  paddingTop: 10,
                  color: "#d70f64",
                  fontWeight: "bold",
                }}
              >
                Email :
              </Text>
              <TextInput
                style={styles.my_input1}
                placeholder="Email"
                value={newMessage.email}
                editable={false}
                // onChangeText={e => updateForm(e, 'email')}
              />

              <Text
                style={{
                  paddingLeft: 15,
                  marginTop: 30,
                  color: "#d70f64",
                  fontWeight: "bold",
                }}
              >
                Password :
              </Text>
              <TextInput
                style={styles.my_input1}
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={(e) => input(e, "password")}
              />
            </View>
            <View
              style={{ justifyContent: "flex-end", flex: 1, marginBottom: 20 }}
            >
              {loading ? (
                <ActivityIndicator size="50%" color="#d70f64" />
              ) : (
                <TouchableOpacity
                  onPress={loginForm}
                  style={{
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      backgroundColor: "#d70f64",
                      width: 370,
                      textAlign: "center",
                      padding: 15,
                      borderRadius: 10,
                      fontWeight: "bold",
                      color: "#fff",
                    }}
                  >
                    Continue
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  email_icon: {
    padding: 15,
    justifyContent: "space-between",
    flexDirection: "row",
    // backgroundColor: '#e5e4e2',
    // width: 100,
    // borderRadius: 50
  },
  email_icon1: {
    padding: 15,
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  Texts: {
    padding: 15,
  },
  input: {
    padding: 15,
  },
  my_input: {
    borderWidth: 1,
    borderColor: "lightgray",
    padding: 10,
    borderRadius: 10,
  },
  my_input1: {
    borderWidth: 1,
    borderColor: "lightgray",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
});
export default Login;
