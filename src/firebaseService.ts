import { app } from "./firebase";
import { getDatabase, ref, set, get } from "firebase/database";
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
    return urls.sort((a, b) => {
      if (a.created && b.created) {
        return new Date(b.created).getTime() - new Date(a.created).getTime();
      } else {
        return 0;
      }
    });
  } else {
    return [];
  }
}

export async function addUrl(
  shortUrl: string,
  longUrl: string
): Promise<boolean> {
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
    return false;
  } else {
    await set(urlRef, {
      longUrl: longUrl,
      created: new Date().toISOString(),
      method: "local",
    });
    return true;
  }
}

export async function deleteUrl(shortUrl: string): Promise<boolean> {
  const urlRef = ref(db, "urls/" + shortUrl);
  const snapshot = await get(urlRef);
  if (snapshot.exists()) {
    await set(urlRef, null);
    return true;
  } else {
    return false;
  }
}

export async function checkApiKey(key: string): Promise<boolean> {
  const snapshot = await get(ref(db, "apiKeys/" + key));
  return snapshot.exists();
}