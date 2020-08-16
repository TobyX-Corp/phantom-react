import React, { Component } from 'react';
import { Platform, StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { getMaxMemory, getTotalMemory, getUsedMemory } from 'react-native-device-info';

export default class MemoryUsage extends Component {

    constructor() {
      super();
      this.state = {
        memoryUsage: 0,
        memoryTotal: 0,
        memoryUsed: 0,
      };
    }
    componentDidMount() {
      const total = DeviceInfo.getTotalMemory();
      const used = DeviceInfo.getUsedMemory();
      const usage = used / total * 100
  
      this.setState({memoryUsage : usage, memoryTotal : total, memoryUsed : used});
    }
    render() {
      return (
        <View style={styles.MainContainer}>
          <Text style={styles.text}>Total Memory: {this.state.memoryUsage}% </Text>
          <Text style={styles.text}>Used Memory: {this.state.memoryUsage}% </Text>
          <Text style={styles.text}>Memory Usage: {this.state.memoryUsage}% </Text>
        </View>
      );
    }
  }
   
  const styles = StyleSheet.create({
    text: {
      fontSize: 8,
      color: '#606070',
      padding: 10,
    },
  });

module.exports = MemoryUsage;