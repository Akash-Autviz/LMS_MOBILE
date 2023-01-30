import React, { createContext, useContext, useEffect, useState } from "react";

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
  const [refresh, setRefresh] = useState("");

  const [userImage, setuserImage] = useState();
  const [questionLength, setQuestionLength] = useState();

  return (
    <StateContext.Provider
      value={{
        refresh,
        setRefresh,
        questionLength,
        setQuestionLength,
        userImage,
        setuserImage,
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
