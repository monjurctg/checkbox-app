import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const SearchShadowBox = ({ headerText, data,onPress,loading }) => {

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{headerText}</Text>
        </View>
        <View style={styles.content}>
          {data.map((item, i) => (
            <TouchableOpacity onPress={()=>onPress(item)} key={i} style={styles.itemContainer}>
              <Image source={{ uri: item?.thumbnailImage??item?.icon_path }} style={styles.image} />
              <Text style={styles.itemText}>{item?.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  box: {
    backgroundColor: '#ffffff',
    // elevation: 5,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  header: {
    backgroundColor: 'gray',
    padding: 10,
    borderTopLeftRadius: 4,
  },
  headerText: {
    textAlign: 'right',
    color: '#fff',
  },
  content: {
    paddingLeft: 10,
    paddingTop:10
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    height: 40,
    width: 40,
  },
  itemText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'left',
    marginLeft: 10,
  },
});

export default SearchShadowBox;
