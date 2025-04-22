import { Link } from "expo-router";
import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";

interface SavedCardProps {
  label: string;
  numberSaved: string;
  category: string;
}

export default function SavedCard({
  label,
  numberSaved,
  category,
}: SavedCardProps) {
  return (
    <Link
      style={styles.container}
      href={{
        pathname: "/Favorites/[category]",
        params: { category: category },
      }}
    >
      <View>
        <View style={styles.card}>
          <View style={styles.firstImg}>
            <Image
              source={require("../../assets/images/indoor.png")}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          <View style={styles.secondContianer}>
            <View style={styles.secondImge}>
              <Image
                source={require("../../assets/images/garden.png")}
                style={styles.image}
                resizeMode="contain"
              />
            </View>
            <View style={styles.thirdImge}>
              <Image
                source={require("../../assets/images/outdoor.png")}
                style={styles.image}
                resizeMode="contain"
              />
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.numberSaved}>{numberSaved} pins</Text>
        </View>
      </View>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "48%",
  },
  card: {
    display: "flex",
    flexDirection: "row",
    height: 190,
    borderWidth: 1,
    borderRadius: 16,
    backgroundColor: "#EEEEEE",
    borderColor: "#DCD4D4",
  },
  label: {
    fontSize: 18,
    fontWeight: "400",
    color: "#16570B",
  },
  numberSaved: {
    fontSize: 15,
  },
  firstImg: {
    borderTopLeftRadius: 16,
    width: "50%",
    height: "100%",
    borderEndWidth: 1,
    borderColor: "gray",
    justifyContent: "center",
    alignItems: "center",
  },
  secondContianer: {
    width: "50%",
    height: "100%",
    borderEndEndRadius: 16,
    borderTopEndRadius: 16,
  },
  secondImge: {
    width: "100%",
    height: "50%",
    borderTopEndRadius: 16,
    borderBottomWidth: 1,
  },
  thirdImge: {
    width: "100%",
    height: "50%",

    borderEndEndRadius: 16,
  },
  image: {
    width: "90%",
    height: "90%",
  },
});
