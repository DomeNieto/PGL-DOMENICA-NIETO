import React from "react";

import { View, StyleSheet, Text } from "react-native";
import { colors } from "../../styles/Colors";


export type SkillProps = {
  body: string;
  darkMode: boolean;
};

const Skill = ({ body, darkMode }: SkillProps) => {
  return (
    <View>
      <Text
        style={[
          styles.bodyTextSkills,
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
  bodyTextSkills: {
    fontSize: 14,
    margin: 3,
    padding: 5,
    borderRadius: 5,
  },
});

export default Skill;
