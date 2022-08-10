/** @format */

import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { NewPost } from "../components/new-post";
import { Post } from "../components/post/post";
import Layout from "../sections/Layout";

import moment from "moment";
import { ProgramContextInterface, UseProgramContext } from "../contexts/programContextProvider";

interface PostType {
 username: string;
 publickeyString: string;
 content: string;
 block: string;
 date: string;
}

export default function Home() {
 const programContext = UseProgramContext()!;

 const [posts, setPosts] = useState<PostType[]>([]);
 const [fetchedPosts, setFetchedPosts] = useState(false);
 useEffect(() => {
   if (!fetchedPosts) {
    fetchPosts();
    setFetchedPosts(true);
   }
 }, [programContext]);

 async function fetchPosts() {

 }

 function displayPosts() {
  return posts.map((p: any) => (
   // 2 pubkey man haya 1- bo user 2- bo post
   <Post
    commentCount={p.comments}
    key={p.publicKey}
    tip={18000000}
    content={p.content}
    username={p.username}
    date={p.timestamp}
    likes={p.likes}
    publickeyString={p.authorDisplay}
    block={p.block}
    postPubkey={p.publicKey}
   />
  ));
 }

 return (
  <>
   <Head>
    <title>Social Block</title>
    <link rel="icon" href="/favicon.ico" />
   </Head>
   <Layout active={2}>
    <main className="  bg-slate-900  w-1/3 flex justify-center flex-row">
     <div style={{ width: 733 }} className="flex mt-4 items-center flex-col space-y-2">
      <NewPost />
      {/* {displayPosts()} */}
      {posts.length < 7 && <div style={{ marginBottom: 999 }} className=""></div>}
     </div>
    </main>
   </Layout>
  </>
 );
}

