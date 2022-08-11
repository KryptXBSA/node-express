/** @format */

import { useRef, useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../../config";
import { UseProgramContext } from "../contexts/programContextProvider";
export const NewPost = ({ addPost }: any) => {
 let programContext = UseProgramContext();
 let contentInputRef: any = useRef("");
 let imageRef: any = useRef("");
 const [file, setFile]: any = useState();
 async function newPost(e: { preventDefault: () => void }) {
  e.preventDefault();
  if (contentInputRef.current.value.length > 0) {
   const formData = new FormData();
   formData.append("image", file!);
   formData.append("content", contentInputRef.current.value!);
   try {
    const response = await axios.post(`${SERVER_URL}/post/new`, formData, {
     headers: {
      "Content-Type": "multipart/form-data",
      authorization: programContext?.state.token,
     },
    });
let data = {
     post_id: "",
     user_id: "",
     username: programContext?.state.user.username,
     content: contentInputRef.current.value,
     profileImageUrl: programContext?.state.user.imageUrl,
     imageUrl: response.data.post.imageUrl,
     comments: [],
     likes: [],
     post_date: Date.now(),
    }
    console.log(data);
    
    addPost(data);
    if (response.status === 200) {
     contentInputRef.current.value = "";
     imageRef.current.value = "";
    }
    console.log(response);
   } catch (e: any) {
    console.log(e);
   }
  }
 }
 return (
  <>
   <div className="w-full">
    <form onSubmit={newPost}>
     <div className="flex w-full flex-row">
      <textarea
       required
       ref={contentInputRef}
       className="block p-2.5 w-full text-sm rounded-lg dark:bg-gray-800 "
      />
     </div>
     <div className="   form-control">
      <div className="flex items-center align-middle flex-row">
       <>
        <label
         className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
         htmlFor="user_avatar"></label>
        <input
         ref={imageRef}
         onChange={(e) => {
          setFile(e.target.files![0]);
         }}
         className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
         aria-describedby="user_avatar_help"
         id="user_avatar"
         type="file"
        />
        <div className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="user_avatar_help"></div>
       </>

       <button
        onClick={newPost}
        className="p-3 mt-2 px-4 transition duration-300  font-semibold btn1 tracking-normal text-lg  dark:bg-slate-800 ml-auto rounded-2xl ">
        New Post
       </button>
      </div>
     </div>
    </form>
   </div>
  </>
 );
};
