import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { register } from "../../Config/Firebase";

const Signup = ({ navigation }) => {
  const [form, setForm] = useState();
  const [loading, setLoading] = useState(false);

  const updateForm = (e, key) => {
    setForm({ ...form, [key]: e });
  };

  const createAccount = async () => {
    setLoading(true);

    try {
      const result = await register(form);
      // alert('REGISTER Successfully')
      navigation.navigate("Login");
    } catch (e) {
      alert(e.message);
      setLoading(false);
    } finally {
      setLoading(fasle);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.foodPanda}>
        <Image source={require("../../../assets/Images/kk.png")} />
      </View>
      <View style={styles.input_tags}>
        <Text style={styles.input_text}>Enter Your Name:</Text>
        <TextInput
          placeholder="Enter Your Name"
          style={styles.myInput}
          onChangeText={(e) => updateForm(e, "name")}
        />
      </View>
      <View style={styles.input_tags}>
        <Text style={styles.input_text}>Enter Your Email:</Text>
        <TextInput
          style={styles.myInput}
          placeholder="Enter Your Email"
          onChangeText={(e) => updateForm(e, "email")}
        />
      </View>
      <View style={styles.input_tags}>
        <Text style={styles.input_text}>Enter Your Password:</Text>
        <TextInput
          style={styles.myInput}
          placeholder="Enter Your Password"
          secureTextEntry={true}
          onChangeText={(e) => updateForm(e, "password")}
        />
      </View>
      <View style={styles.button_view}>
        <TouchableOpacity style={styles.button} onPress={createAccount}>
          <Text style={styles.button_text}>Register</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.button_view}>
        {loading ? (
          <ActivityIndicator size="50%" color="#d70f64" />
        ) : (
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text
              style={{
                color: "gray",
                marginTop: 15,
              }}
            >
              I have already account !
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  foodPanda: {
    marginBottom: 40,
    alignItems: "center",
  },
  input_tags: {
    marginBottom: 20,
  },
  myInput: {
    borderWidth: 1,
    borderColor: "#d70f64",
    padding: 10,
    borderRadius: 6,
  },
  input_text: {
    padding: 10,
    color: "#d70f64",
    fontWeight: "bold",
  },
  button_view: {
    alignItems: "center",
  },
  button: {},
  button_text: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#d70f64",
    borderWidth: 1,
    borderColor: "#d70f64",
    padding: 15,
    borderRadius: 6,
    width: 350,
  },
});

export default Signup;
