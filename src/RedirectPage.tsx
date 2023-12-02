import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDatabase, ref, get } from "firebase/database";
import { app } from "./firebase";

function RedirectPage() {
  let { shortUrl } = useParams();

  useEffect(() => {
    const getLongUrl = async () => {
      const db = getDatabase(app);
      const urlRef = ref(db, "urls/" + shortUrl);
      const snapshot = await get(urlRef);
      if (snapshot.exists()) {
        return snapshot.val().longUrl;
      } else {
        // Navigate to Not Found page
        window.location.href = "/not-found";
      }
    };

    getLongUrl().then((longUrl) => {
      window.location.href = longUrl;
    });
  }, [shortUrl]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      Redirecting...
    </div>
  );
}

export default RedirectPage;
