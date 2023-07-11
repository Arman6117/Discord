import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export const fetchServerDataForCache = async () => {
  try {
    const snapshot = await getDocs(collection(db, "servers"));
    const serverData = [];
    const serverIcons = [];

    for (const serverDoc of snapshot.docs) {
      const serverName = serverDoc.data().name;
      const serverSubCollectionRef = doc(db, "servers", serverName);
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

export const cacheServerIcons = (serverIcons) => {
  serverIcons.forEach((iconUrl) => {
    const img = new Image();
    img.src = iconUrl;
    img.onload = () => {
      // Image loaded and cached successfully

    };
    img.onerror = () => {
      // Error loading image
      
    };
  });
};

// Fetch server data and icons
fetchServerDataForCache().then(({ serverData, serverIcons }) => {
  // Cache server icons
  cacheServerIcons(serverIcons);

  // Use serverData as needed

});
