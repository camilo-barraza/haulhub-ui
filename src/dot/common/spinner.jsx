import React, { Component } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  opacity:0.3;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Bounce = styled.div`
   width: 12px;
  height: 12px;
  margin:0 5px 0 5px;
  background-color: #333;

  @-webkit-keyframes sk-bouncedelay {
    0%, 80%, 100% { -webkit-transform: scale(0) }
    40% { -webkit-transform: scale(1.0) }
  }

  @keyframes sk-bouncedelay {
    0%, 80%, 100% { 
      -webkit-transform: scale(0);
      transform: scale(0);
    } 40% { 
      -webkit-transform: scale(1.0);
      transform: scale(1.0);
    }
  }

  border-radius: 100%;
  display: inline-block;
  -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  animation: sk-bouncedelay 1.4s infinite ease-in-out both;
`;

const Bounce1 = styled(Bounce)`
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
`;

const Bounce2 = styled(Bounce)`
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
`;

const SpinnerContainer = styled.div`
  width: 70px;
  text-align: center;
`;

class Spinner extends Component {
  render() {
    return (<Wrapper>
      <SpinnerContainer>
        <Bounce1 />
        <Bounce2 />
        <Bounce />
      </SpinnerContainer>
    </Wrapper>);
  }
}

export default Spinner; 