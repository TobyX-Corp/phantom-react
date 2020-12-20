import React, {useState, useEffect} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import RnHardwareInfo from 'rn-hardware-info';

if(Platform.OS === 'ios'){ 
	console.log('The Platform is IOS');
}
// initialize
const MaxSize = 10;
const CpuWeight = 50;
const RamWeight = 50;
const Threshold = 47.5;
// total score calculation
//  CPU + RAM + Battery Temp + Network speed
let thresholdQ = [];
let counter = 0;
let off = false;
// average calculation
const Average = list => list.reduce((prev, curr) => prev + curr) / list.length;
// stdv calculation
function stdv([...data]) {
  let mean = Average(data),
    total = 0;
  for (let i = 0; i < data.length; i++) {
    total += (data[i] - mean) ** 2;
  }
  return Math.sqrt(total / data.length);
}
// timer
function Timer(data) {
  counter++;
  if (thresholdQ.length >= 60) {
    off = true;
  }
  if (counter >= 60) {
    off = false;
  }
  if (data < Threshold){
    thresholdQ = [];
  } else {
    thresholdQ.push(data);
  }
  return off;
}
// scaling calculation
function ScalingFactor(data, avg) {
  if (data <= avg) {
    return 1;
  } else if (data > avg && data <= avg * 1.05) {
    return 1.05;
  } else if (data > avg * 1.05 && data <= avg * 1.1) {
    return 1.1;
  } else if (data > avg * 1.1 && data <= avg * 1.2) {
    return 1.15;
  } else {
    return 1.2;
  }
}

function Normalization(queue) {
  let newQueue = [];
  let i;
  let max = Number.MIN_VALUE;
  let min = Number.MAX_VALUE;
  for (i = 0; i < queue.length; i++) {
    if (queue[i] > max) {
      max = queue[i];
    }
  }

  for (i = 0; i < queue.length; i++) {
    if (queue[i] < min) {
      min = queue[i];
    }
  }

  for (i = 0; i < queue.length; i++) {
    var norm = (queue[i] - min) / (max - min);
    newQueue.push(norm);
  }
  return {q: newQueue, max: max, min: min};
}

const cpuQueue = [];
let normedCpu;
let cpuAvg;
let normedNewCpuData;
let cpuScaling;
let cpuStdv;
let cpuScore;
let result

const ramQueue = [];
let normedRam;
let ramAvg;
let normedNewRamData;
let ramScaling;
let ramStdv;
let ramScore;

function ARAnalytic() {
  const [cpu_freq, setCpuFreq] = useState('0');
  const [ram_usg, setMemUsg] = useState('0');
  const [up_spd, setUpSpd] = useState('0');
  const [down_spd, setDownSpd] = useState('0');

  useEffect(() => {
    const interval = setInterval(() => {
      if (RnHardwareInfo != null) {
        RnHardwareInfo.getAppUsage((error, usage) => {
          if (error) {
            console.log(error);
          } else {
            console.log('get app usage');
            console.log(usage);
            if (cpuQueue.length >= MaxSize) {
              cpuStdv = stdv(cpuQueue);
              if (cpuStdv > 4) {
                normedCpu = Normalization(cpuQueue);
                cpuAvg = Average(normedCpu.q);
                normedNewCpuData = normedCpu.q[9];
                cpuScaling = ScalingFactor(normedNewCpuData, cpuAvg);
                cpuScore = normedNewCpuData * cpuScaling * CpuWeight;
              } else {
                cpuAvg = Average(cpuQueue);
                cpuScore = cpuAvg * 0.01 * CpuWeight;
                result = Timer(cpuScore);
              }
              // console.log('Regular data', cpuQueue);
              // console.log('Normalized data', normedCpu);
              // console.log('Average: ', cpuAvg);
              // console.log('Standard Deviation: ', cpuStdv);
              // console.log('New Data: ', cpuQueue[9]);
              // console.log('Current Normed Data: ', normedNewCpuData);
              // console.log('Current Scaling Factor: ', cpuScaling);
              // console.log('Current Score: ', cpuScore);
              console.log('off condition: ', result);
              console.log('counter: ', counter);
              console.log('Current threshold queue: ', thresholdQ);
              cpuQueue.shift();
              cpuQueue.push(usage.cpu_usage);
            } else {
              cpuQueue.push(usage.cpu_usage);
            }

            if (ramQueue.length >= MaxSize) {
              ramStdv = stdv(ramQueue);
              if (ramStdv > 4) {
                normedRam = Normalization(ramQueue);
                ramAvg = Average(normedRam.q);
                normedNewRamData = normedRam.q[9];
                ramScaling = ScalingFactor(normedNewRamData, ramAvg);
                ramScore = normedNewRamData * ramScaling * RamWeight;
              } else {
                ramAvg = Average(ramQueue);
                ramScore = ramAvg * 0.01 * RamWeight;
              }
              // console.log('Regular data', ramQueue);
              // console.log('Normalized data', normedRam);
              // console.log('Average: ', ramAvg);
              // console.log('Standard Deviation: ', ramStdv);
              // console.log('New Data: ', ramQueue[9]);
              // console.log('Current Normed Data: ', normedNewRamData);
              // console.log('Current Scaling Factor: ', ramScaling);
              // console.log('Current Score: ', ramScore);
              ramQueue.shift();
              ramQueue.push(usage.memory_usage);
            } else {
              ramQueue.push(usage.memory_usage);
            }
            // setCpuFreq(cpu_freq => [...cpu_freq, usage.cpu_usage]);
            setCpuFreq(cpuScore);
            setMemUsg(ramScore);
            setDownSpd(usage.download_speed);
            setUpSpd(usage.upload_speed);
            // setDownSpd(usage.download_speed);
            // setUpSpd(usage.upload_speed);
          }
        });
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [cpu_freq]);
  // const update_device_info = () => {
  // };

  return (
    <View style={styles.container}>
      <Text> CPU Score: {cpu_freq}</Text>
      <Text> RAM Usage: {ram_usg}% </Text>
      <Text> Download Speed: {down_spd} </Text>
      <Text> Upload Speed: {up_spd} </Text>
      {/* <TouchableOpacity onPress={update_device_info} style={styles.button}>
        <Text> Refresh </Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  button: {
    backgroundColor: '#4ba37b',
    width: 200,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 50,
    marginLeft: 50,
  },
});
module.exports =  ARAnalytic;
