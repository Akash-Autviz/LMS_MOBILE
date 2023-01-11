import React, { createContext, useContext, useState } from "react";

const StateContext = React.createContext();

const initialState = {
  model: false,
};
export const ContextProvider = ({ children }) => {
  const [index, setIndex] = useState(0);
  const [mockTestId, setMockTestId] = useState(0);
  const [isLogIn, setisLogIn] = useState(false);
  const [ansResultIdx, SetAnsResultIdx] = useState([{ color: "red" }]);
  const [userDetail, setUserDetail] = useState({});
  const [access_token, setAccess_token] = useState("");
  return (
    <StateContext.Provider
      value={{
        access_token,
        setAccess_token,
        userDetail,
        setUserDetail,
        index,
        setIndex,
        mockTestId,
        setMockTestId,
        SetAnsResultIdx,
        ansResultIdx,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
