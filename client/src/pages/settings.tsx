/** @format */

import Head from "next/head";
import { useContext, useEffect, useRef, useState } from "react";
import { NewPost } from "../components/new-post";
import { Post } from "../components/post/post";
import Layout from "../sections/Layout";

import { setCookie, getCookie } from "cookies-next";
import axios from "axios";
import moment from "moment";
import { ProgramContextInterface, UseProgramContext } from "../contexts/programContextProvider";
import { Leaderboard } from "../types/leaderboard";
import { SERVER_URL } from "../../config";

export default function Home() {
 const programContext = UseProgramContext()!;

 const [leaderboard, setLeaderboard] = useState<Leaderboard[]>([]);
 const [fetchedLeaderboard, setFetchedLeaderboard] = useState(false);
 useEffect(() => {
  if (!fetchedLeaderboard) {
   fetchLeaderboard();
   setFetchedLeaderboard(true);
  }
 }, []);

 async function fetchLeaderboard() {
  try {
   const response = await axios.post(`${SERVER_URL}/public/get-leaderboard?skip=0`);
   response.data;
   setLeaderboard(response.data.leaderboard);
  } catch (error) {
   console.error(error);
  }
 }

 return (
  <>
   <Head>
    <title>Social Block</title>
    <link rel="icon" href="/favicon.ico" />
   </Head>
   <Layout active={5}>
    <main style={{ width: 1700 }} className="  bg-slate-900 w flex justify-center flex-row">
     <Settings />
     <div style={{ marginBottom: 599 }} className=""></div>
    </main>
   </Layout>
  </>
 );
}

function Settings() {
 const programContext = UseProgramContext()!;
 let usernameRef: any = useRef("");
 let currentPasswordRef: any = useRef("");
 let newPassword: any = useRef("");
 let imageRef: any = useRef("");
 const [file, setFile]: any = useState();
 async function submit(e: { preventDefault: () => void }) {
  e.preventDefault();
  if (file) {
   const formData = new FormData();
   formData.append("image", file!);
   formData.append("currentPassword", currentPasswordRef.current.value);
   if (usernameRef.current.value) formData.append("username", usernameRef.current.value);
   if (newPassword.current.value) formData.append("newPassword", newPassword.current.value);
   try {
    const response = await axios.post(`${SERVER_URL}/settings/profile`, formData, {
     headers: {
      "Content-Type": "multipart/form-data",
      authorization: programContext?.state.token,
     },
    });
    if (response.status === 200) {
     imageRef.current.value = "";
    }
    setCookie("token", response.data.token);
    console.log(response);
   } catch (e: any) {
    console.log(e);
   }
  }
 }
 return (
  <form onSubmit={submit} className="mt-6 w-1/3">
   <div className="relative z-0 mb-6 w-full group">
    <input
     ref={usernameRef}
     className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
     placeholder=" "
    />
    <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
     New Username
    </label>
   </div>
   <div className="relative z-0 mb-6 w-full group">
    <input
     ref={currentPasswordRef}
     type="password"
     name="floating_password"
     id="floating_password"
     className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
     placeholder=" "
     required
    />
    <label
     htmlFor="floating_password"
     className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
     Current Password
    </label>
   </div>
   <div className="relative z-0 mb-6 w-full group">
    <input
     ref={newPassword}
     type="password"
     name="repeat_password"
     id="floating_repeat_password"
     className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
     placeholder=" "
    />
    <label
     htmlFor="floating_repeat_password"
     className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
     New Password
    </label>
    <>
     <label
      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      htmlFor="user_avatar"></label>
     <input
      ref={imageRef}
      className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
      aria-describedby="user_avatar_help"
      onChange={(e) => {
       setFile(e.target.files![0]);
      }}
      multiple={false}
      id="user_avatar"
      type="file"
     />
     <div className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="user_avatar_help"></div>
    </>
   </div>

   <button
    type="submit"
    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
    Save
   </button>
  </form>
 );
}
