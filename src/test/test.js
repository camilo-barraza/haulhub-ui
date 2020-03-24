import React, { useContext, useReducer, useEffect, useState } from "react";
import { FiltersContext, useFilters, FiltersProvider } from "./FiltersContext";

import ContextDevTool from "react-context-devtool";
import Test2 from "./test2";

const themes = {
  light: {
    type: "light",
    foreground: "#000000",
    background: "#eeeeee"
  },
  dark: {
    type: "dark",
    foreground: "#ffffff",
    background: "#344222"
  }
};

export const ThemeContext = React.createContext();
const TestContext = React.createContext();

const dispatchAPIActions = async (dispatch, actionName, method, url) => {
  dispatch({ type: `${method}_${actionName}_REQUEST`.toUpperCase() });
  try{
    const response = await axios[method](url); 
    dispatch({
      payload:response,
      type: `${method}_${actionName}_SUCCESS`.toUpperCase()
    });
  }
  catch(error){
    dispatch({
      payload: error,
      type: `${method}_${actionName}_FAILURE`.toUpperCase()
    });
  }
};

const themeReducer = (state, { type, payload }) => {
  switch (type) {
  case "toggle_theme":
    return state.type === "dark" ? themes.light : themes.dark;
  default:
    throw new Error();
  }
};

const loadMaterialOptions = () => {
  dispatchAPIActions(dispatch, "materials", "get", `/parts/${partNumber}`);
};

const toggleTheme = (dispatch) => {
  return () => {
    dispatch({ type: "toggle_theme" });
  };
};

export const useThemeStore = () => {
  const [theme, dispatch] = useReducer(themeReducer, themes.dark);
  const [testing, setTesting] = useState("initial");

  const updateTesting = (value) => {
    setTesting(value);
  };

  return [{
    theme,
    testing,
  },
  {
    dispatch,
    toggleTheme: () => { dispatch({ type: "toggle_theme" }); },
    updateTesting
  }];
};

export default function App() {
  const [date, setDate] = useState("algo");

  const onDispatch = ({ type }, state) => {
    if (type === "setDate") {
      setDate("testing");
    }
  };

  return (
    <ThemeContext.Provider value={useThemeStore()}>
      {date}
      <Test2></Test2>
      <FiltersProvider date={date} onDispatch={onDispatch}>
        <ContextDevTool context={ThemeContext} id="3fdsfdsfsadfs" displayName="ThemeContext" />
        {/* <ContextDevTool context={FiltersProvider} id="filters" displayName="FiltersContext" /> */}
        <TestContext.Provider value={{ test: "testing" }}>
          <ContextDevTool context={TestContext} id="32423" displayName="TestContext" />
          <Toolbar />
          <Filters />
          <OtherComponent></OtherComponent>
        </TestContext.Provider>
      </FiltersProvider>
    </ThemeContext.Provider>
  );
}

const Filters = () => {
  const { date, dispatch } = useContext(FiltersContext);
  return (<div onClick={() => { 
    dispatch({
      type: "setDate",
      payload: new Date ()
    }); 
  }}>
    filters
    <pre> {JSON.stringify(date,null,2)} </pre> 
  </div>);
};

const OtherComponent = () => {
  useEffect(() => {
    console.log("rendered other compoentn");
  });
  return (<div>
    other componetn
  </div>);
};

function Toolbar(props) {
  const [{ testing }] = useContext(ThemeContext);

  useEffect(() => {
    console.log("rendered");
  }, []);
  return (
    <div>
      <pre> {JSON.stringify(testing,null,2)} </pre> 
      <ThemedButton />
    </div>
  );
}

function ThemedButton() {
  const [{ 
    theme, 
    testing 
  }, 
  {
    toggleTheme,
    updateTesting
  }] = useContext(ThemeContext);

  const test = useContext(TestContext);

  useEffect(() => {
    console.log("rendered themed button");
  });

  return (<div onClick={() => { updateTesting("random");}}>
    <pre> {JSON.stringify(testing,null,2)} </pre> 
    <div onClick={toggleTheme}> update </div>
    <button style={{ background: theme.background, color: theme.foreground }}>
      I am styled by theme context!
    </button>
  </div>
  );
}