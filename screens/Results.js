import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
const SCREEN_HEIGHT = Dimensions.get('window').height

export default class Results extends React.Component {
  state= {
    notdetected: true,
    detected: false,
  }

  componentWillMount() {
    if(this.props.navigation.state.params.cancerDetected === false) {
      this.setState({
        notdetected: true,
        detected: false
      })
    }
    else {
      this.setState({
        notdetected: false,
        detected: true
      })
    }
  }
   
    render() {
        return (
          <View style={styles.container}>
              <View style={styles.header}>
                <Text style={styles.headerFont}>Results</Text>
              </View>
              {this.state.notdetected && <View style={styles.resultView}>
                <Image style={styles.resultImage} source={require('../assets/notDetected.png')}/>
                <Text style={styles.notdetectedFont}>No cancer</Text>
                <Text style={styles.notdetectedFont}>detected</Text>
              </View>}
              {this.state.detected && <View style={styles.resultView}>
                <Image style={styles.resultImage} source={require('../assets/detected.png')}/>
                <Text style={styles.detectedFont}>Possible cancer</Text>
                <Text style={styles.detectedFont}>detected</Text>
                <View style={styles.paragraph}>
                  <Text style={styles.smallerFont}>Please consult a doctor</Text>
                  <Text style={styles.smallerFont}>for further confirmation.</Text>
                </View>
              </View>}
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')} style={styles.mainButton}>
                <Text style={styles.mainButtonText}>OK</Text>
              </TouchableOpacity>
          </View>
        );
      }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
    },
    header: { 
      marginTop: SCREEN_HEIGHT*0.1,
      alignSelf: 'stretch',
      alignItems: 'center',
      justifyContent: 'center'
    },
    headerFont: {
      fontSize: 45,
      color: '#393E41',
    },
    resultView: {
      marginTop: 30,
      alignSelf: 'stretch',
      alignItems: 'center',
      justifyContent: 'center'
    },
    resultImage: {
      width: 80,
      height: 80,
      marginTop: 20,
      marginBottom: 30
    },
    notdetectedFont :{
      fontSize: 45,
      color: '#006A3A',
    },
    detectedFont: {
      fontSize: 45,
      color: '#CB0000',
    },
    paragraph: {
      marginTop: 40,
      alignSelf: 'stretch',
      alignItems: 'center'
    },
    smallerFont: {
      fontSize: 25,
      color: '#393E41'
    },
    mainButton: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: 20,
        height: 50,
        width: 250,
        backgroundColor: '#5DD39E',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    mainButtonText: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: 'bold'
    }
})