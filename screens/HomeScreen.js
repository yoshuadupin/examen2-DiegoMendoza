import React, { Component } from "react";
import { View, StyleSheet , Image } from "react-native";
import * as firebase from "firebase"
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';

class HomeScreen extends Component {
  render() {
    return (
      <Container>
      <Header />
      <Content>
        <Card style={{flex: 0}}>
          <CardItem>
            <Left>
              <Thumbnail source={{uri: 'data:image/jpeg;base64,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'}} />
              <Body>
                <Text>NativeBase</Text>
                <Text note>April 15, 2016</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem>
            <Body>
              <Image source={{uri: 'data:image/jpeg;base64,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'}} style={{height: 200, width: 200, flex: 1}}/>
              <Text>
                //Your text here
              </Text>
            </Body>
          </CardItem>
          <CardItem>
            <Left>
              <Button transparent textStyle={{color: '#87838B'}}>
                <Icon name="logo-github" />
                <Text>1,926 stars</Text>
              </Button>
            </Left>
          </CardItem>
        </Card>
      </Content>
    </Container>
    );
  }
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
