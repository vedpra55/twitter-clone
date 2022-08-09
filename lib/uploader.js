import { db, storage } from "./firebaseClient";
import {
  addDoc,
  doc,
  updateDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import toast from "react-hot-toast";

export const uploadFile = async (file, field, docRef, setProgress, id) => {
  let x = Math.random() * 100;

  const useStorage = storage;
  const storageRef = ref(useStorage, file.name + x);
  const collectionRef = collection(db, docRef);

  const uploadTask = uploadBytesResumable(storageRef, file);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      setProgress(progress);
    },
    (err) => {
      toast.error(err.message);
    },
    async () => {
      const url = await getDownloadURL(uploadTask.snapshot.ref);

      if (field === "bannerImg") {
        await updateDoc(doc(collectionRef, id), {
          bannerImg: url,
        });
      }

      if (field === "img") {
        await updateDoc(doc(collectionRef, id), {
          img: url,
        });
      }

      if (field === "postImg") {
        await updateDoc(doc(collectionRef, id), {
          postImg: url,
        });
      }
    }
  );
};

export const updateProfileData = async (data, userId, setProgress) => {
  try {
    const collectionRef = collection(db, "user");
    await updateDoc(doc(collectionRef, userId), data);
    toast.success("Profile updated successfully");
  } catch (err) {
    toast.error(err.message);
  }
};

export const uploadPost = async (data, postImg, setProgress) => {
  try {
    const collectionRef = collection(db, "post");
    const docRef = await addDoc(collectionRef, data);

    if (postImg) {
      await uploadFile(postImg, "postImg", "post", setProgress, docRef.id);
    }

    toast.success("Post sucessfully added");
  } catch (err) {
    toast.error(err.message);
  }
};
