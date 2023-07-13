import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { registerRoute } from "workbox-routing";
import { CacheFirst, NetworkFirst } from "workbox-strategies";
import { precacheAndRoute } from "workbox-precaching";

export const fetchServerDataForCache = async () => {
  try {
    const snapshot = await getDocs(collection(db, "servers"));
    const serverData = [];
    const serverIcons = [];

    for (const serverDoc of snapshot.docs) {
      const serverName = serverDoc.data().name;
      const serverSubCollectionRef = doc(db, "servers", serverName, serverName);
      const serverSubCollectionDoc = await getDoc(serverSubCollectionRef);

      if (serverSubCollectionDoc.exists()) {
        const subCollectionData = serverSubCollectionDoc.data().subcollection;
        const server = {
          id: serverName,
          ...serverDoc.data(),
          subcollection: subCollectionData,
        };
        serverData.push(server);
      }

      const iconUrl = serverDoc.data().image;
      serverIcons.push(iconUrl);
    }

    return { serverData, serverIcons };
  } catch (error) {
    console.log(error.message);
    return { serverData: [], serverIcons: [] };
  }
};

export const cacheServerIcons = async (serverIcons) => {
  try {
    const cache = await caches.open("server-icons");

    // Cache each icon URL
    await Promise.all(
      serverIcons.map(async (iconUrl) => {
        const response = await fetch(iconUrl);
        await cache.put(iconUrl, response);
      })
    );

    console.log("Server icons cached successfully.");
  } catch (error) {
    console.log("Error caching server icons:", error.message);
  }
};

// Fetch server data and cache icons
this.addEventListener("install", (event) => {
  event.waitUntil(
    fetchServerDataForCache().then(({ serverData, serverIcons }) => {
      // Cache server icons
      cacheServerIcons(serverIcons);

      // Use serverData as needed

      // Skip waiting and activate the service worker immediately
      this.skipWaiting();
    })
  );
});

// Cleanup old caches
this.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => {
            // Filter out caches that you want to keep
          })
          .map((cacheName) => {
            return caches.delete(cacheName);
          })
      );
    })
  );
});

// Precache and route the assets using Workbox
precacheAndRoute(this.__WB_MANIFEST);

// Configure caching strategies for specific routes
registerRoute(
  // Cache strategy for server icons
  ({ url }) => {
    return url.pathname.includes("/servers/") && url.pathname.endsWith("/image.jpg");
  },
  new CacheFirst()
);

registerRoute(new NetworkFirst());
