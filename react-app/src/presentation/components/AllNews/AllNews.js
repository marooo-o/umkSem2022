import React, { useContext, useEffect } from "react";
import { instanceNews } from "../../configuration/axiosInstance";
import styled from "styled-components";
import NewsCard from "./NewsCard";
import { NewsContext } from "../../../App";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Row = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
`;

export default function AllNews({user}) {
  const { newses, setNewses } = useContext(NewsContext);

  useEffect(() => {
    instanceNews
      .get("/all")
      .then((res) => setNewses(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <Container>
      <Row>
        {newses.map((news, i) => (
          <NewsCard key={news._id} news={news} user={ user} />
        ))}
      </Row>
    </Container>
  );
}
