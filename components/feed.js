import { SparklesIcon } from "@heroicons/react/outline";
import Input from "./input";
import Post from "./post";

import { useState } from "react";

import toster from "react-hot-toast";

import {
  collection,
  orderBy,
  query,
  onSnapshot,
  getDoc,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";

import { db } from "../lib/firebaseClient";

import { useEffect } from "react";

export default function Feed({ user }) {
  const [postsData, setPostsData] = useState();

  const collectionRef = collection(db, "post");
  const q = query(collectionRef, orderBy("timeStamp", "desc"));

  useEffect(() => {
    onSnapshot(q, (snapshot) => {
      const res = [];
      snapshot.forEach((doc) => {
        res.push({ ...doc.data(), id: doc.id });
      });
      setPostsData(res);
    });
  }, []);

  async function handleDelete(docId) {
    try {
      const collectionRef = collection(db, "post");
      await deleteDoc(doc(collectionRef, docId));
      toster.success("Post deleted sucessfully");
    } catch (err) {
      toster.error(err.message);
    }
  }

  return (
    <div className="xl:ml-[375px] xl:min-w-[576px] sm:ml-[73px] border-l border-r  border-gray-200  flex-grow max-w-xl">
      <div className="flex py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
        <h2 className="text-lg sm:text-xl font-bold cursor-pointer">Home</h2>
        <div className="hoverEffect flex items-center justify-center px-0 ml-auto w-9 h-9">
          <SparklesIcon className="h-5" />
        </div>
      </div>
      <Input user={user} />
      {postsData?.map((data, i) => (
        <Post user={user} key={i} post={data} handleDelete={handleDelete} />
      ))}
    </div>
  );
}
