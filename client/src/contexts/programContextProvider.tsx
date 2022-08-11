/** @format */

import {
 createContext,
 Dispatch,
 SetStateAction,
 useContext,
 useEffect,
 useReducer,
 useState,
} from "react";

import { setCookie, getCookie } from "cookies-next";

let initialState = { token: {}, loggedIn: false, user: {} };

function reducer(state: any, user: any) {
 if (user?.action === "change") {
  return { token: user.token, loggedIn: true, user: user.user };
 }
 if (user?.action === "logout") {
  return { token: user.token, loggedIn: false, user: {} };
 }
}
export interface ProgramContextInterface {
 showSignupModal: boolean;
 setShowSignupModal: Dispatch<SetStateAction<boolean>>;
 state: any;
 changeState: any;
}
export const ProgramContext = createContext<ProgramContextInterface | undefined>(undefined);
export function ProgramWrapper({ children }: any) {
 const [state, changeState] = useReducer(reducer, initialState);
 const [showSignupModal, setShowSignupModal] = useState(false);

 useEffect(() => {
  let cookie = getCookie("token");

  if (cookie) changeState({ action: "change", token: cookie,user:parseJwt(cookie) });
 }, []);

 return (
  <ProgramContext.Provider
   value={{
    showSignupModal,
    setShowSignupModal,
    state,
    changeState,
   }}>
   {children}
  </ProgramContext.Provider>
 );
}

export function UseProgramContext() {
 return useContext(ProgramContext);
}
export function parseJwt(token: any) {
 var base64Url = token.split(".")[1];
 var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
 var jsonPayload = decodeURIComponent(
  window
   .atob(base64)
   .split("")
   .map(function (c) {
    return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
   })
   .join("")
 );

 return JSON.parse(jsonPayload);
}
