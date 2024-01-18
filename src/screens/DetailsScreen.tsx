import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import React from "react";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, Route } from "../navigators/typeScreen";
import { useApolloClient } from "@apollo/client";
import { GET_VEHICLE_LIST_ALL } from "../graphql/queries/getVehicleListAll";
import { useVehicleDetails } from "../graphql/logic/useVehicleDetails";
import FastImage from "react-native-fast-image";

export const DetailsScreen = ({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, Route.Details>) => {
  const { loading, error, data } = useVehicleDetails(route.params.vehicleId);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator />
      ) : error ? (
        <Text>Error</Text>
      ) : (
        <>
          <FastImage
            style={{ width: 200, height: 200, alignSelf: "center" }}
            source={{
              uri: data.vehicle?.media?.image?.url,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
          <Text style={styles.text}>
            {data.vehicle.naming?.make} - {data.vehicle.naming?.model}
          </Text>

          <Text>Battery: {data.vehicle.battery?.usable_kwh}kWh</Text>
          <Text>Top speed: {data.vehicle.performance?.top_speed}mph</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", padding: 10 },
  text: { fontSize: 20, fontWeight: "bold" },
});
