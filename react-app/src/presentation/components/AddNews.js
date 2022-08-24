import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { NewsContext } from "../../App";
import { instanceNews } from "../configuration/axiosInstance";
import { getCookie } from "../configuration/cookieExtension";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Error = styled.div`
  color: red;
  font-size: 12px;
`;

export default function AddNews() {
  const [data, setData] = useState({ title: "", content: "" });
  const [error, setError] = useState({ title: null, content: null });
  const { setNewses } = useContext(NewsContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
      if (!!data?.title && !!data?.content) {
        setLoading(true);
        instanceNews
          .post(
            "/",
            { title: data.title, content: data.content },
            {
              headers: {
                Authorization: Auth,
              },
            }
          )
          .then((res) => {
            allNews();
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
          });
      } else {
        if (!data?.title && !data.content) {
          setError({
            title: "This field required",
            content: "This field required",
          });
        } else {
          if (!data?.title) {
            setError({ ...error, title: "This field required" });
          }
          if (!data?.content) {
            setError({ ...error, content: "This field required" });
          }
        }
      }
    } else {
      navigate("/");
    }
  };

  return (
    <Container>
      <div style={{ width: "378px", margin: "15px 8px", padding: "10px" }}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="title">Title</label>
          <br />
          <input
            defaultValue={data?.title}
            id="title"
            name="title"
            onChange={(e) => setData({ ...data, title: e.target.value })}
            style={{ width: "100%", marginTop: "8px" }}
            type="text"
          />
          {error?.title && <Error>{error?.title}</Error>}
          <br />
          <br />
          <label htmlFor="content">Cotnent</label>
          <br />
          <textarea
            id="content"
            name="content"
            defaultValue={data.content}
            onChange={(e) => setData({ ...data, content: e.target.value })}
            style={{ width: "100%", marginTop: "8px" }}
            rows={6}
          ></textarea>
          {error?.content && <Error>{error?.content}</Error>}
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
  );
}
