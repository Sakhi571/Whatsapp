import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Image } from 'react-native';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useGetDataQuery } from '../slice/GetApi';

const Home = () => {
  const navigation = useNavigation();
  const { data, isError, isLoading } = useGetDataQuery();
  console.log(data);

  if (isLoading) {
    console.log("Data is loading", isLoading);
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (isError) {
    console.log('This show an error', isError);
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>An error occurred. Please try again later.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>WhatsApp</Text>
        <View style={styles.icons}>
          <TouchableOpacity>
            <Entypo name="camera" size={24} color="white" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Entypo name="dots-three-vertical" size={24} color="white" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={20} color="grey" style={styles.searchIcon} />
        <TextInput
          placeholder="Search or Enter Name"
          placeholderTextColor="grey"
          style={styles.searchInput}
        />
      </View>

      {data && data.data ? (
        <FlatList
          data={data.data}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('User', { data: item })}>
              <Image source={require('../images/1.png')} style={styles.image} />
              <View style={styles.textContainer}>
                <View>
                  <Text style={styles.name}>{item.username}</Text>
                  <Text style={styles.message}>{item.lastMessage}</Text>
                </View>
                <View style={styles.timeContainer}>
                  <Text style={styles.time}>{item.timestamp}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>No data available</Text>
        </View>
      )}
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#075E54',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#075E54',
  },
  title: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  icons: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
    margin: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: 'black',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingBottom: 25,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    color: 'darkgray',
    fontWeight: 'bold',
  },
  message: {
    fontSize: 14,
    color: 'white',
  },
  timeContainer: {
    marginLeft: 'auto',
  },
  time: {
    fontSize: 12,
    color: 'white',
  },
  loadingText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 18,
    color: 'white',
  },
});
