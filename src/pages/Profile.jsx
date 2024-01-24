import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { fetchUser } from "../apis/users";
import { updateProfile } from "../store/Profile";
import { colors } from "../styles/constants";

const SContainer = styled.div`
  padding: 16px;
  margin: auto;
`;

const STitle = styled.h1``;

const SContent = styled.div`
  margin: 32px 0;
  display: flex;
  border-radius: 6px;
  border: 1px solid ${colors.border};
`;

const SLeft = styled.div`
  padding: 16px;
  width: 50%;
`;
const SRight = styled.div`
  padding: 16px;
  width: 50%;
`;

const SGroup = styled.div``;

const SLabel = styled.label`
  color: ${colors.weakBlack};
`;

const SField = styled.p`
  padding: 16px 0;
  font-size: 1.2rem;
`;

export const ProfilePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchUser();
      dispatch(
        updateProfile({
          name: data.name,
          url: data.html_url,
          profileUrl: data.avatar_url,
          following: data.following,
          followers: data.followers,
          public_repos: data.public_repos,
          private_repos: data.total_private_repos,
        })
      );
    };
    fetchData();
  }, []);

  const user = useSelector((state) => state.user);

  return (
    <SContainer>
      <STitle>profile</STitle>
      <SContent>
        <SLeft>
          <SGroup>
            <SLabel>プロフィール</SLabel>
            <SField>
              <img
                src={user.profileUrl}
                alt="プロフィール"
                width="60"
                height="60"
              />
            </SField>
          </SGroup>
        </SLeft>
        <SRight>
          <SGroup>
            <SLabel>ユーザ名</SLabel>
            <SField>{user.name}</SField>
          </SGroup>
          <SGroup>
            <SLabel>アカウントURL</SLabel>
            <SField>
              <a href={user.url}>{user.url}</a>
            </SField>
          </SGroup>
          <SGroup>
            <SLabel>フォロー数</SLabel>
            <SField>{user.follow}</SField>
          </SGroup>
          <SGroup>
            <SLabel>フォロワー数</SLabel>
            <SField>{user.followers}</SField>
          </SGroup>
          <SGroup>
            <SLabel>パブリックレポジトリ数</SLabel>
            <SField>{user.public_repos}</SField>
          </SGroup>
          <SGroup>
            <SLabel>プライベートレポジトリ数</SLabel>
            <SField>{user.private_repos}</SField>
          </SGroup>
        </SRight>
      </SContent>
    </SContainer>
  );
};
