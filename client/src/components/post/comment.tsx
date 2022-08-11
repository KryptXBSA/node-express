/** @format */

import { useEffect, useRef, useState } from "react";

import { PublicKey } from "@solana/web3.js";
import moment from "moment";

import axios from "axios";
type Comment = {
 comment_id: string;
 user_id: string;
 username: string;
 profileImageUrl: string;
 content: string;
 comment_date: number;
};
type Props = {
 data: Comment;
 post_id: string;
};
export const Comment = ({ data }: Props) => {
 const [postedAt, setPostedAt] = useState(
  moment(new Date(data.comment_date).toUTCString()).fromNow()
 );
 useEffect(() => {
  const interval = setInterval(() => {
   setPostedAt(moment(new Date(data.comment_date).toUTCString()).fromNow());
  }, 1000);
  return () => {
   clearInterval(interval);
  };
 }, []);
 return (
  <div>
   <div className="h-1 border-b-2 my-2 border-gray-700"></div>
   <div className="flex break-all flex-col">
    <div className=" mt-1 mx-5 flex justify-start items-center flex-row">
     <div className="pb- pr-2">
      <img
       className="w-10 h-10  rounded-full"
       src={`${IMAGE_SERVER_URL}/${data.profileImageUrl}`}
       alt="Rounded avatar"
      />
     </div>
     <div className="flex break-all flex-col">
      <div>
       <span className=" text-xl ">{data.username}</span> <span>&nbsp;•&nbsp;</span>
       <span className="text-1xl"> {postedAt}</span>
      </div>
      <p
       style={{ marginTop: -7 }}
       className=" text-sm text-blue-500 hover:underline truncate  w-44">
       {data.username}
      </p>
     </div>
    </div>
    <span className="ml-5 ">{data.content}</span>
   </div>
  </div>
 );
};
interface NewCommentProps {
 postPubkey: PublicKey;
}

import { UseProgramContext } from "../../contexts/programContextProvider";
import { useNotifier } from "react-headless-notifier";
import { IMAGE_SERVER_URL, SERVER_URL } from "../../../config";

export const NewComment = ({ post_id }: { post_id: string }) => {
 let commentInputRef: any = useRef();

 const { notify } = useNotifier();
 let programContext = UseProgramContext()!;
 const [showSuccess, setShowSuccess] = useState(false);
 async function newComment0(e: { preventDefault: () => void }) {
  setShowSuccess(false);
  e.preventDefault();
  try {
   let data = { content: commentInputRef.current.value };
   const response = await axios.post(`${SERVER_URL}/post/comment?post_id=${post_id}`, data, {
    headers: {
     authorization: programContext?.state.token,
    },
   });
   let dataa = {
    comment_id: "",
    user_id: "",
    username: programContext?.state.user.username,
    content: commentInputRef.current.value,
    profileImageUrl: programContext?.state.user.imageUrl,
    comment_date: Date.now(),
   };
   if (response.data.message === "success") commentInputRef.current.value = "";
   setShowSuccess(true);
  } catch (error) {
   console.error(error);
  }
 }

 return (
  <>
   <form onSubmit={newComment0}>
    <div className="flex my-4 flex-row">
     <input
      required
      ref={commentInputRef}
      type="text"
      placeholder="Comment"
      className="input  grow "
     />
     <button className="btn w-32 ml-5  btn-square">Commment</button>
    </div>
   </form>
   {showSuccess && <span className="text-green-400">Success</span>}
  </>
 );
};
