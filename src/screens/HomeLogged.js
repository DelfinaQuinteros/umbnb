import React, { useContext, useEffect } from 'react';
import DetailsScreen from './DetailsScreen';
// import { Alert, Button, Dimensions, StyleSheet, Text, TextInput, View} from 'react-native';
import { SafeAreaView, View, StatusBar, Text,TextInput, FlatList, Dimensions, StyleSheet, Image, Pressable, ScrollView, Button, } from 'react-native';
import { AuthContext } from '../context/AuthContext';
// import { stylesApp } from '../theme/AppStyles';
import { hola } from '../../assets/proof';
import COLORS from '../components/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Fontisto } from "@expo/vector-icons";
import houses from '../components/houses';



const { width } = Dimensions.get('screen');

export default function HomeLogged( { navigation } ) {

  useEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Back"
    })
  }, [])

  const { token, user, logout } = useContext(AuthContext)

  const onLogout = () => {

    logout()

    navigation.navigate('LoginScreen')
  }

  const Card = ({house}) => {
    return (
      <Pressable
        activeOpacity={0.8}
        onPress={() => navigation.navigate('DetailsScreen', house)}>
        <View style={style.card}>
          {/* House image */}
          <Image source={house.image} style={style.cardImage} />
          <View style={{marginTop: 10}}>
            {/* Title and price container */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                {house.title}
              </Text>
              <Text
                style={{fontWeight: 'bold', color: COLORS.blue, fontSize: 16}}>
                ${house.price}/night
              </Text>
            </View>

            {/* Location text */}

            <Text style={{color: COLORS.grey, fontSize: 14, marginTop: 5}}>
              {house.address}
            </Text>

            {/* Facilities container */}
            <View style={{marginTop: 10, flexDirection: 'row'}}>
              <View style={style.facility}>
                <Fontisto name="room" size={18} />
                <Text style={style.facilityText}>4</Text>
              </View>
              <View style={style.facility}>
                <Fontisto name="male" size={18} />
                <Text style={style.facilityText}>8</Text>
              </View>

            </View>
          </View>
        </View>
      </Pressable>
    );
  };


  return (
<SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
      {/* Customise status bar */}
      <StatusBar
        translucent={false}
        backgroundColor={COLORS.white}
        barStyle="dark-content"
      />
      {/* Header container */}
      <View style={style.header}>
        <View style={{
            paddingVertical: 10,
            justifyContent: 'space-between',
            paddingHorizontal: 10,
          }}>
        <Button
          title="Logout"
          onPress={ onLogout }
          color="black"
        />
        </View>
        <Image
          style={style.profileImage}
          source={require('../../assets/person.jpeg')}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Input and sort button container */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
          }}>
          <View style={style.searchInputContainer}>
            <Fontisto name="search" color={COLORS.grey} size={25} />
            <TextInput placeholder="Search address, city, location" />
          </View>

          <View style={style.sortBtn}>
            <Fontisto name="filter" color={COLORS.white} size={25} />
          </View>
        </View>

        {/* Render Card */}
        <FlatList
          snapToInterval={width - 20}
          contentContainerStyle={{paddingLeft: 20, paddingVertical: 40}}
          data={houses}
          renderItem={({item}) => <Card house={item} />}
        />

      </ScrollView>
    </SafeAreaView>
  )

}

const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  profileImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  searchInputContainer: {
    height: 50,
    backgroundColor: COLORS.light,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  sortBtn: {
    backgroundColor: COLORS.dark,
    height: 50,
    width: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  optionsCard: {
    height: 210,
    width: width / 2 - 30,
    elevation: 15,
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 20,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  optionsCardImage: {
    height: 140,
    borderRadius: 10,
    width: '100%',
  },
  optionListsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  categoryListText: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingBottom: 5,
    color: COLORS.grey,
  },
  activeCategoryListText: {
    color: COLORS.dark,
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  categoryListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
    paddingHorizontal: 40,
  },
  card: {
    height: 250,
    backgroundColor: COLORS.white,
    elevation: 10,
    width: width - 40,
    marginRight: 20,
    padding: 15,
    borderRadius: 20,
  },
  cardImage: {
    width: '100%',
    height: 120,
    borderRadius: 15,
  },
  facility: {flexDirection: 'row', marginRight: 15},
  facilityText: {marginLeft: 5, color: COLORS.grey},
});

// const styles = stylesApp;