import React from 'react';
import {View, Text} from 'react-native';

const styles = {
    container: {
        width: '100%',
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0d5951',
        paddingHorizontal: 24,
        paddingVertical: 32,
    },
    text: {
        color: 'black',
        fontSize: 24,
        textAlign: 'center',
        color: 'white'
    }
}

const DefaultHeader = () => (
    <View style={styles.container}>
        <Text style={styles.text}>
            REACT NATIVE COLLAPSIBLE TABS
        </Text>
    </View>
);

export default DefaultHeader;
