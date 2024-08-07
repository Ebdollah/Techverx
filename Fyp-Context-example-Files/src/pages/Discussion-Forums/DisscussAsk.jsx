import { useParams } from "react-router-dom";
import React, { useState, useEffect, useContext } from 'react';
import { collection, setDoc, updateDoc, arrayUnion, getDocs, query, where, doc, getDoc, getFirestore } from 'firebase/firestore';
import MyContext from "../../MyContext";

const Modal = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
        <button className="absolute top-2 right-2 text-gray-500" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

function DisscussAsk() {
  const [formData, setFormData] = useState({ title: '', question: '' });
  const [documentID, setDocumentID] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { weekNumber, moduleNumber } = useContext(MyContext);
  const { id } = useParams();
  const firestore = getFirestore();

  useEffect(() => {
    const fetchDocID = async () => {
      try {
        if (id && weekNumber && moduleNumber) {
          const filesCollectionRef = collection(firestore, "files");
          const q = query(
            filesCollectionRef,
            where("course_id", "==", id),
            where("weeknum", "==", parseInt(weekNumber)),
            where("moduleNo", "==", parseInt(moduleNumber))
          );
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            setDocumentID(querySnapshot.docs[0].id);
          } else {
            console.log("No documents found matching the query.");
          }
        }
      } catch (error) {
        console.error("Error fetching materials:", error);
        setDocumentID(null);
      }
    };

    fetchDocID();
  }, [firestore, id, weekNumber, moduleNumber]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const commentData = {
        title: formData.title,
        question: formData.question,
        timestamp: Date.now()
      };

      if (documentID) {
        const docRef = doc(firestore, 'comments', documentID);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          await updateDoc(docRef, { items: arrayUnion(commentData) });
        } else {
          await setDoc(docRef, { items: [commentData] });
        }

        setFormData({ title: '', question: '' });
        setIsModalVisible(false);
      } else {
        console.error("Document ID not found. Cannot proceed with submission.");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <>
      <button
        className="ml-4 py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75"
        onClick={() => setIsModalVisible(true)}
      >
        Ask
      </button>
      <Modal isVisible={isModalVisible} onClose={() => setIsModalVisible(false)}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="question" className="block text-sm font-medium text-gray-700">
              Question
            </label>
            <textarea
              id="question"
              name="question"
              value={formData.question}
              onChange={handleInputChange}
              className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
              rows="4"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setIsModalVisible(false)}
              className="py-2 px-4 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75 mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default DisscussAsk;
