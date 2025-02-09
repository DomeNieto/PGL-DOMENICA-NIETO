import React, { useEffect } from 'react';
import { View } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';
import Animated, {
    useSharedValue,
    useAnimatedProps,
    useAnimatedStyle,
    withRepeat,
    withSequence,
    withTiming,
    Easing
} from 'react-native-reanimated';
import { colors } from '../../styles/Colors';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const Loader = () => {
    const circumference = 300;
    const radius = circumference / (2 * Math.PI);
    const strokeWidth = 5;
    const halfCircle = radius + strokeWidth;
    const diameter = 2 * halfCircle;


    const progress = useSharedValue(0);
    const rotation = useSharedValue(0);


    const animatedCircleProps = useAnimatedProps(() => ({
        strokeDashoffset: circumference * (1 - progress.value),
    }));



    const startAnimation = () => {

        progress.value = withSequence(
            withTiming(0.6, { duration: 1000 }),
            withRepeat(
                withSequence(
                    withTiming(0.7, { duration: 800 }),
                    withTiming(0.1, { duration: 800 })
                ),
                -1, true
            )
        );
        rotation.value = withRepeat(
            withTiming(360, { duration: 900, easing: Easing.linear }), -1, false
        )
    }


    const animatedViewStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotate: `${rotation.value}deg` }]
        }
    })

    useEffect(() => {
        startAnimation();
    }, []);

    return (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Animated.View style={animatedViewStyle}>
                <Svg width={diameter} height={diameter} viewBox={`0 0 ${diameter} ${diameter}`}>
                    <G origin={`${halfCircle}, ${halfCircle}`} rotation={"-90"}>
                        <AnimatedCircle
                            cx={"50%"}
                            cy={"50%"}
                            r={radius}
                            stroke={colors.bottomLightColor}
                            strokeWidth={strokeWidth}
                            fill={"transparent"}
                            strokeDasharray={circumference}
                            animatedProps={animatedCircleProps}
                        />
                    </G>
                </Svg>
            </Animated.View>
        </View>
    );
};

export default Loader;
