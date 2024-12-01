import Image from "next/image";
import AddItem from '../component/AddItem';
import NewItem from "@/component/NewItem";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import db from "../utils/firestore";  // Import the Firestore db instance


export default function Home() {
  return (
    <div >
      <h1 className="text-2xl font-bold mb-4 text-red-800">App</h1>
      {/* <h1>Helo</h1> */}
      {/* <AddItem /> */}
    </div>
  );
}
