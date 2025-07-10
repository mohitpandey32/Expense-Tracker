import { useState } from "react";
import Signup from "./components/Signup/Signup";
import Dashboard from "./Dashboard";

function App() {
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [userName, setUserName] = useState(""); 

  const handleSignup = (nameFromForm) => {
    console.log("✅ User signed up with name:", nameFromForm);
    setUserName(nameFromForm);
    setIsSignedUp(true);
  };

  return (
    <div>
      {!isSignedUp ? (
        <Signup onSignup={handleSignup} />
      ) : (
        <Dashboard userName={userName} />
      )}
    </div>
  );
}

export default App;
