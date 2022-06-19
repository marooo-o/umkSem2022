import * as React from "react";
import styled from 'styled-components';



const Container = styled.div`
    display: flex;
    justify-content: center;
`

const Header = (props) => {

return (
  <Container>
    <h1>{props.title}</h1>
  </Container>
);
}

export default Header;