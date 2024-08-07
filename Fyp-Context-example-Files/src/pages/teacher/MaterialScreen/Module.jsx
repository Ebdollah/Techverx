import React, { useState, useEffect, useContext } from "react";
import MyContext from "../../../MyContext";
// import Sidebar from "../Sidebar";
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


const Module = ({ moduleNumber, weekNo, existmod, type }) => {
    const [file, setFile] = useState(null);
    const [percent, setPercent] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [uploaded, setUploaded] = useState(false);
    const [downloadURL, setDownloadURL] = useState("");
    const [error, setError] = useState(null); // State for handling errors
    const [description, setDescription] = useState(""); // Move description state and setDescription function here
    const { setIsEnable } = useContext(MyContext);
    const { value } = useContext(MyContext);
    const { id } = useParams();
    const courseId = id;
    const firestore = getFirestore();
    // const mod = [];
  
    // file: Stores the file object to be uploaded.
    // percent: Tracks the percentage of the file upload completed.
    // uploading: A boolean flag to indicate if an upload is currently in progress.
    // uploaded: A boolean flag to indicate if the file has been successfully uploaded.
    // downloadURL: Stores the URL to access the uploaded file.
    // error: Used to store and display any errors that might occur during the file upload process.
  
    // useEffect(() => {
    //   const fetchModules = async () => {
    //       try {
    //           if (courseId) {
    //               // Reference to the 'files' collection
    //               const filesCollectionRef = collection(firestore, "files");
  
    //               // Creating a query object to filter documents by course_id
    //               const q = query(filesCollectionRef, where("course_id", "==", courseId));
  
    //               // Executing the query
    //               const querySnapshot = await getDocs(q);
  
    //               // Array to collect the data
  
    //               querySnapshot.forEach((doc) => {
    //                   // doc.data() is never undefined for query doc snapshots
    //                   // console.log(doc.id, " => ", doc.data());
    //                   const {moduleNo} = doc.data();
    //                   const {weeknum} = doc.data();
    //                   mod.push({
    //                       mnumber: moduleNo,
    //                       weekn: weeknum
    //                   });
    //               });
  
    //               setValue(mod);
    //               // Do something with the modules array
    //               // console.log("Total Modules:" + mod);
    //           }
    //       } catch (error) {
    //           console.error("Error fetching Modules", error);
    //       }
    //   };
  
    //   fetchModules();
    // }, [courseId]); // Added courseId as a dependency to useEffect
  
    const handleUpload = async () => {
      if (uploaded) {
        alert("Upload already completed."); //checking if the file has already been uploaded
        return;
      }
  
      const storage = getStorage();
      if (!file) {
        alert("Please choose a file first!"); //check If no file is selected
        return;
      }
  
      if (!description) {
        alert("Please enter a description for the file!"); //check If no description is entered
        return;
      }
  
      const storageRef = ref(storage, `/files/${file.name}`); //reference to Firebase Storage, where the file will be saved
      const uploadTask = uploadBytesResumable(storageRef, file); //Start upload of the file
      setUploading(true); //and set uploading to true
  
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setPercent(percent);
        },
        (err) => {
          console.log(err);
          setUploading(false);
          setError("Upload failed. Please try again."); // Set error message
        },
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          console.log("Download URL:", url);
          // console.log("Exist mod" + existmod);
          setDownloadURL(url);
          setUploading(false);
          setUploaded(true);
  
          // Save description and download URL to Firestore
          try {
            const firestore = getFirestore();
            const fileRef = await addDoc(collection(firestore, "files"), {
              description,
              downloadURL: url,
              course_id: courseId,
              moduleNo: moduleNumber,
              weeknum: weekNo,
              materialType: type,
            });
            setIsEnable(false);
            console.log("File document added with ID: ", fileRef.id);
          } catch (error) {
            console.error("Error adding file document: ", error);
            setError("Failed to save file information."); // Set error message
          }
        }
      );
    };
  
    const handleFileChange = (e) => {
      setFile(e.target.files[0]);
    };
  
    const handleDescriptionChange = (e) => {
      setDescription(e.target.value);
    };
  
    return (
      <div className="bg-white shadow-md rounded-lg p-4 mb-4">
        <h2 className="text-lg font-semibold mb-2">Module {moduleNumber}</h2>
        {/* <div>
        {value.map((mod) => (
          <h2 className="text-lg font-semibold mb-2">already Module: {mod.mnumber}</h2>
        ))}
      </div> */}
        <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)} // Update description state
        placeholder="Content Description Here"
        className="w-full mb-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-800"
      />
        <input type="file" onChange={handleFileChange} className="mb-2" />
        <button
          onClick={handleUpload}
          disabled={uploading || uploaded}
          className={`bg-indigo-800 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md mb-2 ${uploading || uploaded ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          Upload
        </button>
        <div className="h-4 w-full bg-gray-200">
          <div
            className="h-full bg-indigo-600"
            style={{ width: `${percent}%` }}
          ></div>
        </div>
        <p className="mt-2">{percent}%</p>
        {uploaded && (
          <p className="mt-2">
            Download URL:{" "}
            <a href={downloadURL} target="_blank" rel="noopener noreferrer">
              {downloadURL}
            </a>
          </p>
        )}
        {error && <p className="text-red-500">{error}</p>}{" "}
        {/* Display error message if there's an error */}
      </div>
    );
  };

export default Module;