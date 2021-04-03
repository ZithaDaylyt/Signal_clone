import React, { useEffect, useState } from 'react';
import { View, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { Button, Input, Image } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { auth, db } from '../firebase';


const LoginScreen = ({ navigation }) => {

    const [ email, setEmail ] = useState('');
    const [ password, setPassword] = useState('');
   

    useEffect(()=>{
        const unsub = auth.onAuthStateChanged((authUser)=>{
            if(authUser){
                navigation.replace('Home');
            }
        });
        return () => unsub();
    })

    const SignIn = () =>{
        auth.signInWithEmailAndPassword( email, password)
        .catch(err =>{
            alert(err)
        })
    };

        return (
       
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                 <StatusBar style='light'/>
                    <Image 
                        source={{
                        uri:'https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png'
                        }}
                        style={{ width:200, height:150}}
                    />
                    <View style={styles.inputContainer}>
                        <Input 
                            placeholder='Email'
                            autoFocus
                            type='email'
                            value={email}
                            onChangeText={(text)=> setEmail(text)}
                        />
                        <Input 
                            placeholder='Password'
                            type='password'
                            secureTextEntry
                            value={password}
                            onChangeText={(text)=>setPassword(text)}
                            onSubmitEditing={SignIn}
                        />
                    </View>
                    <Button title='Login' containerStyle={styles.button} onPress={SignIn}/>
                    <Button 
                        title='Register' 
                        type='outline' 
                        containerStyle={styles.button} 
                        onPress={()=> navigation.navigate('Register')}
                    />
                    <View style={{height:100}}></View>
            </KeyboardAvoidingView>
           
        )
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent:'center',
      alignItems:'center',
      padding:4,
      width:'100%'
    },
    inputContainer:{
        width:300
    },
    button:{
        width:'100%',
        marginTop:5
    }
  });
  
