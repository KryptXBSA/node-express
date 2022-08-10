/** @format */

import Link from "next/link";
import { useState } from "react";
import { BookmarkButton, LikeButton, TipButton } from "./buttons";
import { ShareButton, CommentButton } from "./buttons";
import { Comment, NewComment } from "./comment";
import * as anchor from "@project-serum/anchor";
import moment from "moment";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { UseProgramContext } from "../../contexts/programContextProvider";
import { useEffect } from "react";
import { Post } from "../../types/post";

export function Post({
 likes,
 content,
 username,
 user_id,
 post_date,
 post_id,
 profileImageUrl,
 imageUrl,
 comments,
}: Post) {
 const [commentsVisible, setCommentsVisible] = useState(false);
 const [postComments, setPostComments]: any = useState(comments);
 function displayComments() {
  setCommentsVisible(!commentsVisible);
  setPostComments(
   <>{postComments.length > 0 && postComments.map((c: any) => <Comment data={c} />)}</>
  );
 }
 const [postedAt, setPostedAt] = useState(moment(new Date(post_date).toUTCString()).fromNow());

 useEffect(() => {
  const interval = setInterval(() => {
   setPostedAt(moment(new Date(post_date).toUTCString()).fromNow());
  }, 1000);
  return () => {
   clearInterval(interval);
  };
 }, []);

 return (
  <div className="pl- break-all w-full border-gray-700 grow  ">
   <div className="flex  justify-start   border-b-2 border-gray-700  flex-col">
    {/* margin y nabe yakam dana ^^^^^^^^^^^^^ */}
    <div className="flex justify-start items-center flex-row">
     <div className="flex flex-col">
      <div className="flex justify-start   items-center flex-row">
       <div className="flex cursor-pointer items-center">
        <div className="pb- pr-2">
         <img
          className="w-10 h-10  rounded-full"
          src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
          alt="Rounded avatar"
         />
        </div>
        <span className=" text-2xl ">{username}</span>
       </div>
       <span>&nbsp;•&nbsp;</span>
       <span className="text-base">{postedAt}</span>
      </div>
     </div>
    </div>
    <p className=" w-fit p- break-words">{content}</p>
    <div className="flex   justify-around items-stretch flex-row">
     <LikeButton likes={likes} />
     <CommentButton commentCount={comments.length} setCommentsVisible={() => displayComments()} />
     {/* <div className="tooltip" data-tip="Coming Soon"> */}
     {/* <ShareButton /> */}
     {/* </div> */}
    </div>

    {commentsVisible && (
     <>
      {postComments}
      {!postComments && <div className="divider"></div>}
      <NewComment />
     </>
    )}
   </div>
  </div>
 );
}
