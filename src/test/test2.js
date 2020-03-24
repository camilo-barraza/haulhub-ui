import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { useThemeStore, ThemeContext } from "./test";

const Wrapper = styled.div`
  background-color: gray;
  border: solid 1px black ;
`;

const TestChild = () => {
  const [{
    theme,
    testing
  },
  {
    toggleTheme,
    updateTesting
  }] = useContext(ThemeContext);

  useEffect(() => {
    console.log("rendered themed button");
  });

  return (<Wrapper onClick={() => { updateTesting("random"); }}>
    <pre> {JSON.stringify(testing, null, 2)} </pre>
    <div onClick={toggleTheme}> update </div>
    <button style={{ background: theme.background, color: theme.foreground }}>
      I am styled by theme context!
    </button>
  </Wrapper>
  );
};

const Test2 = () => {
  return (<div>
    <ThemeContext.Provider value={useThemeStore()}>
      <TestChild></TestChild>
    </ThemeContext.Provider>
  </div>);
}; 

export default Test2;