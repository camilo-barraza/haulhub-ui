import React, { useState, useContext, useReducer } from "react";
const POPULATE_TREE = "POPULATE_TREE";
const CLEAR_TREE = "CLEAR_TREE";

const treeReducer = (state = {
  leaf: "val1", 
  leaf2: "val2"
}, action) => {
  switch (action.type) {
  case POPULATE_TREE:
    return {
      ...state,
      leaf: "new val1",
      leaf2: "new val2",
    };
  case CLEAR_TREE:
    return {
      ...state,
      leaf: "empty",
      leaf2: "empty",
    };
  default:
    return state;
  }
};

const populateTree = (dispatch, state) => {
  return () => {
    dispatch({ type: POPULATE_TREE });
  };
};

export const useTestStore = () => {
  const [test, setTest] = useState("test");
  const [anotherTest, setAnotherTest] = useState("anotherTest"); 

  const [tree, dispatch] = useReducer(treeReducer);
  if (!tree)
    dispatch("init");

  const updateTestAnotherTest = (_test, _anotherTest) => {
    setTest(_test);
    setAnotherTest(_anotherTest);
  };

  const clearTree = () => {
    dispatch({ type: CLEAR_TREE });
  };

  return [{
    tree,
    test,
    anotherTest
  },
  {
    dispatch,
    populateTree: populateTree(dispatch, tree),
    clearTree,
    updateTestAnotherTest
  }];
};

export const TestContext = React.createContext();

const Test4 = () => {
  const store = useTestStore();
  const [{ tree, test }] = store;
  console.log(test, tree);

  return (<TestContext.Provider value={store}>
    <Test></Test>
  </TestContext.Provider>);
}; 

const Test = () => {
  const [{
    test, 
    anotherTest,
    tree
  }, 
  { 
    updateTestAnotherTest,
    clearTree,
    populateTree
  }] = useContext(TestContext);

  return (<div>
    <div className='border'>
      <div onClick={populateTree}> populate </div>
      <div onClick={clearTree}> clear </div>
      <pre> {JSON.stringify(tree,null,2)} </pre> 
    </div>
    <div onClick={() => { updateTestAnotherTest("new", "new2"); }}>
      {test} {anotherTest}
    </div>
  </div>);
};

export default Test4;