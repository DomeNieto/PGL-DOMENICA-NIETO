import React from "react";

import { View, StyleSheet, Text } from "react-native";
import { colors } from "../../styles/Colors";


export type TechnologiesProps = {
  body: string;
  title: string;
  darkMode: boolean;
};

const Technology = ({ body, title, darkMode }: TechnologiesProps) => {
  return (
    <View>
      <Text
        style={[
          styles.bodyTitleTech,
          { color: darkMode ? colors.primaryLightColor : colors.textLightMode },
        ]}
      >
        {title}
      </Text>
      <Text
        style={[
          styles.bodyTextTech,
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
  bodyTextTech: {
    padding: 5,
    color: "black",
    textAlign: "justify",
    fontSize: 14,
    borderRadius: 5,
  },
  bodyTitleTech: {
    fontSize: 13,
    width: "100%",
    fontWeight: "300",
    margin: 2,
  },
});

export default Technology;
