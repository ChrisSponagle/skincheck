import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomePage from './screens/HomePage';
import Results from './screens/Results';
import Terms from './screens/Terms';
import Contact from './screens/Contact';
import { AppLoading } from 'expo';
import Asset from 'expo-asset';
import images from './LocalImages';

console.disableYellowBox = true;
class HomePageScreen extends React.Component {
  render() {
    return (
      <HomePage navigation={this.props.navigation}/>
    );
  }  
}

class ResultsScreen extends React.Component {
  render() {
    return ( 
      <Results navigation={this.props.navigation}/>
    );
  }  
}

class TermsScreen extends React.Component {
  render() {
    return ( 
      <Terms navigation={this.props.navigation}/>
    );
  }  
}

class ContactScreen extends React.Component {
  render() {
    return ( 
      <Contact navigation={this.props.navigation}/>
    );
  }  
}

const RootStack = createStackNavigator(
  {
    Home: HomePageScreen,    
    Results: ResultsScreen,
    Terms: TermsScreen,
    Contact: ContactScreen,
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none'
  }
);

const AppStack = createAppContainer(RootStack);

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  }
  
    _loadResourcesAsync = async () => {
      return Promise.all([
        await Asset.loadAsync(images),
      ]);
    };
  
    _handleLoadingError = error => {
      console.warn(error);
    };
  
    _handleFinishLoading = () => {
      this.setState({ isLoadingComplete: true });
    };
  
   
  render() {
    if (!this.state.isLoadingComplete) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <AppStack/>
      );
    }
  }
}
