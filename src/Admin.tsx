import { useEffect, useState } from "react";
import { app } from "./firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Button } from "react-bootstrap";

export default function AdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  });

  function login() {
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("success");
        setUser(userCredential.user);
      })
      .catch((error) => {
        console.log(error);
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
          
        </div>
      )}
    </div>
  );
}
