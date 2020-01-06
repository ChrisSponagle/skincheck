import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions, Alert, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import createFormData from './CreateFormData';
const SCREEN_HEIGHT = Dimensions.get('window').height

export default class HomePage extends React.Component {
  
    state= {
        photo: '',
        result: '',
        stepFont: '',
        descriptionFont: ''
    }
   
    componentWillMount() {
        if (SCREEN_HEIGHT === 640 || SCREEN_HEIGHT < 640) {
             this.setState({stepFont: styles.smallStepFont, descriptionFont: styles.smallDescriptionFont, })
        }
        else {
            this.setState({stepFont: styles.largeStepFont, descriptionFont: styles.largeDescriptionFont, })
        }
    }

    componentDidMount() {
        this.getPermissionAsync()
    }

    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
          const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
          if (status !== 'granted') {
            alert('Sorry, we need camera permissions to make this work!');
          }
        }
      }
    
    choosePhoto = async () => { 
          let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: false,
        });
        if (!result.cancelled) {  
            const resizedPhoto = await ImageManipulator.manipulateAsync( result.uri, [{ resize: { width: 300, height: 75 } }], // resize to width of 300 and preserve aspect ratio 
            { compress: 0.7, format: 'jpeg' }, );
            this.setState({photo: resizedPhoto});
            
              const formData = new FormData()
                 formData.append('photo', {
                    uri: this.state.photo,
                                //   Platform.OS === "android" ? this.state.photo.uri : this.state.photo.uri.replace("file://", ""),
                           
                        type: 'image/jpg', 
                        name: 'photo',
                    });
                const rawResponse = await fetch('http://skin-check-server.herokuapp.com/upload', {
                    method: 'POST',
                     credentials: 'include',
                     headers: {
                      Accept: 'application/json',
                      ContentType: 'multipart/form-data'
                     },
                     body: formData
                 })

                 const content = await rawResponse.json();
                 Alert.alert(content)
                 if (content.result) {
                    let result = content.result
                    if(result === true) {
                        this.props.navigation.navigate('Results', {cancerDetected: false})
                    }
                    else {
                        this.props.navigation.navigate('Results', {cancerDetected: true})
                    }
                 }

                else Alert.alert("ERROR")
        }
    }
        
           
            
        
        
    

        //      choosePhoto = async () => { 
        //         let result = await ImagePicker.launchImageLibraryAsync({
        //         mediaTypes: ImagePicker.MediaTypeOptions.Images,
        //         allowsEditing: false,
        //       });
        //       if (!result.cancelled) {  
        //           this.setState({photo: result});
        //           const data = new FormData();
        //           Alert.alert(this.state.photo.uri)
        //           data.append("photo", {
        //           name: this.state.photo.fileName,
        //           type: this.state.photo.type,
        //           uri: this.state.photo.uri
        //               // Platform.OS === "android" ? this.state.photo.uri : this.state.photo.uri.replace("file://", "")
        //           });
              
        //           // Object.keys(body).forEach(key => {
        //           // data.append(key, body[key]);
        //           // });
                  
        //           // fetch("http://skin-check-server.herokuapp.com/api/upload", {
        //       fetch("http://localhost:3000/upload", {
        //         method: "POST",
        //         body: data
        //       })
        //         .then(response => response.json())
        //         .then(response => {
        //           Alert.alert("upload succes", response);
        //           alert("Upload success!");
        //           this.setState({ photo: null });
        //         })
        //         .catch(error => {
        //           // console.log("upload error", error);
        //           alert("Upload failed!", error);
        //         });
        //           // (async () => {
        //           //     const data = new FormData();
        //           //     data.append('name', 'avatar');
        //           //     data.append('fileData', {
        //           //      uri : this.state.image.uri,
        //           //      type: this.state.image.type,
        //           //      name: this.state.image.fileName
        //           //     });
        //           //     const config = {
        //           //      method: 'POST',
        //           //      headers: {
        //           //       'Accept': 'application/json',
        //           //       'Content-Type': 'multipart/form-data',
        //           //      },
        //           //      body: data,
        //           //     };
        //           //    fetch("http://localhost:3000/" + "upload", config)
        //           //     .then((checkStatusAndGetJSONResponse)=>{       
        //           //       Alert.alert(checkStatusAndGetJSONResponse);
        //           //     }).catch((err)=>{console.log(err)});
        //           //    }
        //           // )
        //       }
        //   }
    



            //      const formData = new FormData()
            //      formData.append('name', 'avatar');
            //      formData.append('fileData', {
            //             uri : this.state.image.uri,
            //             type: this.state.image.type,
            //             name: this.state.image.fileName
            //         });
            //     const rawResponse = await fetch('http://skin-check-server.herokuapp.com/upload/', {
            //         method: 'POST',
            //          credentials: 'include',
            //          headers: {
            //           Accept: 'application/json',
            //           ContentType: 'multipart/form-data'
            //          },
            //          body: formData
            //      })

            //      const content = await rawResponse.json();
            //      Alert.alert(content)
            //      if (content.result) {
            //         let result = content.result
            //         if(result === true) {
            //             this.props.navigation.navigate('Results', {cancerDetected: false})
            //         }
            //         else {
            //             this.props.navigation.navigate('Results', {cancerDetected: true})
            //         }
            //      }

            //      else Alert.alert("ERROR")
            //  })()
            //      .catch(error=>Alert.alert(error.message))       
    


    render() {
        
        return (
          <View style={styles.container}>
              <View style={styles.topButtonContainer}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Terms')} style={styles.topButtons}>
                    <Text style={styles.buttonText}>Terms &amp; Conditions</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Contact')} style={styles.topButtons}>
                    <Text style={styles.buttonText}>Contact</Text>
                </TouchableOpacity>
              </View>
              <View>
                  <View style={styles.stepsContainer}>
                    <Text style={this.state.stepFont}>Step 1</Text>
                    <Text style={this.state.descriptionFont}>Take photo of mark</Text>
                    <Image style={styles.takePicture} source={require('../assets/takePicture.png')}/>
                  </View>
                  <View style={styles.stepsContainer}>
                    <Text style={this.state.stepFont}>Step 2</Text>
                    <Text style={this.state.descriptionFont}>Upload to our server</Text>
                    <Image style={styles.upload} source={require('../assets/upload.png')}/>
                  </View>
                  <View style={styles.stepsContainer}>
                    <Text style={this.state.stepFont}>Step 3</Text>
                    <Text style={this.state.descriptionFont}>Get result</Text>
                    <View style={styles.resultImagesContainer}>
                        <Image style={styles.resultImages} source={require('../assets/notDetected.png')}/>
                        <Image style={styles.resultImages} source={require('../assets/detected.png')}/>
                    </View>
                  </View>
              </View>
              <TouchableOpacity onPress={() => this.choosePhoto()} style={styles.mainButton}>
                <Text style={styles.mainButtonText}>Let's begin</Text>
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
    topButtonContainer:{
        marginTop: 50,
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'space-around'     
    },
    topButtons: {
        height: 40,
        width: 140,
        backgroundColor: '#5DD39E',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold'
    },
    stepsContainer: {
        alignSelf: 'stretch',
        alignItems: 'center',
        marginTop: SCREEN_HEIGHT*0.03,
    },
    largeStepFont: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#393E41',
        marginTop: 15
    },
    smallStepFont: {
        fontSize: SCREEN_HEIGHT*0.03,
        fontWeight: 'bold',
        color: '#393E41'
    },
    takePicture: {
        marginTop: 10
    },
    upload: {
        marginTop: 10
    },
    largeDescriptionFont: {
        fontSize: 20,
        color: '#393E41',
    },
    smallDescriptionFont: {
        fontSize: SCREEN_HEIGHT*0.025,
        color: '#393E41',
    },
    resultImagesContainer: {
        flexDirection: 'row',
        marginTop: 10
    },
    resultImages: {
        height: 60,
        width: 60,
        marginLeft: 5,
        marginRight: 5
    }
})