import CronJob from 'cron';
import { nanoid } from 'nanoid'
import { generateUsername } from "unique-username-generator";

import { connect, findMany, findOne, insertOne, updateOne } from '../mongo/mongo';
import { User } from '../types/user';
import { POST_COLLECTION, USER_COLLECTION } from '../../config';
import { Post } from '../types/post';
let likeCount = 16
let commentCount = 15
let newUsers = 5
let newPosts = 1
let LT = 5
export async function registerUsers(db: any) {
    for (let i = 0; i < newUsers; i++) {
        let user: User = { user_id: nanoid(), username: generateUsername(), password: '$2b$11$qQrJ4kUfQq9bAR0s2n8pvuoN4jSHfun0dHQO2YBr7ogksPdNixW1a' }
        let insertResult = await insertOne(USER_COLLECTION, user, db);
        console.log('new user', user.username);

        await newPost(db, user)
        likePost(db, user)
        commentPost(db, user)
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
            let post_id = posts[i].post_id


            let updateResult = await updateOne(POST_COLLECTION, { post_id: post_id }, { $push: { comments: { comment_id: nanoid(), user_id: user!.user_id, content: nanoid(), comment_date: Date.now() } } }, db)
        }
    }
    // let insertResult = await insertOne(USER_COLLECTION, user);
}
async function newPost(db: any, user: User) {
    for (let i = 0; i < newPosts; i++) {
        let post: Post = { post_id: nanoid(), user_id: user!.user_id, content: 'hii', imageUrl: 'filename', likes: [], comments: [], post_date: Date.now() }
        let insertResult = await insertOne(POST_COLLECTION, post, db);
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
            let post_id = posts[i].post_id

            let updateResult = await updateOne(POST_COLLECTION, { post_id: post_id }, { $push: { likes: { like_id: nanoid(), user_id: user!.user_id, like_date: Date.now() } } }, db)
        }
    }
}