import React, { Component } from "react";
import { View, StyleSheet , Image } from "react-native";
import * as firebase from "firebase"
import { Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';

class Post extends Component {
    constructor(props){
        super(props)
        this.state = {
            /*
            expanded: false,
            comments: {},
            writeComment: false,
            newComment: "",
            title: this.props.title,
            visibility: PUBLIC,
            content: this.props.content,
            username: this.props.username,
            contFav: this.props.contFav,
            countComment: this.props.countComment,
            addFav: this.props.favs,
            follow: this.props.follow*/
        }
    }

  render() {
    return (
     
        <Card style={{flex: 0}}>
          <CardItem>
            <Left>
              <Thumbnail source={{uri:'https://cdn1.iconfinder.com/data/icons/mix-color-4/502/Untitled-1-512.png' }} />
              <Body>
                <Text>{this.props.title}</Text>
                <Text note>{this.props.displayname}</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem>
            <Body>
              <Text>
                {this.props.content}
              </Text>
            </Body>
          </CardItem>
          <CardItem>
            <Left>
              <Button transparent textStyle={{color: '#87838B'}}>
                <Icon name="ios-heart" />
                <Text>{this.props.contFav}</Text>
              </Button>
              <Button transparent textStyle={{color: '#87838B'}}>
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
    alignItems: "center",
    
  }
});
