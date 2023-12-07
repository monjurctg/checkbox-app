import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { round } from 'lodash';
import { scale } from '../../utils/funtions';
import { colors } from '../theme/colors';

const SummuryCard = ({ card }) => {
  const [isArray, setIsArray] = useState(false);

  useEffect(() => {
    if (Array.isArray(card)) {
      setIsArray(true);
    } else {
      setIsArray(false);
    }
  }, [card]);

  return (
    <View style={styles.container}>
      {isArray ? (
        <View style={styles.cardContainer2}>
          {card.map((item, index) => (
            <View style={styles.itemContainer} key={index}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.value}>{round(item.value)}</Text>
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.cardContainer}>
          <Text style={styles.title}>{card.title}</Text>
          <Text style={styles.value}>{round(card.value)}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: 'center',
    // padding: 20,
  },
  cardContainer2: {
    // width: '100%',
    width:scale(320),
    backgroundColor: '#DDD',
    marginTop:20,
    alignSelf:"center",
    // gap:20,

    padding: 16,
    borderRadius: 8,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
  },
  cardContainer: {
    // width: '100%',
    width:scale(155),
    backgroundColor: '#DDD',
    marginTop:20,
    // gap:20,

    padding: 16,
    borderRadius: 8,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    // width:300
  },
  title: {
    // color: 'gray',
    textAlign:"center"
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    // backgroundColor: 'red',
    alignItems:"center",
    // padding: 8,

    color: colors.primary_2,
    textAlign:"center",
    borderRadius: 6,
  },
});

export default SummuryCard;
