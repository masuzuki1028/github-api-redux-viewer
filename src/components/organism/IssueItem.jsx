import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { colors } from "../../styles/constants";

const SContainer = styled.tr`
  cursor: pointer;

  &:hover {
    background: ${colors.hoverRow};
  }
`;

const Status = {
  0: "open",
  1: "close",
};

export const IssueItem = ({ item, onClickCheckBox, checked, onRowClick }) => {
  const status = Status[item.status];
  const created_at = dayjs(item.created_at).format("MM-DD-YYYY");
  const updated_at = dayjs(item.updated_at).format("MM-DD-YYYY");

  return (
    <SContainer key={item.id}>
      <td>
        <input
          type="checkbox"
          checked={checked}
          onChange={onClickCheckBox}
        ></input>
      </td>
      <td className="outline">
        <a href={item.html_url}>{item.title}</a>
      </td>
      <td onClick={onRowClick}>{status}</td>
      <td onClick={onRowClick}>{item.user}</td>
      <td onClick={onRowClick}>{created_at}</td>
      <td onClick={onRowClick}>{updated_at}</td>
    </SContainer>
  );
};

IssueItem.propTypes = {
  item: PropTypes.object,
  checked: PropTypes.bool,
  onClickCheckBox: PropTypes.func,
  onRowClick: PropTypes.func,
};
