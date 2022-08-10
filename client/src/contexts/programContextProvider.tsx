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

let initialState = {
 user: { username: "", foundUser: false },
 didWelcome: false,
};
export interface InitialState {
 user: { username: string; foundUser: boolean };
 didWelcome: boolean;
}
type Actions =
 | { action: "welcome" }
 | {
    data: any;
    action: "username";
   };

function reducer(state: InitialState, user: Actions) {
 if (user?.action === "welcome") {
  return { user: state.user, didWelcome: true };
 }
 if (user?.action === "username") {
  if (!user) return { user: state.user, didWelcome: state.didWelcome };
  return { user: user.data, didWelcome: state.didWelcome };
 } else {
  return { user: state.user, didWelcome: state.didWelcome };
 }
}
export interface ProgramContextInterface {
 showSignupModal: boolean;
 setShowSignupModal: Dispatch<SetStateAction<boolean>>;
 state: InitialState;
 changeState: any;
}
export const ProgramContext = createContext<ProgramContextInterface | undefined>(undefined);
export function ProgramWrapper({ children }: any) {
 const [state, changeState] = useReducer(reducer, initialState);
 const [showSignupModal, setShowSignupModal] = useState(false);


 

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
