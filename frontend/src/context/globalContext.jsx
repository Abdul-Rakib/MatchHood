import { createContext, useState, useLayoutEffect } from "react";

export const GlobalContext = createContext({});
export const GlobalProvider = ({ children }) => {
  const host = "http://localhost:5173";

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ⬅️ Add loading state

  const deleteUser = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  useLayoutEffect(() => {
    if (localStorage.getItem("isLoggedIn")) {
      setIsLoggedIn(JSON.parse(localStorage.getItem("isLoggedIn")));
      setUser(JSON.parse(localStorage.getItem("user")));
    }

    setLoading(false); // ⬅️ Mark hydration complete
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        host, isLoggedIn, setIsLoggedIn, deleteUser, user, setUser, loading
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
