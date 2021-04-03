import React, { useEffect, useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View,TouchableOpacity,Platform, KeyboardAvoidingView, ScrollView,TextInput } from 'react-native'
import { Avatar, } from 'react-native-elements'
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Keyboard } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { auth, db } from '../firebase';
import firebase from 'firebase';
import { color } from 'react-native-reanimated';


const ChatScreen = ({ navigation, route }) => {

    const [ input, setInput ] = useState('');
    const [ messages, setMessages ] = useState([]);

    useLayoutEffect(()=>{
        navigation.setOptions({
            title:'Chats',
            headerTitleAlign:'left',
            headerBackTitleVisible:false,
            headerTitle: () => (
                <View style={{
                    flexDirection:'row',
                    alignItems: 'center',
                    marginLeft:-40
                }}>
                    <Avatar 
                        rounded
                        source={{uri : 'https://scontent-ams4-1.xx.fbcdn.net/v/t1.0-9/104284949_2976730655774234_3257675152783619879_o.jpg?_nc_cat=108&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=mhDgHFImQMwAX_x_XwI&_nc_ht=scontent-ams4-1.xx&oh=19a1dcd7659c7dcb2a543cb6a10c21e4&oe=606A681A'}}
                     />
                    <Text style={{color:'#fff',marginLeft:10,fontWeight:'700'}}>{route.params.chatName}</Text>
                </View>
            ),
            headerLeft: ()=>(
                <TouchableOpacity onPress={()=>navigation.goBack()} style={{marginLeft:2}}>
                    <AntDesign name='arrowleft' size={24} color='white'/>
                </TouchableOpacity>
            ),
            headerRight: ()=> (
                <View 
                    style={{
                        flexDirection: 'row',
                        justifyContent:'space-between',
                        width:70,
                        marginRight:20,
                        alignItems:'center'
                    }}>
                    <TouchableOpacity>
                        <FontAwesome name='video-camera' size={24} color='#fff'/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name='call' size={24} color='#fff'/>
                    </TouchableOpacity>
                </View>
            )
        })
    }, [navigation,messages]);


    const sendMessage = () =>{
        Keyboard.dismiss();
        db.collection('chats').doc(route.params.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            displayName: auth.currentUser.displayName,
            email : auth.currentUser.email,
            photoURL: auth.currentUser.photoURL
        })
        setInput('');
    };
    useLayoutEffect(()=>{
        const unsub = db
        .collection('chats')
        .doc(route.params.id)
        .collection('messages')
        .orderBy('timestamp','asc')
        .onSnapshot((snapshot)=>
            setMessages(snapshot.docs.map((doc) =>({
                id : doc.id,
                data: doc.data()
            }))
        ))
        return () => unsub();
    },[route])

    return (
      <SafeAreaView style={styles.container}>
          <StatusBar style='light'/>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.wrap}   keyboardVerticalOffset={90}>
                <>
                <ScrollView style={styles.content}>
                    {messages && messages.map(({id,data})=>(
                        data.email === auth.currentUser.email ? (
                            <View key={id} style={styles.sender}>
                                {/* <Avatar
                                    rounded
                                    position='absolute'
                                    bottom={-15}
                                    right={-5}
                                    size={30}
                                    source={{
                                        uri:data.photoURL
                                    }}
                                /> */}
                                <Text style={styles.Text}>{data.message}</Text>
                            </View>
                        ):(
                            <View style={styles.receiver} key={id}>
                                {/* <Avatar
                                    rounded
                                /> */}
                                <Text style={styles.Text}>{data.message}</Text>
                                <Text style={{color:'gray'}}>{data.displayName}</Text>
                            </View>
                        )
                    ))}
                </ScrollView>
                <View style={styles.footer}>
                    <TextInput
                        placeholder='type message...'
                        style={styles.textInput}
                        value={input}
                        onChangeText={text => setInput(text) }
                        onSubmitEditing={sendMessage}
                        
                    />
                    <TouchableOpacity onPress={sendMessage}>
                        <Ionicons name='send' size={24} color='#2b68e6'/>
                    </TouchableOpacity>
                </View>
                </>
        </KeyboardAvoidingView>
      </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container:{
        flex:1, 
        backgroundColor:'#fff'
    },
    wrap:{
        flex:1
    },
    footer:{
        flexDirection:'row',
        alignItems:'center',
        width:'100%',
        padding:15,
        justifyContent:'space-between'
    },
    textInput:{
        bottom:0,
        height:40,
        flex:1,
        marginRight:15,
        backgroundColor:'#ececec',
        padding:10,
        color:'grey',
        borderRadius:6,
    },
    receiver:{
        padding:15,
        backgroundColor:'#ececec',
        alignSelf:'flex-start',
        borderRadius:10,
        marginLeft:15,
        marginBottom:10,
        maxWidth:'80%',
        position:'relative'
    },
    sender:{
        padding:12,
        backgroundColor:'#c7f9cc',
        alignSelf:'flex-end',
        borderRadius:10,
        marginRight:15,
        maxWidth:'80%',
        marginBottom:10,
        position:'relative',
    },
    Text:{
        color:'#111',
        fontWeight:'500',
        marginRight:10,
    },
    senderName:{
        left:10,
        paddingRight:10,
        fontSize:10,
        color:'white'
    },
    content:{
        paddingTop:10
    },

})
