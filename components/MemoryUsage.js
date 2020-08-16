import React, { Component } from 'react';
import { Platform, StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { getMaxMemory, getTotalMemory, getUsedMemory } from 'react-native-device-info';
import { MemoryUsage } from '..';

export default class MemoryUsage extends Component {

    constructor() {
      super();
      this.state = {
        memoryUage: 0
      };
    }
    componentDidMount() {
      const total = DeviceInfo.getTotalMemory();
      const used = DeviceInfo.getUsedMemory();
      const usage = used / total * 100
  
      this.setState({memoryUage : usage});
    }
    render() {
      return (
        <Text style={styles.text}>Memory Usage: {usage}% </Text>
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