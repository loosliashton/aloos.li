import { useEffect, useState } from "react";
import { app } from "./firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Button, Table } from "react-bootstrap";

import { URL } from "./models/url";
import * as firebaseService from "./firebaseService";

export default function AdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<any>(null);
  const [urls, setUrls] = useState<URL[]>([]);

  const [newLongUrl, setNewLongUrl] = useState("");
  const [newShortUrl, setNewShortUrl] = useState("");

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
    });
  }

  function addUrl() {
    firebaseService.addUrl(newShortUrl, newLongUrl).then((result) => {
      if (result) {
        getUrls();
        setNewShortUrl("");
        setNewLongUrl("");
      } else alert("Short URL already exists");
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
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              padding: "20px",
              gap: "10px",
            }}
          >
            <input
              type="text"
              value={newShortUrl}
              placeholder="Short URL"
              onChange={(e) => setNewShortUrl(e.target.value)}
            />
            <input
              type="text"
              value={newLongUrl}
              placeholder="Long URL"
              onChange={(e) => setNewLongUrl(e.target.value)}
            />
            <Button onClick={addUrl}>Submit</Button>
          </div>

          <Table bordered hover>
            <thead>
              <tr>
                <th>Short URL</th>
                <th>Long URL</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {urls.map((url, index) => (
                <tr key={index}>
                  <td>{url.shortUrl}</td>
                  <td>{url.longUrl}</td>
                  <td>
                    {url.created
                      ? new Date(url.created).toLocaleTimeString() +
                        " " +
                        new Date(url.created).toLocaleDateString()
                      : ""}
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => {
                        if (window.confirm("Are you sure?"))
                          firebaseService.deleteUrl(url.shortUrl).then(getUrls);
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
}
