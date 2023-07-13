import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  orderBy,
  query,
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
//!Create new Channel
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
    const serverRef = doc(fireStore, "servers", selectedServer);

    // Create a new channel document within the subcollection "channels" of the selected server
    const channelCollectionRef = collection(serverRef, "channels");
    const channelRef = doc(channelCollectionRef, channelName);

    const channelData = {
      name: channelName,
      created_at: new Date(),
    };

    await setDoc(channelRef, channelData);

    setIsLoading(false);
  } catch (error) {
    console.log(error.message);
    setIsLoading(false);
  }
};

//!Fetch channel data
export const fetchChannelData = async (setChannel) => {
  try {
    const serverSnapshot = await getDocs(collection(db, "servers"));
    const channelData = [];

    for (const serverDoc of serverSnapshot.docs) {
      const serverName = serverDoc.data().name;

      const channelCollectionRef = collection(
        db,
        "servers",
        serverName,
        "channels"
      );
      const channelSnapshot = await getDocs(channelCollectionRef);

      channelSnapshot.forEach((channelDoc) => {
        const channelName = channelDoc.data().name;
        const channel = {
          id: channelName,
          ...channelDoc.data(),
        };
        channelData.push(channel);
      });
    }

    setChannel(channelData);
    return channelData;
  } catch (error) {
    console.log(error.message);
  }
};

//!Send message to channels
export const sendMessage = async (
  event,
  channelId,
  inputRef,
  serverName,
  channelName,
  displayName,
  photoURL,
  email
) => {
  try {
    event.preventDefault();
    if (inputRef.current.value.trim() !== "") {
      const message = inputRef.current.value.trim();
      inputRef.current.value = "";

      if (channelId) {
        const messageRef = collection(
          db,
          "servers",
          serverName,
          "channels",
          channelName,
          "messages"
        );

        await addDoc(messageRef, {
          message,
          timeStamp: new Date(),
          user: displayName,
          userImage: photoURL,
          email: email,
        });
      }
    }
  } catch (err) {
    console.log(err.message);
  }
};

//!Fetching the messages
export const getMessages = async (serverName, channelName) => {
  try {
    const messageRef = collection(
      db,
      "servers",
      serverName,
      "channels",
      channelName,
      "messages"
    );
    const messageQuery = query(messageRef, orderBy("timeStamp"));

    const snapshot = await getDocs(messageQuery);

    const messages = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return messages;
  } catch (error) {
    console.log(error.message);
    return []
  }
};

//!Delete message
export const deleteMessage = async (serverName, channelName, messageId) => {
  try {
    await deleteDoc(
      doc(db, "servers", serverName, "channels", channelName, "messages", messageId)
    );
    console.log("Message deleted successfully");
  } catch (error) {
    console.log("Error deleting message:", error);
    throw error;
  }
};