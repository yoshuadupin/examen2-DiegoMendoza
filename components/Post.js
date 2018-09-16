import React, { Component } from "react";
import { View, StyleSheet, Image } from "react-native";
import * as firebase from "firebase";
import {
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body
} from "native-base";


class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //      expanded: false,
      //    comments: {},
      //   writeComment: false,
      //  newComment: "",
      // title: this.props.title,
      //visibility: PUBLIC,
      //content: this.props.content,
      //username: this.props.username,
      contFav: this.props.contFav,
      //countComment: this.props.countComment,
      addFav: false
      //follow: this.props.follow
    };
    this.handleFavClick = this.handleFavClick.bind(this);
      console.log("CONTFAV")
    console.log(this.state.contFav)
  }

  handleFavClick = () => {
    this.updateFavPost();
    this.setState(state => ({
      addFav: !state.addFav,
      contFav: contFav
    }));
  };
  updateFavPost() {
    contFav = this.state.contFav;
    const uid = firebase.auth().currentUser.uid;

    if (!this.state.addFav) {
      
      firebase
        .database()
        .ref(`posts/${this.props.id}/favs/${uid}`)
        .set(true, function(error) {
          if (error) {
            console.log("No guardo");
          } else {
            console.log("Si guardo" + contFav);
          }
        })
        .then(
          firebase
            .database()
            .ref("users/" + uid + "/favs")
            .push()
            .set({ idPost: this.props.id })
        );

      contFav++;
    } else {
      
      firebase
        .database()
        .ref("posts")
        .child(this.props.id)
        .child("favs")
        .child(uid)
        .set(null, function(error) {
          if (error) {
            console.log("No guardo");
          } else {
            console.log("Si guardo" + contFav);
          }
        });
      let tempFavKey;
      firebase
        .database()
        .ref("users")
        .child(uid)
        .child("favs")
        .on("value", snapshot => {
          snapshot.forEach(data => {
            if (data.val().idPost == this.props.id) {
              tempFavKey = data.key;
              console.log(tempFavKey);
            }
          });
        });

      firebase
        .database()
        .ref("users/" + uid + "/favs/" + tempFavKey)
        .set(null);
        
      contFav--;
    }
  }

 
  render() {
    return (
      <Card style={{ flex: 0 }}>
        <CardItem>
          <Left>
            <Thumbnail
              source={{
                uri:
                  "https://cdn1.iconfinder.com/data/icons/mix-color-4/502/Untitled-1-512.png"
              }}
            />
            <Body>
              <Text>{this.props.title}</Text>
              <Text note>{this.props.displayname}</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem>
          <Body>
            <Text>{this.props.content}</Text>
          </Body>
        </CardItem>
        <CardItem>
          <Left>
            <Button onPress ={()=>this.handleFavClick()} transparent  textStyle={{ color: "#87838B" }}>
              <Icon name="ios-heart"  />
              <Text>{this.state.contFav}</Text>
            </Button>
            <Button transparent textStyle={{ color: "#87838B" }}>
              <Icon name="ios-chatboxes" />
              <Text>{this.props.countComment}</Text>
            </Button>
          </Left>
        </CardItem>
      </Card>
    );
  }
}

export default Post;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center"
  }
});
