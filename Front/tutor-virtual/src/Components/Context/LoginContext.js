import { createContext, useState, useLayoutEffect } from "react";
export const LoginContext = createContext();

export function LogginWrapper({ children }) {
  const [login, setLogin] = useState(false);
  useLayoutEffect(() => {
    const id = localStorage.getItem("user_id");
    if (id) {
      setLogin(true);
    }
    console.log("valor de eso es", login);
  }, []);
  return (
    <LoginContext.Provider value={{ login, setLogin }}>
      {children}
    </LoginContext.Provider>
  );
}
