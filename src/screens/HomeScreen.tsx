import { Button, FlatList, StyleSheet, Text, View } from "react-native";

import React, { useEffect, useState } from "react";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useVehicleListAll } from "../graphql/logic/useVehicleListAll";
import { RootStackParamList, Route } from "../navigators/typeScreen";
import FastImage from "react-native-fast-image";

export const HomeScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, Route.Home>) => {
  const [page, setPage] = useState(0);
  useEffect(() => {}, []);
  const { loading, error, data, loadMore } = useVehicleListAll("", page);
  //to do

  return (
    <View style={styles.container}>
      {error ? (
        <Text>Something went wrong</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <View>
                <FastImage
                  style={{ width: 200, height: 200 }}
                  source={{
                    uri: item.media.image?.thumbnail_url,
                    priority: FastImage.priority.normal,
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                />
                <Text>
                  {item?.naming?.make} {item?.naming?.model}
                </Text>
              </View>
            );
          }}
          onEndReached={loadMore}
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
  container: { flex: 1, backgroundColor: "white" },
});
