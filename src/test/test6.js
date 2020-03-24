import React, { useContext, useState } from "react";

const FlashContent = ({ children }) => {
  const [{
    isOpen,
    message,
    severity
  },
  {
    hideFlash
  }] = useContext(Context);

  return (<div>
    Flash component: 
    {severity}
    {children}
    {/* <Snackbar
      open={isOpen}
      autoHideDuration={6000}
      onClose={hideFlash}
    >
      <MuiAlert
        onClose={hideFlash}
        severity={severity}
        elevation={6}
        variant="filled"
      >
        {message}
      </MuiAlert>
    </Snackbar> */}
  </div>);
};

const useFlashStore = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [message, setMessage] = useState("");

  const showFlash = (payload) => {
    setIsOpen(true);
    setSeverity(payload.severity);
    setMessage(payload.message);
  };

  const hideFlash = () => {
    setIsOpen(false);
  };

  return [{ isOpen, message, severity }, { showFlash, hideFlash }];
};

export const Context = React.createContext();

export const Flash = ({ children }) => {
  return (<Context.Provider value={useFlashStore()}>
    <FlashContent>
      {children}
    </FlashContent>
  </Context.Provider>);
};



const App = () => {
  return (<Flash>
    <Test></Test>
  </Flash>);
}; 

const Test = () => {
  const { showFlash } = useContext(Context)[1];
  return (<div onClick={() => { showFlash( { message:"test msg", severity:"new severity"}); }}>
    test component
  </div>);
};

export default App;