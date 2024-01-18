import {
  Button,
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import React, { useEffect, useState } from "react";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useVehicleListAll } from "../graphql/logic/useVehicleListAll";
import { RootStackParamList, Route } from "../navigators/typeScreen";
import FastImage from "react-native-fast-image";
import { debounce } from "../utils/debounced";
const { width, height } = Dimensions.get("window");
export const HomeScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, Route.Home>) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {}, []);
  const { loading, error, data, loadMore, refetch } =
    useVehicleListAll(searchTerm);
  //to do
  const debouncedSearch = debounce(() => refetch(), 500);
  const handleSearch = (text: string) => {
    setSearchTerm(text);

    debouncedSearch(text);
  };

  return (
    <View style={styles.container}>
      {error ? (
        <Text>Something went wrong</Text>
      ) : (
        <View>
          <TextInput
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              margin: 20,
            }}
            onChangeText={handleSearch}
            value={searchTerm}
            placeholder="Search"
          />
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return (
                <Pressable
                  style={styles.rowItem}
                  onPress={() =>
                    navigation.navigate(Route.Details, { vehicleId: item.id })
                  }
                >
                  <Text style={styles.nameStyle}>
                    {item?.naming?.make} {item?.naming?.model}
                  </Text>
                  <FastImage
                    style={{ width: 200, height: 200 }}
                    source={{
                      uri: item.media.image?.thumbnail_url,
                      priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.contain}
                  />
                </Pressable>
              );
            }}
            onEndReached={loadMore}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  rowItem: {
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  nameStyle: { maxWidth: width - 210 },
});
