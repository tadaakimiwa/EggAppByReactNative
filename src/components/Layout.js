import React from "react";
import { Container, Content } from "native-base";

export default function Layout(props) {
  return (
    <Container>
      <Content>{props.children}</Content>
    </Container>
  );
}
