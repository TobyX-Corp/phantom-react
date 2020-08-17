import React, { Component } from 'react';
import { Platform, StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { getMaxMemory, getTotalMemory, getUsedMemory } from 'react-native-device-info';

export default class MemoryUsage extends Component {

  constructor(props) {
    super(props);
    DeviceInfo.getTotalMemory().then(totalMemory => {
      this.setState({totalMemory: totalMemory});
    }).catch(error => {
      console.log(error);
    });
    DeviceInfo.getUsedMemory().then(usedMemory => {
	    this.setState({usedMemory: usedMemory});
    }).catch(error => {
      console.log(error);
    });  
  }
  componentDidMount() {
    const usage = used / total * 100

    this.setState({memoryUsage : usage});
  }
  render() {
    return (
      <View style={styles.MainContainer}>
        <Text style={styles.text}>Total Memory: {this.state.totalMemory}% </Text>
        <Text style={styles.text}>Used Memory: {this.state.usedMemory}% </Text>
        <Text style={styles.text}>Memory Usage: {this.state.memoryUsage}% </Text>
      </View>
    );
  }
}
   
  const styles = StyleSheet.create({
    text: {
      fontSize: 12,
      color: '#606070',
      padding: 10,
    },
  });

module.exports = MemoryUsage;