import React, { Component } from "react";
import { View, StyleSheet, Button, FlatList } from "react-native";
import * as firebase from "firebase";
import Post from "../components/Post";
import {
  Container,
  List,
  ListItem,
  Body,
  Header,
  Text,
  DeckSwiper,
} from "native-base";

class DashBoardScreen extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    posts: [],
    user: Object.assign(firebase.auth().currentUser),
    visibility: "PUBLIC",
    public: true,
    private: false,
    follower: false,
    userFav: [],
    userFollower: []
  };

  componentWillMount() {
    //this.loadFavPost();
    // this.loadFavPost();
    this.loadDashboard();
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
        }
        console.log(snapshot.val());
        this.setState({
          //posts: this.state.posts.concat(snapshot.val())
          posts: tpost
        });
      });
  }

  loadFavPost() {
    let tfavs = [];
    if (this.state.user != null) {
      console.log(this.state.user);
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
  }

  /*
 loadFollower() {
  let tfollow = [];

  firebase
    .database()
    .ref("users")
    .child(this.state.user.uid)
    .child("followers")
    .on("value", snapshot => {
      //TODO FOR EACH FAVORITOS Y EVALUAR Y MARCARLOS
      snapshot.forEach(data => {
        tfollow.push(data.val().uidFollow);
      });

      this.setState(state => ({
        //posts: this.state.posts.concat(snapshot.val())
        userFollower: tfollow
      }));
    });
}
*/
  render() {
    return (
      <Container>
        <Header title="Goatter Mobile" />
        <DeckSwiper
          dataSource={this.state.posts}
          //renderEmpty = {()=><View>
          //  <Text>No hay mas publicaciones</Text>
          //</View>}
          //keyExtractor={item => item.id}
          renderItem={item => (
            <View>
              <Post
                //favs={this.state.userFav.includes(item.id)}
                //comments={item.comments}
                countComment={item.countComment}
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
              />
              {item.comments ?<List
                dataArray={item.comments}
                renderRow={value => (
                  <ListItem>
                    <Body>
                      <Text>{value.comment}</Text>
                    </Body>
                  </ListItem>
                )}
              />:<View></View>}
            </View>
          )}
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
