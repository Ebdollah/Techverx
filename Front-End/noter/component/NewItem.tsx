// components/AddItem.js
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import db from "../utils/firestore";  // Import the Firestore db instance

const NewItem = () => {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    if (!value.trim()) return;  // Prevent submitting empty value

    setIsLoading(true);
    setError("");  // Reset error before trying to submit

    try {
      const docRef = await addDoc(collection(db, "items"), {
        name: value,
        createdAt: new Date(),
      });
      console.log("Document written with ID: ", docRef.id);  // Log document ID
      setValue("");  // Clear the input field
    } catch (e) {
      setError("Error adding item, please try again.");  // Show error message
      console.error("Error adding document: ", e);
    } finally {
      setIsLoading(false);  // Turn off loading state
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Add New Item</h2>

        {error && (
          <div className="text-red-500 text-center mb-4">{error}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter item name"
              className="w-full px-4 bg-black py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-between items-center">
            <button
              type="submit"
              disabled={isLoading || !value.trim()}
              className={`w-full px-4 py-2 text-white rounded-md ${isLoading || !value.trim() ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
            >
              {isLoading ? 'Adding...' : 'Add Item'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewItem;
