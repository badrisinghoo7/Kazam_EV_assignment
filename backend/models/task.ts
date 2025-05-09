import mongoose, { Schema, Document } from 'mongoose';

interface ITask extends Document {
  text: string;
}

const TaskSchema: Schema = new Schema({
  text: { type: String, required: true },
});

export default mongoose.model<ITask>('Task', TaskSchema, process.env.MONGO_COLLECTION);
