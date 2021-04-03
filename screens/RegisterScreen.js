import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet,View, KeyboardAvoidingView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Button, Input,Text } from 'react-native-elements';
import { auth } from '../firebase';


const RegisterScreen = ({navigation}) => {
    
    const [name, setName ] = useState('');
    const [email, setEmail ] = useState('');
    const [password, setPassword ] = useState('');
    const [ imageUrl, setImageUrl ] = useState('');

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerBackTitle : 'Login'
        })
    },[navigation])

    const register = () =>{
        auth.createUserWithEmailAndPassword( email, password )
        .then(authUser =>{
            authUser.user.updateProfile({
                displayName : name,
                photoURL: imageUrl || 'https://cdn4.iconfinder.com/data/icons/instagram-ui-twotone/48/Paul-18-512.png'
            })
        }).catch((err)=>{
            alert(err.message)
        })
    };

    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <StatusBar style='light'/>
            <Text h4 style={{marginBottom:20}}>Create a signal account </Text>

            <View style={styles.inputContainer}>
                <Input 
                    placeholder='Full name'
                    autoFocus
                    type='text'
                    value={name}
                    onChangeText={text => setName(text)}
                />
                 <Input 
                    placeholder='Email'
                    type='email'
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
                 <Input 
                    placeholder='Password'
                    type='password'
                    secureTextEntry
                    value={password}
                    onChangeText={text => setPassword(text)}
                />
                 <Input 
                    placeholder='Profile picture url (optional)'
                    type='text'
                    value={imageUrl}
                    onChangeText={text => setImageUrl(text)}
                    onSubmitEditing={register}
                />
            </View>
            <Button containerStyle={styles.button}  onPress={register} title='Register'/>
            <View style={{height:100}}></View>

        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'white',
    },
    button:{
        width:'100%',
        margin:2
    },
    inputContainer:{
        width:300,
    }

})
