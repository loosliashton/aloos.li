const functions = require("firebase-functions");
import { getDatabase, ref, set, get } from "firebase/database";
import { initializeApp } from "firebase/app";
import * as cors from "cors";

const firebaseConfig = {
  apiKey: "AIzaSyDIvc9NKDhEr_B5MuIVCT0GCrew6AYTpKE",
  authDomain: "aloosli-88777.firebaseapp.com",
  projectId: "aloosli-88777",
  storageBucket: "aloosli-88777.appspot.com",
  messagingSenderId: "999327732075",
  appId: "1:999327732075:web:5ff70c9bd004c51176fc2e",
  measurementId: "G-F48KLC9MQD",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const corsHandler = cors({ origin: true });

exports.newShortUrl = functions.https.onRequest(
  async (request: any, response: any) => {
    corsHandler(request, response, async () => {
      const { shortUrl, longUrl } = request.query;
      const result = await addUrl(shortUrl, longUrl);

      if (result) {
        response.status(200).send({ shortUrl: result });
      } else {
        response.status(400).send("Short URL already exists");
      }
    });
  }
);

async function addUrl(shortUrl: string, longUrl: string): Promise<string> {
  if (!shortUrl) {
    while (true) {
      shortUrl = Math.random().toString(36).substring(2, 5);
      const snapshot = await get(ref(db, "urls/" + shortUrl));
      if (!snapshot.exists()) {
        break;
      }
    }
  }
  const urlRef = ref(db, "urls/" + shortUrl);
  const snapshot = await get(urlRef);
  if (snapshot.exists()) {
    return "";
  } else {
    await set(urlRef, {
      longUrl: longUrl,
      created: new Date().toISOString(),
      method: "api",
    });
    return shortUrl;
  }
}
