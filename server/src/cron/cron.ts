
import CronJob from 'cron';
import { nanoid } from 'nanoid'
import { generateUsername } from "unique-username-generator";

import { connect, findMany, findOne, insertOne, updateOne } from '../mongo/mongo';
import { User } from '../types/user';
import { POST_COLLECTION, USER_COLLECTION } from '../../config';
import { Post } from '../types/post';
import { registerUsers } from './post';





let registerJob = new CronJob.CronJob(
    '*/15 * * * * *',
    register,
    null,
    true,
    'America/Los_Angeles'
);
async function register() {
    let db = await connect()
    await registerUsers(db)
}
registerJob.start()