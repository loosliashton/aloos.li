const functions = require("firebase-functions");
import * as admin from "firebase-admin";
import * as cors from "cors";

admin.initializeApp();
const db = admin.database();

const corsHandler = cors({ origin: true });

exports.newShortUrl = functions.https.onRequest(
  async (request: any, response: any) => {
    const allowedDomain = 'https://lists.ashtonloosli.com';

    const origin = request.headers.origin || '';
    const referer = request.headers.referer || '';

    if (!origin.includes(allowedDomain) && !referer.includes(allowedDomain)) {
      response.status(403).send('Access denied');
      return;
    }
    
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
      const snapshot = await db.ref("urls/" + shortUrl).get();
      if (!snapshot.exists()) {
        break;
      }
    }
  }
  const urlRef = db.ref("urls/" + shortUrl);
  const snapshot = await urlRef.get();
  if (snapshot.exists()) {
    return "";
  } else {
    await urlRef.set({
      longUrl: longUrl,
      created: new Date().toISOString(),
      method: "api",
    });
    return shortUrl;
  }
}
