import { createContext, useState, useEffect } from "react";
export const LoginContext = createContext();

export function LogginWrapper({ children }) {
  const [login, setLogin] = useState(false);

  useEffect(() => {
    const id = localStorage.getItem("user_id");
    if (id) {
      setLogin(true);
    }
  }, []);

  useEffect(() => {
    console.log("valor de eso es", login);
  }, [login]);

  return (
    <LoginContext.Provider value={{ login, setLogin }}>
      {children}
    </LoginContext.Provider>
  );
}
