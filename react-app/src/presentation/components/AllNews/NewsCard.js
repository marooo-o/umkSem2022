import React, { useContext, useState } from "react";
import styled from "styled-components";
import dateFormat from "dateformat";
import { instanceNews } from "../../configuration/axiosInstance";
import { getCookie } from "../../configuration/cookieExtension";
import { NewsContext } from "../../../App";
import { useNavigate } from "react-router-dom";
import queryString from 'query-string';

const Card = styled.div`
  width: 350px;
  border: 1px solid gray;
  padding: 15px;
  border-radius: 8px;
  margin: 15px 8px;
`;

const CardTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
  text-transform: capitalize;
  margin: 10px 0px;
`;
const CardBody = styled.div`
  margin: 5px 0px;
  text-align: justify;
`;
const CardText = styled.p`
  font-size: 12px;
  font-weight: 400;
  color: gray;
`;
const CardHeader = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: space-between;
`;

const UserArea = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const User = styled.div`
  border: 1px solid gray;
  padding: 5px;
  border-radius: 50%;
  width: 20px;
  height: 20px;
`;

const Author = styled.h4`
  font-size: 15px;
  text-transform: capitalize;
  margin: 0;
`;
const Date = styled.p`
  font-size: 12px;
  margin: 0;
  color: gray;
`;
const Button = styled.button`
  background: lightgray;
  outline: none;
  border: none;
  cursor: pointer;
  width: 100%;
  margin: 5px 0;
  border-radius: 5px;
  padding: 2px 5px;
`;
const DropDown = styled.div`
    position: absolute;
    border: 1px solid gray;
    padding: 4px 10px;
    border-radius: 5px;
    z-index: 10;
    background: white;
    right: 1px;
}
`;
export default function NewsCard({ news, user }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const { setNewses } = useContext(NewsContext);

  const navigate = useNavigate();

  const allNews = () => {
    instanceNews
      .get("/all")
      .then((res) => setNewses(res.data))
      .catch((err) => console.log(err));
  };

  // handle delete

  const handleDelete = (id) => {
    const Auth = getCookie("Authorization");
    instanceNews
      .delete("/", {
        data: { id: id },
        headers: {
          Authorization: Auth,
        },
      })
      .then((res) => {
        setShowDropdown(false);
        allNews();
      })
      .catch((err) => {
        setShowDropdown(false);
      });
  };
  // handle edit news

  const handleEdit = () => {
    const stringified = queryString.stringify({ id: news._id, title: news.title, content: news.content }, { sort: false });
    navigate(`/news/edit?${stringified}`)
  };
  return (
    <Card>
      <CardHeader>
        <div>
          <UserArea>
            <User>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </User>
            <div>
              <Author>{news.author}</Author>
              <Date>{dateFormat(news.date, "dd mmm yyyy")}</Date>
            </div>
          </UserArea>
        </div>

        <div style={{ position: "relative" }}>
          {user?.auth[0].authority !== "ROLE_USER" ? (
            <div
              onClick={() => setShowDropdown(!showDropdown)}
              style={{ width: "20px", cursor: "pointer" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
              </svg>
            </div>
          ) : (
            <></>
          )}
          {showDropdown && (
            <DropDown>
              <Button onClick={() => handleEdit()}>Edit</Button>
              <Button onClick={() => handleDelete(news._id)}>Delete</Button>
            </DropDown>
          )}
        </div>
      </CardHeader>
      <CardTitle>{news.title}</CardTitle>
      <CardBody>
        <CardText>{news.content}</CardText>
      </CardBody>
    </Card>
  );
}
