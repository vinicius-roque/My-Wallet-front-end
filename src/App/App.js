import GlobalStyle from "../Globally/globalStyle";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "../Components/Login/SignIn";
import { AppWrapper } from "../Globally/styles";
import SignUp from "../Components/Login/SignUp";
import Extract from "../Components/Extract/Extract";
import TransactionForms from "../Components/Transaction/TransactionForm";
import { useState } from "react";

export default function App() {
  const [userData, setUserData] = useState({});

  return (
    <>
      <GlobalStyle />
      <AppWrapper>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignIn setUserData={setUserData} />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/extract" element={<Extract userData={userData} />} />
            <Route path="/add-transaction" element={<TransactionForms userData={userData} />} />
          </Routes>
        </BrowserRouter>
      </AppWrapper>
    </>
  )
}