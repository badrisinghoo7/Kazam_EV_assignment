import { Request, Response } from 'express';
import redis from '../utils/redisClient';
import Task from '../models/task';
import dotenv from 'dotenv';

dotenv.config();

const redisKey = process.env.REDIS_KEY as string;

export const addTaskToRedis = async (task: string): Promise<void> => {
  const cached = await redis.get(redisKey);
  const tasks: string[] = cached ? JSON.parse(cached) : [];
console.log("this is working in redis controller")
  tasks.push(task);

  if (tasks.length > 50) {
    console.log('Too many tasks, now working in mongo db database...');
    await Task.insertMany(tasks.map((t) => ({ text: t, createdAt: new Date() })));
    await redis.del(redisKey);
  } else {
    await redis.set(redisKey, JSON.stringify(tasks));
  }
};

export const fetchAllTasks = async (): Promise<{ text: string; timestamp: string }[]> => {
  const redisTasksRaw = await redis.get(redisKey);

  const redisTasks = redisTasksRaw
    ? JSON.parse(redisTasksRaw).map((task: any) => {
        // If task is a stringified object, parse it
        if (typeof task === 'string') {
          try {
            const parsed = JSON.parse(task);
            return {
              text: parsed.text || parsed.task || task,
              timestamp: parsed.timestamp || new Date().toISOString(),
            };
          } catch (e) {
            return {
              text: task,
              timestamp: new Date().toISOString(),
            };
          }
        }

        // Already an object
        return {
          text: task.text || task.task || '',
          timestamp: task.timestamp || new Date().toISOString(),
        };
      })
    : [];

  const mongoTasks = await Task.find({}).sort({ createdAt: -1 });
  const mongoTaskObjects = mongoTasks.map((doc) => ({
    text: doc.text,
    timestamp: doc.createdAt.toISOString(),
  }));

  // Merge and sort
  const allTasks = [...redisTasks, ...mongoTaskObjects].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return allTasks;
};


export const fetchAllTasksHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const allTasks = await fetchAllTasks();
    res.status(200).json({ tasks: allTasks });
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

