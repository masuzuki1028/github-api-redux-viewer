import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import { GlobalStyle } from "./styles/GlobalStyle";
import { TopPage } from "./pages/Top";
import { IssuePage } from "./pages/Issue";
import { PullRequestPage } from "./pages/PullRequest";
import { ProfilePage } from "./pages/Profile";
import { Header } from "./components/organism/Header";
import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SContent = styled.div`
  max-width: 896px;
  margin: 0 auto;
  padding: 32px 16px;
`;

function App() {
  const modal = useSelector((state) => state.modal);

  return (
    <BrowserRouter basename="/github-api-redux-viewer">
      <GlobalStyle />
      <Header />
      <SContent>
        <Routes>
          <Route path="/" element={<TopPage />} />
          <Route path="/issue" element={<IssuePage />} />
          <Route path="/pull-request" element={<PullRequestPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </SContent>
      <Modal isOpen={modal.show}>{modal.content}</Modal>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
