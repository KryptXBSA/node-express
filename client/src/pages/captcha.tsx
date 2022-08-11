/** @format */

import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { NewPost } from "../components/new-post";
import { Post } from "../components/post/post";
import Layout from "../sections/Layout";

import moment from "moment";
import { ProgramContextInterface, UseProgramContext } from "../contexts/programContextProvider";
import { IMAGE_SERVER_URL } from "../../config";

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

 async function fetchPosts() {}

 return (
  <>
   <Head>
    <title>Social Block</title>
    <link rel="icon" href="/favicon.ico" />
   </Head>
   <Layout active={2}>
    <main className="  bg-slate-900  w-1/3 flex justify-center flex-row">
     <div style={{ width: 733 }} className="flex mt-4 items-center flex-col space-y-2">
      <Captcha word="test" />
      <div style={{ marginBottom: 999 }} className=""></div>
     </div>
    </main>
   </Layout>
  </>
 );
}
interface Captcha {
 word: string;
}
function Captcha({ word }: Captcha) {
 const [showResult, setShowResult] = useState(false);
 const [result, setResult] = useState(true);
 function submit() {
  setShowResult(true);
 }
 function newCaptcha() {
  setShowResult(false);
 }
 if (showResult) {
  return (
   <>
    {result ? (
     <div className="font-bold text-3xl text-green-500">Correct +3 Points</div>
    ) : (
     <div className="font-bold text-3xl text-red-500">False </div>
    )}
    <button onClick={newCaptcha} className="btn  bg-sky-600 text-white w-32 ml-5  btn-square">
     New Captcha
    </button>
   </>
  );
 }
 return (
  <>
   <div className="text-lg font-semibold">
    Select the image that relates to:<span className="px-2 text-2xl">{word}</span>
   </div>
   <div className="flex space-x-2 ">
    <img
     onClick={submit}
     className="cursor-pointer w-80"
     src={`${IMAGE_SERVER_URL}/8NmHmaon0OKx4zGXG5E_R.png`}
    />
    <img
     onClick={submit}
     className="cursor-pointer w-80"
     src={`${IMAGE_SERVER_URL}/8NmHmaon0OKx4zGXG5E_R.png`}
    />
   </div>

   <div className="flex space-x-2 ">
    <img
     onClick={submit}
     className="cursor-pointer w-80"
     src={`${IMAGE_SERVER_URL}/8NmHmaon0OKx4zGXG5E_R.png`}
    />
    <img
     onClick={submit}
     className="cursor-pointer w-80"
     src={`${IMAGE_SERVER_URL}/8NmHmaon0OKx4zGXG5E_R.png`}
    />
   </div>
  </>
 );
}
