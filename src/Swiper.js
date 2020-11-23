import React from 'react';
import { StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { ListItem, Separator } from "./Listitem";
import AsyncStorage from '@react-native-community/async-storage';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default class Swiper extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dataList: quotes,
      pushedData: []
    }
  }
  componentDidMount() {
    AsyncStorage.setItem('deleted', JSON.stringify({ deleted: this.state.pushedData }));
  }
  handleLeft = (id) => {
    const newData = [...this.state.dataList]
    const Index = this.state.dataList.findIndex(item => item.id === id)
    const deleted = newData.splice(Index, 1)
    this.setState({ dataList: newData })
    this.state.pushedData.push(deleted[0])
    AsyncStorage.setItem('deleted', JSON.stringify({ deleted: this.state.pushedData }));
  }
  render() {
    const { dataList } = this.state
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={dataList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ListItem
              {...item}
              onSwipeFromLeft={() => alert("moved to left")}
              onRightPress={() => this.handleLeft(item.id)}
            />
          )}
          ItemSeparatorComponent={() => <Separator />}
        />
      </SafeAreaView>
    );
  }
}

const quotes = [
  { id: '0', text: 'It’s just a flesh wound.' },
  { id: '1', text: 'That is my least vulnerable spot.' },
  {
    id: '2',
    text: 'This building has to be at least…. three times bigger than this!',
  },
  { id: '3', text: 'I am serious. And don’t call me Shirley.' },
  { id: '4', text: 'Yeah, but I shoot with this hand.' },
  { id: '5', text: 'I’m just one stomach flu away from my goal weight.' },
  {
    id: '6',
    text:
      'I’m about to do to you what Limp Bizkit did to music in the late ’90s.',
  },
  {
    id: '7',
    text:
      'Martini. Gin, not vodka. Obviously.',
  },
  {
    id: '8',
    text:
      'Greater good?’ I am your wife! I’m the greatest good you’re ever gonna get!',
  },
  {
    id: '9',
    text:
      'I feel comfortable using legal jargon in everyday life.',
  },
  {
    id: '10',
    text:
      'We get the warhead and we hold the world ransom .',
  },
];