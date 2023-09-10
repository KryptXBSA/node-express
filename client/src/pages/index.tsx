/** @format */

import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { NewPost } from "../components/new-post";
import { Post } from "../components/post/post";
import Layout from "../sections/Layout";
import axios from "axios";
import {  UseProgramContext } from "../contexts/programContextProvider";
import { SERVER_URL } from "../../config";
import { Waypoint } from "react-waypoint";

type Post = {
 post_id: string;
 user_id: string;
 username: string;
 profileImageUrl: string;
 content?: string;
 imageUrl?: string;
 likes: { user_id: string; like_date: number }[];
 comments: { user_id: string; content: string; comment_date: number }[];
 post_date: number;
};

export default function Home() {
 const programContext = UseProgramContext()!;

 const [posts, setPosts] = useState<Post[]>([]);
 const [fetchedPosts, setFetchedPosts] = useState(false);
 useEffect(() => {
  if (!fetchedPosts) {
   fetchPosts();
   setFetchedPosts(true);
  }
 }, [programContext]);
 function addPost(post: any) {
  setPosts([post].concat(posts));
 }
 async function fetchMore() {
  try {
   const response = await axios.post(`${SERVER_URL}/public/get-posts?skip=${posts.length}`);
   response.data;
   
   setPosts(posts.concat(response.data));
  } catch (error) {
   console.error(error);
  }
 }
 async function fetchPosts() {
  try {
   const response = await axios.post(`${SERVER_URL}/public/get-posts?skip=0`);
   response.data;
   setPosts(response.data);
  } catch (error) {
   console.error(error);
  }
 }

 function displayPosts() {
  return posts.map((p) => (
   // 2 pubkey man haya 1- bo user 2- bo post
   <Post
    key={p.post_id}
    user_id={p.user_id}
    imageUrl={p.imageUrl}
    post_date={p.post_date}
    post_id={p.post_id}
    profileImageUrl={p.profileImageUrl}
    content={p.content}
    username={p.username}
    likes={p.likes}
    comments={p.comments}
   />
  ));
 }

 return (
  <>
   <Head>
    <title>Social Block</title>
    <link rel="icon" href="/favicon.ico" />
   </Head>
   <Layout active={0}>
    <main className="  bg-slate-900  w-1/3 flex justify-center flex-row">
     <div style={{ width: 733 }} className="flex mt-4 items-center flex-col space-y-2">
      <NewPost addPost={addPost} />
      {displayPosts()}
      <Waypoint onEnter={fetchMore} />
      <div style={{ marginBottom: 199 }} className=""></div>
      {posts.length < 7 && <div style={{ marginBottom: 999 }} className=""></div>}
     </div>
    </main>
   </Layout>
  </>
 );
}
