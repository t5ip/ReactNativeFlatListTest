import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  List,
} from 'react-native';

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      userdata: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
    };

    console.log("End of constructor!")
  }

  componentDidMount() {
    console.log("component did mount!")
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    const { page, seed } = this.state;
    const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
    this.setState({ loading: true });
    fetch(url)
      .then(res => res.json())
      .then(res => {
         this.setState({
          userdata: page === 1 ? res.results : [...this.state.userdata, ...res.results], 
          error: res.error || null,
          loading: false,
          refreshing: false
        });  
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  renderRow ({ item }) {
    return (
      <View style={styles.listItemContainer}>
        <Image
            style={{width: 50, height: 50}}
            source={{uri: item.picture.thumbnail}}
        />
        <Text style={styles.listText}>{item.email}</Text>
        <Text style={styles.listText}>{item.name.first} </Text>
      </View>
    )
  }

  render() {
      if (this.state.loading) {
        return (
          <View style={styles.loadingText}>
            <Text style={styles.helpLinkText}> "Loading..." </Text>
          </View>
        )
      }
      else
      {
        return ( 
          <View style={styles.listContainer}>
            <FlatList
              data={this.state.userdata}
              renderItem={this.renderRow}
              keyExtractor={(item) => item.email}
            />
          </View>
        )
      }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  loadingText: {
    fontSize: 32,
    marginTop: 50,
    color: '#2e78b7'
  },
  listContainer: {
    justifyContent: 'space-between'
  },
  listItemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  listText: {
    fontSize: 14,
    color: '#2e78b7'
  }
});
;