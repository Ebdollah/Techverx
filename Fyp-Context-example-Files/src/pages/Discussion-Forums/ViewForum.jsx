import React, { useState, useContext, useEffect } from "react";
import Discusspopup from "./Discusspopup";
import MyContext from "../../MyContext";
import { collection, updateDoc, doc, getDocs, query, getFirestore } from 'firebase/firestore';

function ViewForum({ title, content, documentid }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [replyCount, setReplyCount] = useState(0);
  const [replyArray, setReplyArray] = useState([]);
  const { useridd } = useContext(MyContext);

  const fetchReplies = async () => {
    try {
      const firestore = getFirestore();
      const commentsQuery = query(collection(firestore, 'comments'));
      const commentsSnapshot = await getDocs(commentsQuery);

      for (const commentDoc of commentsSnapshot.docs) {
        const commentData = commentDoc.data().items;
        const matchingItemIndex = commentData.findIndex(item => item.title === title);

        if (matchingItemIndex !== -1) {
          const repliesArray = commentData[matchingItemIndex].replies || [];
          setReplyArray(repliesArray);
          setReplyCount(repliesArray.length);
          break; // Assuming there's only one match needed
        }
      }
    } catch (error) {
      console.error('Error fetching replies:', error);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleReplyClick = () => {
    setShowForm(true);
  };

  useEffect(() => {
    fetchReplies();
  }, [title, replyArray.length]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const firestore = getFirestore();
      const commentsQuery = query(collection(firestore, 'comments'));
      const commentsSnapshot = await getDocs(commentsQuery);

      for (const commentDoc of commentsSnapshot.docs) {
        const commentData = commentDoc.data();
        const itemsArray = commentData.items || [];
        const matchingItemIndex = itemsArray.findIndex(item => item.title === title);

        if (matchingItemIndex !== -1) {
          const updatedItem = { ...itemsArray[matchingItemIndex] };
          updatedItem.replies = updatedItem.replies || [];
          updatedItem.replies.push({
            user: useridd,
            reply: replyText,
            timestamp: new Date()
          });

          const updatedItemsArray = [...itemsArray];
          updatedItemsArray[matchingItemIndex] = updatedItem;

          const commentDocRef = doc(firestore, 'comments', commentDoc.id);
          await updateDoc(commentDocRef, { items: updatedItemsArray });
          setReplyArray(updatedItem.replies);
          setReplyCount(updatedItem.replies.length);
        }
      }

      console.log('Replies added successfully.');
    } catch (error) {
      console.error('Error adding reply:', error);
    }

    setReplyText('');
    setShowForm(false);
  };

  return (
    <div className="mx-auto bg-white p-6 rounded-lg shadow-md mb-5">
      <div className="mb-4">
        {!isModalOpen ?
          <button
            onClick={toggleModal}
            className="text-indigo-800 hover:underline font-semibold text-xl mb-2"
          >
            {title}
          </button> : null
        }
        {isModalOpen && (
          <Discusspopup
            title={title}
            content={content}
            onClick={toggleModal}
            repliez={replyArray}
          />
        )}
        <p className="text-gray-600">{content}</p>
      </div>
      <div className="flex justify-between items-center">
        {showForm ? (
          <form onSubmit={handleSubmit} className="mb-4">
            <input
              type="text"
              placeholder="Type your reply"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="border border-gray-300 rounded-md px-2 py-1 mr-2"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded-md">Submit</button>
          </form>
        ) : (
          <button onClick={handleReplyClick} className="text-indigo-800 hover:underline mr-2">Reply</button>
        )}
        {replyCount > 0 ?
          <p className="text-gray-500">{replyCount} others replied</p> :
          <p className="text-gray-500">0 replied</p>
        }
      </div>
    </div>
  )
}

export default ViewForum;
