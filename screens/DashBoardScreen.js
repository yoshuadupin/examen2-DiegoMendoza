import React, { Component } from "react";
import { View, Text, StyleSheet, Button, FlatList } from "react-native";
import * as firebase from "firebase";
import Post from "../components/Post";
import { Container, Header, Content } from 'native-base';
class DashBoardScreen extends Component {
  constructor(props) {
    super(props);
  }
  
  state = {
    posts: [],
    //user: Object.assign(firebaseAuth().currentUser),
    visibility: "PUBLIC",
    public: true,
    private: false,
    follower: false,
    userFav: [],
    userFollower:[]
  };
  
  componentWillMount() {
   // this.loadFavPost();
   // this.loadFavPost();
    this.loadDashboard();
    console.log(this.state.posts)
  }

  loadDashboard() {
    const tpost = [];
    firebase
      .database()
      .ref("posts")
      .orderByChild("visibility")
      .on("child_added", snapshot => {
        if (snapshot.val().visibility == "PUBLIC") {
          tpost.push(snapshot.val());
        console.log(snapshot.val())
        }
        this.setState( ({
          //posts: this.state.posts.concat(snapshot.val())
          posts: tpost
        }));
      });
    
    
  }
/*
  loadFavPost() {
    let tfavs = [];
    firebase
      .database()
      .ref("users")
      .child(this.state.user.uid)
      .child("favs")
      .on("value", snapshot => {
        //TODO FOR EACH FAVORITOS Y EVALUAR Y MARCARLOS
        snapshot.forEach(data => {
          tfavs.push(data.val().idPost);
        });

        this.setState(state => ({
          //posts: this.state.posts.concat(snapshot.val())
          userFav: tfavs
        }));
      });
  }
  */
  render() {
    return (
      <Container>
      <Header title ="Goatter Mobile"></Header>
         <FlatList
          data={this.state.posts.reverse()}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) =>  <Post
                  //favs={this.state.userFav.includes(item.id)}
                  //comments={item.comments}
                  countComment = {item.countComment}
                  title={item.title}
                  content={item.content}
                  contFav={item.contFav}
                  displayname={item.displayname}
                  photoUrl={item.photoUrl}
                  id={item.id}
                  uid={item.uid}
                  //public={this.isPublic(item.visibility)}
                  //private={this.isPrivate(item.visibility)}
                  //follower={this.isFollower(item.visibility)}
                  //follow={this.state.userFollower.includes(item.uid)}

                />}
        />
      </Container>
    );
  }
}

export default DashBoardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
