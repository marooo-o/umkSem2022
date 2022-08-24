import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { NewsContext } from "../../App";
import Header from "../components/header";
import { instanceNews } from "../configuration/axiosInstance";
import { getCookie } from "../configuration/cookieExtension";
import queryString from "query-string";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Error = styled.div`
  color: red;
  font-size: 12px;
`;

export default function UpdateNews() {
  const [data, setData] = useState({ title: "", content: "" });
  const [error, setError] = useState({ title: null, content: null });
  const { setNewses } = useContext(NewsContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const stringParsed = queryString.parse(location.search);

  const allNews = () => {
    instanceNews
      .get("/all")
      .then((res) => setNewses(res.data))
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const Auth = getCookie("Authorization");
    if (Auth) {
      if (!!data?.title || !!data?.content) {
        setLoading(true);
        instanceNews
          .patch(
            "/",
            {
              title: data.title || stringParsed?.title,
              content: data.content || stringParsed?.content,
              id: stringParsed?.id,
            },
            {
              headers: {
                Authorization: Auth,
              },
            }
          )
          .then((res) => {
            allNews();
            setLoading(false);
            console.log(res);
          })
          .catch((err) => {
            setLoading(false);
          });
      }
    } else {
      navigate("/");
    }
  };

  return (
    <div>
      <Header title={"Update News"} />
      <button onClick={() => navigate(-1)} type="button">
        Back
      </button>
      <Container>
        <div style={{ width: "378px", margin: "15px 8px", padding: "10px" }}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor="title">Title</label>
            <br />
            <input
              defaultValue={stringParsed?.title}
              id="title"
              name="title"
              onChange={(e) => setData({ ...data, title: e.target.value })}
              style={{ width: "100%", marginTop: "8px" }}
              type="text"
            />
            <br />
            <br />
            <label htmlFor="content">Cotnent</label>
            <br />
            <textarea
              id="content"
              name="content"
              defaultValue={stringParsed?.content}
              onChange={(e) => setData({ ...data, content: e.target.value })}
              style={{ width: "100%", marginTop: "8px" }}
              rows={6}
            ></textarea>
            <div style={{ marginTop: "20px" }}>
              {loading ? (
                <button disabled>Loading...</button>
              ) : (
                <input type="submit" value="Submit" />
              )}
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
}
