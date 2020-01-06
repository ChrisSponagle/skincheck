import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
const SCREEN_HEIGHT = Dimensions.get('window').height

export default class Contact extends React.Component {
  
   
    render() {
      return (
        <View style={styles.container}>
          <View style={styles.header}>
              <Text style={styles.headerFont}>Contact</Text>
          </View>
          <View style={styles.paragraph}>
              <Text style={styles.smallerFont}>If you should have</Text>
              <Text style={styles.smallerFont}>questions or are</Text>
              <Text style={styles.smallerFont}>experiencing any errors</Text>
              <Text style={styles.smallerFont}>with my app, feel free to</Text>
              <Text style={styles.smallerFont}>contact me at</Text>
          </View>
          <View style={styles.email}>
            <Text style={styles.smallerFont}>chrissponagle@gmail.com</Text>
          </View>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')} style={styles.mainButton}>
            <Text style={styles.mainButtonText}>Back</Text>
          </TouchableOpacity>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5DD39E',
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
    color: '#FFF',
  },
  paragraph: {
    marginTop: 40,
    alignSelf: 'stretch',
    alignItems: 'center'
  },
  smallerFont: {
    fontSize: 25,
    color: '#FFF'
  },
  email: {
    marginTop: 40,
    alignSelf: 'stretch',
    alignItems: 'center'
  },
  mainButton: {
      position: 'absolute',
      alignSelf: 'center',
      bottom: 20,
      height: 50,
      width: 250,
      backgroundColor: '#FFF',
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center'
  },
  mainButtonText: {
      color: '#5DD39E',
      fontSize: 20,
      fontWeight: 'bold'
  }
})