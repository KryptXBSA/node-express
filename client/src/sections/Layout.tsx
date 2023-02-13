/** @format */
import { useSession, signIn, signOut } from "next-auth/react";
import Head from "next/head";
import { ReactNode, useEffect, useRef, useState } from "react";
import { Sidebar } from "../components/sidebar";
import {
  parseJwt,
  UseProgramContext,
} from "../contexts/programContextProvider";
import { useNotifier } from "react-headless-notifier";
import { SpecialAlert } from "../components/alert";
import axios from "axios";
import { setCookie, getCookie } from "cookies-next";

import { SERVER_URL } from "../../config";
const Layout = ({
  children,
  active,
  page = "default",
}: {
  children: ReactNode;
  active?: number;
  page?: string;
}) => {
  const session = useSession();
  console.log("Session  ", session);
  const { notify } = useNotifier();
  let programContext: any = UseProgramContext();
  const [loggedIn, setLoggedIn] = useState(programContext.state.loggedIn);

  useEffect(() => {
    setLoggedIn(programContext.state.loggedIn);
  }, [programContext]);

  if (!loggedIn) {
    return (
      <div className="">
        <div className="flex space-x-2 justify-center items-center">
          <div className="w-1/3 pr-2 border-r-2">
            <SignUp />
          </div>
          <div className="w-1/3 ">
            <Login />
          </div>
        </div>
        <div style={{ paddingBottom: 299 }} className=""></div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <div className="mr-52"> */}
      <Sidebar active={active} />
      {/* </div> */}
      <div
        className={
          page === "block" ? "" : `relative justify-center flex flex-row `
        }
      >
        {children}
      </div>
    </>
  );
};

export default Layout;

function SignUp() {
  const [error, setError] = useState("");
  let programContext = UseProgramContext();
  let usernameInputRef: any = useRef();
  let passwordInputRef: any = useRef();
  async function signup(e: any) {
    e.preventDefault();
    let username = usernameInputRef.current.value;
    let password = passwordInputRef.current.value;
    let data = { username, password };
    try {
      const response = await axios.post(`${SERVER_URL}/signup`, data);
      if (response.data.token) {
        programContext!.changeState({
          action: "change",
          token: response.data.token,
          user: parseJwt(response.data.token),
        });
        setCookie("token", response.data.token);
      }
    } catch (error: any) {
      console.log(error.response.data.message);
      setError(error.response.data.message);
    }
  }
  return (
    <form onSubmit={signup} className="w-full">
      <div className="font-bold text-xl my-4">Sign Up</div>
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          Username
        </label>
        <input
          ref={usernameInputRef}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Password
        </label>
        <input
          ref={passwordInputRef}
          type="password"
          id="password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
      {error && <div className="text-red-500">{error} </div>}
      <div className="flex items-start mb-6"></div>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Sign Up
      </button>
    </form>
  );
}
function Login() {
  const [error, setError] = useState("");
  let programContext = UseProgramContext();
  let usernameInputRef: any = useRef();
  let passwordInputRef: any = useRef();
  async function login(e: any) {
    e.preventDefault();
    let username = usernameInputRef.current.value;
    let password = passwordInputRef.current.value;
    let data = { username, password };
    try {
      const response = await axios.post(`${SERVER_URL}/login`, data);
      if (response.data.token) {
        programContext!.changeState({
          action: "change",
          token: response.data.token,
          user: parseJwt(response.data.token),
        });
        setCookie("token", response.data.token);
      }
    } catch (error: any) {
      console.log(error.response.data.message);
      setError(error.response.data.message);
    }
  }
  return (
    <form onSubmit={login} className="w-full">
      <div className="font-bold text-xl my-4">Login</div>
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          Username
        </label>
        <input
          ref={usernameInputRef}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Password
        </label>
        <input
          ref={passwordInputRef}
          type="password"
          id="password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
      {error && <div className="text-red-500">{error} </div>}
      <div className="flex items-start mb-6"></div>
      <button onClick={async() => console.log("loginnnnnnnnnnnnnnnnnnnm,",await signIn("github",{redirect:false}))}>Sign in</button>
      <button onClick={() => signOut()}>Sign Out</button>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Sign Up
      </button>
    </form>
  );
}
