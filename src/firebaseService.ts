import { app } from "./firebase";
import { getDatabase, ref, set, child, get } from "firebase/database";
import { URL } from "./models/url";

const db = getDatabase(app);

export async function getAllUrls(): Promise<URL[]> {
  const urlsRef = ref(db, "urls");
  const snapshot = await get(urlsRef);
  if (snapshot.exists()) {
    const urls: URL[] = [];
    snapshot.forEach((childSnapshot) => {
      const url: URL = childSnapshot.val();
      url.shortUrl = childSnapshot.key;
      urls.push(url);
    });
    return urls;
  } else {
    return [];
  }
}
