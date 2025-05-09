import { Request, Response } from 'express';
import redis from '../utils/redisClient';
import Task from '../models/task';

const redisKey = process.env.REDIS_KEY as string;

export const addTaskToRedis = async (task: string): Promise<void> => {
  const cached = await redis.get(redisKey);
  const tasks: string[] = cached ? JSON.parse(cached) : [];

  tasks.push(task);

  if (tasks.length > 50) {
    await Task.insertMany(tasks.map((t) => ({ text: t })));
    await redis.del(redisKey);
  } else {
    await redis.set(redisKey, JSON.stringify(tasks));
  }
};

export const fetchAllTasks = async (): Promise<string[]> => {
  const redisTasksRaw = await redis.get(redisKey);
  const redisTasks: string[] = redisTasksRaw ? JSON.parse(redisTasksRaw) : [];

  const mongoTasks = await Task.find({});
  const mongoTaskTexts = mongoTasks.map((doc) => doc.text);

  return [...redisTasks, ...mongoTaskTexts];
};

export const fetchAllTasksHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const allTasks = await fetchAllTasks();
    res.status(200).json({ tasks: allTasks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
