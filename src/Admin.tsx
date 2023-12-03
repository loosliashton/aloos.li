import { useEffect, useState } from "react";
import { app } from "./firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Button } from "react-bootstrap";

import { URL } from "./models/url";
import * as firebaseService from "./firebaseService";

export default function AdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<any>(null);
  const [urls, setUrls] = useState<URL[]>([]);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        getUrls();
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, [user]);

  function login() {
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("success");
        setUser(userCredential.user);
        getUrls();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getUrls() {
    firebaseService.getAllUrls().then((urls) => {
      setUrls(urls);
      console.log(urls);
    });
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        paddingTop: "100px",
      }}
    >
      {!user ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            padding: "20px",
            borderRadius: "10px",
            backgroundColor: "lightgray",
          }}
        >
          <h1>Admin</h1>
          <input
            style={{ margin: "10px" }}
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            style={{ margin: "10px" }}
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={login}>Sign In</Button>
        </div>
      ) : (
        <div>
          {urls.map((url, index) => (
            <div key={index}>{url.shortUrl}</div>
          ))}
        </div>
      )}
    </div>
  );
}
