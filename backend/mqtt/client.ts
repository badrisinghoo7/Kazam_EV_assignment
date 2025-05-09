import mqtt from 'mqtt';
import { addTaskToRedis } from '../controllers/taskController';

const client = mqtt.connect('mqtt://broker.hivemq.com'); // Replace with your broker if needed

client.on('connect', () => {
  console.log('MQTT connected');
  client.subscribe('/add', (err) => {
    if (!err) console.log('Subscribed to /add');
  });
});

client.on('message', async (topic, message) => {
  if (topic === '/add') {
    const task = message.toString();
    await addTaskToRedis(task);
  }
});
