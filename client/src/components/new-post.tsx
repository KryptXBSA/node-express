/** @format */

import { useRef, useState } from "react";
export const NewPost = () => {
 let contentInputRef: any = useRef("");
 async function newPost(e: { preventDefault: () => void }) {
  e.preventDefault();
 }
 return (
  <>
   <div className="w-full">
    <div className="flex w-full flex-row">
     <textarea
      ref={contentInputRef}
      className="block p-2.5 w-full text-sm rounded-lg dark:bg-gray-800 "
     />
    </div>
    <div className="   form-control">
     <form onSubmit={newPost}>
      <div className="flex items-center align-middle flex-row">
       <button
        onClick={newPost}
        className="p-3 mt-2 px-4 transition duration-300  font-semibold btn1 tracking-normal text-lg  dark:bg-slate-800 ml-auto rounded-2xl ">
        New Post
       </button>
      </div>
     </form>
    </div>
   </div>
  </>
 );
};
