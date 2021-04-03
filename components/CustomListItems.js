import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements';
import { db } from '../firebase';

const CustomListItems = ({id, chatName, enterChat}) => {

    const [ chatMessages, setChatMessages ] = useState([]); 
    useEffect(()=>{
        const unsub = db
            .collection('chats')
            .doc(id)
            .collection('messages')
            .orderBy('timestamp','desc')
            .onSnapshot(snapshot=>(
                setChatMessages(snapshot.docs.map(doc=>doc.data()))
            ))
        return ()=>unsub();
    },[])
    return (
        <ListItem key={id} bottomDivider onPress={()=>enterChat(id,chatName)}>
            <Avatar
                rounded
                source={{
                    uri:'https://www.pngitem.com/pimgs/m/504-5040528_empty-profile-picture-png-transparent-png.png'
                }}
            />
            <ListItem.Content >
                <ListItem.Title style={{fontWeight:'800'}}>
                    {chatName}
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail'>
                    { chatMessages?.[0]?.displayName } : {chatMessages?.[0]?.message}
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

export default CustomListItems

const styles = StyleSheet.create({})
