import React, { useState, useEffect, useContext } from "react";
import WeekUpload from "./WeekUpload";
// import MyContext from "../../MyContext";
import MyContext from "../../../MyContext";
import Sidebar from "../Sidebar";
import { useParams } from "react-router-dom";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  addDoc,
  query, where, getDocs
} from "firebase/firestore";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
} from "firebase/storage";


const MaterialsScreen = () => {
  const [weeks, setWeeks] = useState([]);
  const { setValue } = useContext(MyContext);
  const { id } = useParams();
  const courseId = id;
  const firestore = getFirestore();

  useEffect(() => {
    const fetchCourseLength = async () => {
      try {
        if (courseId) {
          const courseDocRef = doc(firestore, "courses", courseId);
          const courseDocSnap = await getDoc(courseDocRef);
          const courseData = courseDocSnap.data();
          const { courseLength } = courseData;
          setWeeks(
            Array.from({ length: courseLength }, (_, index) => index + 1)
          );
        }
      } catch (error) {
        console.error("Error fetching course length:", error);
      }
    };
    fetchCourseLength();
  }, [firestore, courseId]);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        if (courseId) {
          const mod = [];
          // Reference to the 'files' collection
          const filesCollectionRef = collection(firestore, "files");

          // Creating a query object to filter documents by course_id
          const q = query(filesCollectionRef, where("course_id", "==", courseId));

          // Executing the query
          const querySnapshot = await getDocs(q);

          // Array to collect the data

          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            const { moduleNo } = doc.data();
            const { weeknum } = doc.data();
            console.log("modNo:"+moduleNo);
            mod.push({
              mnumber: moduleNo,
              weekn: weeknum
            });
          });

          setValue(mod);
          // Do something with the modules array
          // console.log("Total Modules:" + mod.mnumber);
        }
      } catch (error) {
        console.error("Error fetching Modules", error);
      }
    };

    fetchModules();
  }, [courseId]); // Added courseId as a dependency to useEffect

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 bg-gray-100 p-4 overflow-y-auto">
        {weeks.map((weekNumber) => (
          <WeekUpload key={weekNumber} weekNumber={weekNumber} />
        ))}
        {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
          Submit
        </button> */}
      </div>
    </div>
  );
};

export default MaterialsScreen;
