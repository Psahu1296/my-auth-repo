import { useEffect, useState } from "react";

import styles from "./App.module.css";
import Login from "./components/Login/Login";
import Products from "./components/Products/Products";

export default function App() {
  const [isLoggedin, setIsLoggedin] = useState<boolean>(false);

  useEffect(() => {
    const isAuthorized = sessionStorage.getItem("isAuthorized")
    if(isAuthorized) {
      setIsLoggedin(true)
      return
    }
    setIsLoggedin(false)
  }, [isLoggedin])
  return (
    <main className={styles.main}>
      {!isLoggedin ? <Login loginFlagHandler={setIsLoggedin} /> : <Products />}
    </main>
  );
}
