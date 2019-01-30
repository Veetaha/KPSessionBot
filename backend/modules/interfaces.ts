import * as Mongoose from 'mongoose';

export import ObjectId = Mongoose.Types.ObjectId;

export type Maybe<T>  = T | undefined | null;

export type Routine<T = void> = () => T;

export type AsyncRoutine<T = void> = () => Promise<T>;