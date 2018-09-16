import React, { Component } from "react";
import { View,  StyleSheet } from "react-native";
import Input from "../components/Input";
import { Button } from "../components/Button";
import * as firebase from "firebase";
import Firebase from '../libs/firebase';
import {Container} from 'native-base';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    Firebase.init()
    this.state = {
      email: "",
      password: "",
      authenticating: firebase.auth().currentUser? false:true,
      response: ""
    };
    this.signUp  = this.signUp.bind(this)
    this.login = this.login.bind(this)
  }

  async signUp() {
    console.log('entro sign in')
    console.log(this.state.email)
    console.log(this.state.password)
    console.log(firebase.auth().isSignInWithEmailLink)
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password);
        
      this.setState({
        response: "account created",
        authenticating:true
      });
      setTimeout(() => {
        this.props.navigation.navigate("Home");
      }, 1000);
    } catch (error) {
      this.setState({
        response: error.toString()
      });
    }
  }

  async login() {
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password);
      this.setState({
        response: "user login in",
        authenticating:true
      });
      setTimeout(() => {
        this.props.navigation.navigate("Home");
      }, timeout);
    } catch (error) {
      this.setState({
        response: error.toString()
      });
    }
  }
  async logout(){
    try{
      await firebase.auth().signOut()
      this.props.navigation.navigate('Home')
      this.setState({
        authenticating:false
      })
    }catch(error){
      console.log(error)
    }
  }
  onPressSignIn() {
    this.setState({
      authenticating: true
    });
  }
  renderCurrentState() {
    if (this.state.authenticating) {
      return (
        <View style={styles.form}>
          <Button onPress={() => this.logout()}>Log Out</Button>  
        </View>
      );
    }
    return (
      <View style={styles.form}>
        <Input
          placeholder="Enter your email..."
          label="Email"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />

        <Input
          placeholder="Enter your password..."
          label="Password"
          secureTextEntry
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button onPress={() => this.login()}>Login</Button>
        <Button onPress={() => this.signUp()}>Sign In</Button>
      </View>
    );
  }

  render() {
    return <Container style={styles.container}>{this.renderCurrentState()}</Container>;
  }
}

export default LoginScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  form: {
    flex: 1
  }
});
