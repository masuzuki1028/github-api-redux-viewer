import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "../atoms/Button";
import { useSelector, useDispatch } from "react-redux";
import { deleteIssue, upsertIssue } from "../../store/Issue";
import { open } from "../../store/Modal";
import { IssueItem } from "../organism/IssueItem";
import { IssueForm } from "../organism/IssueForm";
import { TextField } from "../atoms/TextField";
import { colors } from "../../styles/constants";
import { closeIssue, fetchIssues } from "../../apis/issues";
import { useEffect } from "react";


const SContainer = styled.div`
  padding: 16px;
  margin-top: 16px;
`;

const SContent = styled.div``;

const SHeader = styled.div`
  display: flex;
  align-items: center;
`;

const SHeading = styled.div`
  display: flex;
  align-items: center;
`;

const SForm = styled.div`
  padding: 8px 16px;
  display: flex;
  width: 100%;
`;

const SAction = styled.div`
  display: flex;
`;

const STable = styled.table`
  border: 1px solid ${colors.border};
  border-radius: 6px;
  .outline {
    width: 140rem;
  }

  th,
  td {
    padding: 8px;
    text-align: left;
    min-width: 10rem;
    border-bottom: 1px solid ${colors.border};
  }

  th:first-child,
  td:first-child {
    min-width: auto;
  }

  .no-divider {
    border-bottom: 0;
  }
`;

export const IssueTemplete = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const data1 = fetchIssues();
    data1.then((data) => {
      data.forEach((issue) => {
        console.log(`Number: ${issue.number}`);
        console.log(`Title: ${issue.title}`);
        console.log(`Body: ${issue.body}`);
        console.log(`State: ${issue.state}`);
        console.log(`Created at: ${issue.created_at}`);
        console.log(`Updated at: ${issue.updated_at}`);
        console.log(`User login: ${issue.user.login}`);
        console.log('---');
        dispatch(upsertIssue(
          {
            id: issue.number,
            title: issue.title,
            description: issue.body,
            status: issue.state === "open" ? 0 : 1,
            created_at: issue.created_at,
            updated_at: issue.updated_at,
            user: issue.user.login,
          }
        ));
    });
    });
  },[]);
  
  const data = useSelector((state) => state.issues);
  const [selectedIds, setSelectedIds] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");

  const filteredIssues = Object.values(data).filter((item) => {
    return item.title.toLowerCase().includes(searchTitle.toLowerCase());
  });

  const openModal = () => {
    dispatch(open(<IssueForm />));
  };

  const onClickCheckBox = (id) => {
    setSelectedIds((prevIds) =>
      prevIds.includes(id)
        ? prevIds.filter((prevId) => prevId !== id)
        : [...prevIds, id]
    );
  };

  const onRemove = () => {
    selectedIds.forEach((id) => {
      closeIssue(id);
      dispatch(deleteIssue(id));
    });
  };

  const onRowClick = (id) => {
    dispatch(open(<IssueForm id={id} />));
  };

  const onCheckAll = (e) => {
    if (e.target.checked) {
      const allIds = filteredIssues.map((issue) => issue.id);
      setSelectedIds(allIds);
    } else {
      setSelectedIds([]);
    }
  };

  return (
    <SContainer>
      <SHeader>
        <SHeading>
          <h2>Issue</h2>
        </SHeading>
        <SForm>
          <TextField
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            placeholder="Issue名で検索"
          />
        </SForm>
        <SAction>
          <Button variant="new" onClick={openModal} text="new" />
          <Button variant="delete" onClick={onRemove} text="delete" />
        </SAction>
      </SHeader>
      <SContent>
        <STable>
          <thead>
            <tr>
              <th>
                <input type="checkbox" onChange={onCheckAll} />
              </th>
              <th></th>
              <th>ステータス</th>
              <th>作成者</th>
              <th>作成日付</th>
              <th>更新日付</th>
            </tr>
          </thead>
          <tbody>
            {filteredIssues.length > 0 ? (
              filteredIssues.map((item) => (
                <IssueItem
                  key={item.id}
                  item={item}
                  onClickCheckBox={() => onClickCheckBox(item.id)}
                  checked={selectedIds.includes(item.id)}
                  onRowClick={() => onRowClick(item.id)}
                />
              ))
            ) : (
              <tr>
                <td colSpan="6">データがありません</td>
              </tr>
            )}
          </tbody>
        </STable>
      </SContent>
    </SContainer>
  );
};
