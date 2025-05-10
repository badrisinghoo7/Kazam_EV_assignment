// import { io } from 'socket.io-client';
// import { api } from '../constants/api';

// const socket = io(api); // Adjust the URL if deployed elsewhere

// export const addTask = (taskContent: string) => {
//   socket.emit('add', taskContent); // Emit task add event to backend
// };

// export const listenForTasks = (callback: (taskContent: string) => void) => {
//   socket.on('add', callback); // Listen for new tasks from server
// };


import mqtt from 'mqtt';

const MQTT_BROKER_URL = 'ws://broker.hivemq.com:8000/mqtt';
const MQTT_TOPIC = '/add';

let client: mqtt.MqttClient | null = null;

const connectMQTT = () => {
  if (!client) {
    client = mqtt.connect(MQTT_BROKER_URL);
    
    client.on('connect', () => {
      console.log('Connected to MQTT broker');
    });
    
    client.on('error', (err) => {
      console.error('MQTT connection error:', err);
      client = null;
    });
  }
  
  return client;
};

export const publishTask = (task: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      const mqttClient = connectMQTT();
      
      // Create message payload
      const message = JSON.stringify({ task });
      
      // Publish message
      mqttClient.publish(MQTT_TOPIC, message, { qos: 1 }, (err) => {
        if (err) {
          console.error('Failed to publish task:', err);
          reject(err);
        } else {
          console.log('Task published successfully');
          resolve();
        }
      });
    } catch (error) {
      console.error('Error in publishTask:', error);
      reject(error);
    }
  });
};