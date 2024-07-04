import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { MaterialIcons, FontAwesome, Entypo } from '@expo/vector-icons'; 
import { useAddDataMutation, useGetConservationQuery } from '../slice/GetApi';

const User = ({ route }) => {
  const { data } = route.params;
  const [post, setPost] = useState('');
  const [messages, setMessages] = useState([]);
  const [addData] = useAddDataMutation();
  const { data: conservationData, refetch } = useGetConservationQuery();

  const senderId = '667976aa29428f5d4f02f79d';
  const receiverId = "667976aa29428f5d4f02f79c"

  useEffect(() => {
    if (conservationData) {
      setMessages(conservationData.data);
    }
  }, [conservationData]);

  const add = async () => {
    await addData({
      "senderId": senderId,
      "receiverId": receiverId,
      "message": post,
    });
    setPost(''); 
    refetch();
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.one}>
          <Image source={require('../images/1.png')} style={styles.image} />
          <Text style={styles.name}>{data.username}</Text>
        </View>

        <View style={styles.iconsContainer}>
          <TouchableOpacity style={styles.icon}>
            <MaterialIcons name="call" size={24} color="white" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.icon}>
            <FontAwesome name="video-camera" size={24} color="white" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.icon}>
            <Entypo name="dots-three-vertical" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={messages}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <View style={[styles.messageContainer, item.sender._id === senderId ? styles.rightMessage : styles.leftMessage || item.receiver._id === receiverId ? styles.leftMessage : styles.rightMessage]}>
            <Text style={[styles.messageText, item.sender._id !== senderId && styles.leftMessageText]}>{item.text}</Text>
            <Text style={styles.timeText}>{new Date(item.createdAt).toLocaleTimeString()}</Text>
          </View>
        )}
      />

      <View style={styles.bottom}>
        <TextInput
          style={styles.input}
          placeholder='Enter a message...'
          value={post}
          onChangeText={setPost}
        />
        <TouchableOpacity style={styles.arrow} onPress={add}>
          <MaterialIcons name="forward" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default User;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#075E54',
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 3,
    borderBottomColor: 'gray',
    height: 70,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  one: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginTop: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 20,
    marginLeft: 10,
  },
  iconsContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  icon: {
    marginHorizontal: 10,
  },
  messageContainer: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  messageText: {
    fontSize: 16,
    color: 'white',
  },
  leftMessageText: {
    color: 'black',
  },
  timeText: {
    fontSize: 12,
    color: 'lightgrey',
    marginTop: 5,
  },
  rightMessage: {
    alignSelf: 'flex-end',
    backgroundColor: 'green',
  },
  leftMessage: {
    alignSelf: 'flex-start',
    backgroundColor: 'white',
  },
  bottom: {
    display: "flex",
    flexDirection: "row",
  },
  input: {
    backgroundColor: "white",
    width: 340,
    color: "black",
    height: 40,
    margin: 9,
    borderRadius: 20,
    paddingLeft: 15,
  },
  arrow: {
    marginTop: 20,
  },
});
