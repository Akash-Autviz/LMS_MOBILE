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
  return (
    <StateContext.Provider
      value={{
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
