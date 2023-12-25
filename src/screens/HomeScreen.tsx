import {Button, FlatList, StyleSheet, Text, View} from 'react-native';

import React, {useEffect} from 'react';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useVehicleListAll} from '../graphql/logic/useVehicleListAll';
import {RootStackParamList, Route} from '../navigators/typeScreen';

export const HomeScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, Route.Home>) => {
  useEffect(() => {}, []);
  const {loading, error, data} = useVehicleListAll();
  //to do
  console.log('data', data?.vehicleList, error, loading);

  return (
    <View style={styles.container}>
      {error ? (
        <Text>Something went wrong</Text>
      ) : (
        <FlatList
          data={data?.vehicleList}
          renderItem={({item}) => {
            return (
              <Text>
                {item?.naming?.make} {item?.naming?.model}
              </Text>
            );
          }}
        />
      )}
      <Button
        title="Details"
        onPress={() => navigation.navigate(Route.Details)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
});
