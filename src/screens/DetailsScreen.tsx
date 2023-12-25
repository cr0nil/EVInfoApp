import {StyleSheet, Text, View} from 'react-native';

import React from 'react';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList, Route} from '../navigators/typeScreen';
import {useApolloClient} from '@apollo/client';
import {GET_VEHICLE_LIST_ALL} from '../graphql/queries/getVehicleListAll';

export const DetailsScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, Route.Details>) => {
  const client = useApolloClient();
  const listVehicle = client.readQuery({query: GET_VEHICLE_LIST_ALL});
  console.log('data', listVehicle?.vehicleList);
  return (
    <View style={styles.container}>
      <Text>{listVehicle?.vehicleList[0]?.naming?.make}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
});
