import { POINTS_PER_LIKE, POINTS_PER_COMMENT, POINTS_PER_POST } from './../../config';
import { Leaderboard } from './../types/leaderboard';
import CronJob from 'cron';
import { nanoid } from 'nanoid'
import { generateUsername } from "unique-username-generator";

import { connect, findMany, findOne, insertOne, updateOne } from '../mongo/mongo';
import { User } from '../types/user';
import { LEADERBOARD_COLLECTION, POST_COLLECTION, USER_COLLECTION } from '../../config';
import { Post } from '../types/post';
import { generateAndSaveImage } from './testt';
let likeCount = 0
let commentCount = 0
let newUsers = 5
let newPosts = 0
let LT = 5
type Image = Promise<{
    word: string;
    message: string;
    error: boolean;
    imageURL?: undefined;
} | {
    imageURL: string;
    word: string;
    message?: undefined;
    error?: undefined;
}>
export async function registerUsers(db: any) {
    for (let i = 0; i < newUsers; i++) {
        let data = await image()
        async function image(): Image {
            let data = await generateAndSaveImage()
            if (data.error) {
                return await image()
            }
            return data
        }
        let user: User = { imageUrl: data.imageURL, user_id: nanoid(), username: generateUsername(), password: '$2b$11$qQrJ4kUfQq9bAR0s2n8pvuoN4jSHfun0dHQO2YBr7ogksPdNixW1a' }
        let insertResult = await insertOne(USER_COLLECTION, user, db);

        let leaderboard: Leaderboard = { user_id: user.user_id, points: 0, captchaSolved: 0, posts: 0, comments: 0, likes: 0, commentsReceived: 0, likesReceived: 0 }
        insertResult = await insertOne(LEADERBOARD_COLLECTION, leaderboard, db);


        await newPost(db, user)
        await likePost(db, user)
        await commentPost(db, user)
    }
}
async function commentPost(db: any, user: User) {
    let posts: Post[] = await findMany(POST_COLLECTION, {
        $expr: {
            $lte: [
                {
                    $size: "$comments"
                },
                LT
            ]
        }
    }, db)

    if (posts.length > commentCount) {
        for (let i = 0; i < commentCount; i++) {
            let post = posts[i]


            let updateResult = await updateOne(POST_COLLECTION, { post_id: post.post_id }, { $push: { comments: { comment_id: nanoid(), user_id: user!.user_id, content: nanoid(), comment_date: Date.now() } } }, db)
            await updateOne(LEADERBOARD_COLLECTION, { user_id: user.user_id }, { $inc: { comments: 1, points: POINTS_PER_COMMENT } }, db)
            await updateOne(LEADERBOARD_COLLECTION, { user_id: post.user_id }, { $inc: { commentsReceived: 1, points: POINTS_PER_COMMENT } }, db)
        }
    }
}
async function newPost(db: any, user: User) {
    for (let i = 0; i < newPosts; i++) {
        let data = await generateAndSaveImage()
        console.log(data);
        let post: Post = { post_id: nanoid(), user_id: user!.user_id, content: data.word, imageUrl: data.imageURL, likes: [], comments: [], post_date: Date.now() }
        let insertResult = await insertOne(POST_COLLECTION, post, db);
        await updateOne(LEADERBOARD_COLLECTION, { user_id: user.user_id }, { $inc: { posts: 1, points: POINTS_PER_POST } }, db)
    }

}
async function likePost(db: any, user: User) {
    let posts: Post[] = await findMany(POST_COLLECTION, {
        $expr: {
            $lte: [
                {
                    $size: "$likes"
                },
                LT
            ]
        }
    }, db)
    if (posts.length > likeCount) {
        for (let i = 0; i < likeCount; i++) {
            let post = posts[i]

            let dateResult = await updateOne(POST_COLLECTION, { post_id: post.post_id }, { $push: { likes: { like_id: nanoid(), user_id: user!.user_id, like_date: Date.now() } } }, db)
            await updateOne(LEADERBOARD_COLLECTION, { user_id: user.user_id }, { $inc: { likes: 1, points: POINTS_PER_LIKE } }, db)

            let u2 = await updateOne(LEADERBOARD_COLLECTION, { user_id: post.user_id }, { $inc: { likesReceived: 1, points: POINTS_PER_LIKE } }, db)

        }
    }
}