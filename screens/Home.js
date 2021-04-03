import React, { useEffect, useLayoutEffect, useState } from 'react'
import { StyleSheet, View, SafeAreaView, ScrollView, TouchableOpacity  } from 'react-native'
import { Avatar } from 'react-native-elements';
import CustomListItems from '../components/CustomListItems';
import { auth, db } from '../firebase';
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';

const Home = ({navigation}) => {

    const [ chats, setChats ] = useState([]);
    
    const signOutUser = () =>{
        auth.signOut().then(()=>{
            navigation.replace('Login');
        })
    };

    useEffect(()=>{
        const unsub = db.collection('chats').onSnapshot( snapshot =>(
            setChats(snapshot.docs.map(doc =>({
                id : doc.id,
                data: doc.data()
            })))
        ))
        return () => unsub();
    },[]);

    useLayoutEffect(()=>{
        navigation.setOptions({
            title: 'Signal',
            headerStyle: {
                backgroundColor: 'gray'
            },
            headerTitleStyle:{
                color: '#111'
            },
            headerTintColor: '#111',
            headerLeft: () =>(
                <View style={{marginLeft: 20}}>
                    <TouchableOpacity onPress={signOutUser}>
                    <Avatar 
                        rounded
                        source={{
                           uri : auth?.currentUser?.photoURL
                        }}
                    />
                    </TouchableOpacity>
                </View>
            ),
            headerRight : () =>(
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: 80,
                    marginRight: 20
                }}> 
                    <TouchableOpacity activeOpacity={.5}>
                        <AntDesign name='camerao' size={24} color='black'/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.navigate('AddChat')}>
                        <SimpleLineIcons name='pencil' size={24} color='black'/>
                    </TouchableOpacity>
                </View>
            ),
        })

    },[navigation]);
    
    const enterChat = (id, chatName) =>{
        navigation.navigate('Chat',{
            id,
            chatName
        })
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.container}>
                {chats.map(({id, data:{chatName}})=> (
                      <CustomListItems key={id} id={id} chatName={chatName} enterChat={enterChat}/>
                ))}
            </ScrollView>
        </SafeAreaView>
    )
};

export default Home

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'lightgray',
        height:'100%'
    }
});
