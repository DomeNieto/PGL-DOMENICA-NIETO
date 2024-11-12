import React from "react";

import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../styles/Colors";


export type PorjectProps = {
  body: string;
  darkMode: boolean;
};

const Project = ({ body, darkMode }: PorjectProps) => {
  return (
    <View>
      <Text
        style={[
          styles.bodyTextProyects,
          {
            backgroundColor: darkMode ? colors.cardsDarkMode : colors.cardsLightMode,
            color: darkMode ? colors.primaryLightColor : colors.textLightMode,
          },
        ]}
      >
        {body}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bodyTextProyects: {
    textAlign: "justify",
    fontSize: 14,
    margin: 3,
    padding: 5,
    borderRadius: 5,
  },
});

export default Project;
