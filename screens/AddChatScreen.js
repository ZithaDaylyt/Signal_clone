import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { db } from '../firebase';

const AddChatScreen = ({navigation}) => {

    const [ input, setInput ] = useState('');

    useLayoutEffect(()=>{
        navigation.setOptions({
            title: 'Add new chat',
            headerBackTitle: 'Chats'
        })
    },[navigation]);

    const createChat = async () => {
        if(!input.trim()){
            alert('enter valid chat name')
        }else{
            await db.collection('chats').add({
                chatName: input
            }).then(()=>{
                navigation.goBack();
            }).catch(err=> alert(err))
        }
     
    };

    return (
        <View style={styles.container}>
            <Input
                placeholder='enter chat name'
                value={input}
                onChangeText={ text => setInput(text) }
                onSubmitEditing={createChat}
                leftIcon={
                    <Icon 
                        name='wechat'
                        size={24}
                        color='black'
                        type='antdesign'
                    />
                }
                style={{outline:'none'}}
            />
            <Button disabled={!input} title='create new chat' onPress={createChat}/>
        </View>
    )
};

export default AddChatScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#c7dbe6',
        padding: 30,
        height: '100%'
    }
})
