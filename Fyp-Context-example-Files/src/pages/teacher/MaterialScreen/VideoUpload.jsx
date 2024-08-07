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
const VideoUpload = ({videoNumber, weekNo, type}) => {
  const [formData, setFormData] = useState({ title: '', link: '' });
  const [submitted, setSubmitted] = useState(false);
  const { setIsEnable } = useContext(MyContext);
  const { value } = useContext(MyContext);
    const { id } = useParams();
    const courseId = id;
  // console.log("moduleNo: ", moduleNumber);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    try {
      const firestore = getFirestore();
      const fileRef = await addDoc(collection(firestore, "files"), {
        course_id: courseId,
        VideoTitle: formData.title,
        VideoLink: formData.link,
        moduleNo: videoNumber,
        weeknum: weekNo,
        materialType: type,
      });
      setSubmitted(true);
      setIsEnable(false);
      console.log("File document added with ID: ", fileRef.id);
    } catch (error) {
      console.error("Error adding file document: ", error);
      // setError("Failed to save file information."); // Set error message
    }
    // You can add form submission logic here
  };

  return (
    <div className="max-w-md mx-auto mt-8">
    <h2 className="text-lg font-semibold mb-2">Module {videoNumber}</h2>
    {/* <div>
        {value.map((mod) => (
          <h2 className="text-lg font-semibold mb-2">already Module: {mod.mnumber}</h2>
        ))}
      </div> */}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Video Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Enter Video Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Link of Video
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="link"
            type="text"
            placeholder="Enter link of video"
            name="link"
            value={formData.link}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
      {submitted && <p className="text-green-500 text-center">Video uploaded successfully!</p>}
    </div>
  );
};

export default VideoUpload;
