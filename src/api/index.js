import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

//!Fetch Data from firestore
export const fetchServerData = async (setServer) => {
  try {
    const snapshot = await getDocs(collection(db, "servers"));
    const serverData = [];
    const channelData = [];

    for (const serverDoc of snapshot.docs) {
      const serverName = serverDoc.data().name;

      const serverSubcollectionRef = doc(db, "servers", serverName);
      const serverSubcollectionDoc = await getDoc(serverSubcollectionRef);

      if (serverSubcollectionDoc.exists()) {
        const subCollectionData = serverSubcollectionDoc.data().subcollection;

        const channelSnapshot = await getDocs(
          collection(serverSubcollectionRef, "channels")
        );
        const channels = channelSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const server = {
          id: serverName,
          ...serverDoc.data(),
          subcollection: subCollectionData,
        };
        serverData.push(server);
        channelData.push(...channels);
      }
    }

    setServer(serverData);
    // setChannels(channelData);
    return serverData;
  } catch (error) {
    console.log(error.message);
  }
};

//!Create new server
export const createServer = async (
  event,
  setIsLoading,
  selectedImage,
  serverName
) => {
  try {
    event.preventDefault();

    setIsLoading(true);
    //?Saving server image icon in firestore storage
    const storage = getStorage();
    const storageRef = ref(storage, `serverImages/${selectedImage.name}`);
    await uploadBytes(storageRef, selectedImage);

    //?Getting image url from firestore storage
    const imageUrl = await getDownloadURL(storageRef);

    //?Saving server data in firebase firestore
    const fireStore = getFirestore();
    const serverDocRef = doc(fireStore, "servers", serverName);
    const serverDocSnapshot = await getDoc(serverDocRef);

    const serverData = {
      name: serverName,
      image: imageUrl,
    };

    if (serverDocSnapshot.exists()) {
      //?If server document already exists then update it
      await setDoc(serverDocRef, serverData, { merge: true });
    } else {
      //? If document does not exits then create a new one
      await setDoc(serverDocRef, serverData);
    }
  } catch (err) {
    console.log(err);
  }
};

// import { getFirestore, collection, doc, setDoc, getDoc } from "firebase/firestore";

export const createChannel = async (
  event,
  channelName,
  selectedServer,
  setIsLoading
) => {
  try {
    event.preventDefault();
    setIsLoading(true);

    const fireStore = getFirestore();
    const serverRef = doc(fireStore,'servers',selectedServer)
    const channelRef = doc(collection(serverRef,"channels"));
    const serverDocSnapshot = await getDoc(channelRef);

    const channelData = {
      name: channelName,
      created_at: new Date(),
    };

    if (serverDocSnapshot.exists()) {
      await setDoc(channelRef,channelData,{merge:true})
    } else {
      await setDoc(channelRef,channelData)
    }

    setIsLoading(false);
  } catch (error) {
    console.log(error.message);
    setIsLoading(false);
  }
};


export const fetchChannelData = async (channelName, serverName) => {
  try {
    const fireStore = getFirestore();
    const serverRef = doc(fireStore, "servers", serverName);
    const channelSnapshot = await getDoc(
      doc(serverRef, "channels", channelName)
    );

    if (channelSnapshot.exists()) {
      const channelData = {
        id: channelSnapshot.id,
        ...channelSnapshot.data(),
      };
      return [channelData];
    } else {
      return [];
    }
  } catch (error) {
    console.log(error.message);
    return [];
  }
};
