import React from "react";
import styled from "styled-components";
import { IssueTemplete } from "../components/template/Issue";

const SContainer = styled.div`
  padding: 16px;
`;

export const IssuePage = () => {
  return (
    <SContainer>
      <IssueTemplete />
    </SContainer>
  );
};
