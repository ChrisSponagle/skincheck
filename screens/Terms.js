import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
const SCREEN_HEIGHT = Dimensions.get('window').height

export default class Terms extends React.Component {
  
   
    render() {
      return (
        <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.headerFont}>Terms &amp; Conditions</Text>
            </View>
            <View style={styles.paragraph}>
              <Text style={styles.smallerFont}>SkinCheck is not a licensed</Text>
              <Text style={styles.smallerFont}>medical provider nor does it</Text>
              <Text style={styles.smallerFont}>hold responsibility for any</Text>
              <Text style={styles.smallerFont}>misdiagnois. It is simply a tool</Text>
              <Text style={styles.smallerFont}>to assist people in scanning for</Text>
              <Text style={styles.smallerFont}>possible abnormalities in their</Text>
              <Text style={styles.smallerFont}>skin. For proper medical</Text>
              <Text style={styles.smallerFont}>scanning please visit your local</Text>
              <Text style={styles.smallerFont}>doctor. SkinCheck will not keep</Text>
              <Text style={styles.smallerFont}>any images sent to it for</Text>
              <Text style={styles.smallerFont}>scanning.</Text>

            </View>
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
    fontSize: 40,
    color: '#393E41',
  },
  paragraph: {
    marginTop: 40,
    alignSelf: 'stretch',
    alignItems: 'center'
  },
  smallerFont: {
    fontSize: 22,
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
  },
})