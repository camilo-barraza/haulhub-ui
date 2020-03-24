import React, { useContext } from "react";
import FlashProvider, { useFlash } from "./FlashContext";

export default function App() {
  return (
    <div>
      <FlashProvider>
        <Test/>
        <FlashProvider>
          <Test2></Test2>
        </FlashProvider>
      </FlashProvider>
    </div>
  );
}

const Test = () => {
  const { state: { test }, setTest } = useFlash();
  return (<div onClick={() => { setTest("new value"); }}>
    {test}
  </div>);
};

const Test2 = () => {
  const { state: { test }, setTest } = useFlash();
  return (<div onClick={() => { setTest("new value"); }}>
    {test}
  </div>);
};
