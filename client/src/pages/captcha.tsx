/** @format */

import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { NewPost } from "../components/new-post";
import { Post } from "../components/post/post";
import Layout from "../sections/Layout";
import moment from "moment";
import { ProgramContextInterface, UseProgramContext } from "../contexts/programContextProvider";
import { IMAGE_SERVER_URL, POINTS_PER_CAPTCHA, SOCKER_SERVER_URL } from "../../config";
import { connect, io, Socket } from "socket.io-client";

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
let intervalId: any;
function Captcha({ word }: Captcha) {
 const [socket, setSocket] = useState<Socket>();
 const programContext = UseProgramContext()!;
 const [socketConnected, setSocketConnected] = useState(false);
 const [showResult, setShowResult] = useState(false);
 const [result, setResult] = useState(true);

 function socketConnect() {
  setSocket(
   io(SOCKER_SERVER_URL, {
    withCredentials: false,
    extraHeaders: {
     authorization: programContext.state.token,
    },
   })
  );
 }

 function fetchCaptcha() {
  socket?.emit("newCaptcha");
 }

 function submit(captcha_id: any) {
  socket?.emit("captchaAnswer", { captcha_id, word: captcha?.captchaWord });
  setShowResult(true);
 }
 function newCaptcha() {
  setCaptcha(undefined);
  fetchCaptcha();
  setShowResult(false);
 }
 socket?.on("captcha", (captcha) => {
  console.log("captcha", captcha);
  clearInterval(intervalId);
  setCaptcha(captcha);
 });
 socket?.on("captchaResult", (result) => {
  setResult(result.correctAnswer);
  console.log("result", result);
 });
 socket?.on("connect", () => {
  console.log("connected");
  setSocketConnected(true);
  fetchCaptcha();
 });
 const [captcha, setCaptcha] = useState<Captchas>();
 useEffect(() => {
  socketConnect();
  if (socketConnected) {
   intervalId = setInterval(fetchCaptcha, 3000);
  }
  return () => clearInterval(intervalId);
 }, [socketConnected]);

 if (showResult) {
  return (
   <>
    {result ? (
     <div className="font-bold text-3xl text-green-500">Correct +{POINTS_PER_CAPTCHA} Points</div>
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
    Select the image that contains:
    <span className="px-2 text-2xl">
     {captcha?.captchaWord ? (
      captcha?.captchaWord
     ) : (
      <span className="text-green-400">Loading Captcha</span>
     )}
    </span>
   </div>
   <div className="flex space-x-2 ">
    <Image
     submit={submit}
     captcha_id={captcha?.captchas[0].captcha_id!}
     image={captcha?.captchas[0].image!}
    />
    <Image
     submit={submit}
     captcha_id={captcha?.captchas[1].captcha_id!}
     image={captcha?.captchas[1].image!}
    />
   </div>

   <div className="flex space-x-2 ">
    <Image
     submit={submit}
     captcha_id={captcha?.captchas[2].captcha_id!}
     image={captcha?.captchas[2].image!}
    />{" "}
    <Image
     submit={submit}
     captcha_id={captcha?.captchas[3].captcha_id!}
     image={captcha?.captchas[3].image!}
    />
   </div>
   <button onClick={newCaptcha} className="btn  bg-sky-600 text-white w-32 ml-5  btn-square">
    New Captcha
   </button>
  </>
 );
}
function Image({ submit, image, captcha_id }: { submit: any; image: string; captcha_id: string }) {
 return <img onClick={() => submit(captcha_id)} className="cursor-pointer w-80" src={image} />;
}
type Captchas = {
 captchas: {
  captcha_id: string;
  image: string;
 }[];
 captchaWord: string;
};
