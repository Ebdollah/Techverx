import { useParams } from "react-router-dom";
import React, { useState, useEffect, useContext } from 'react';
import { collection, setDoc, addDoc, arrayUnion, updateDoc, doc, getDoc, getFirestore } from 'firebase/firestore';
import MyContext from "../../MyContext";

function MaterialAsk({documentID}) {
    const [formData, setFormData] = useState({ title: '', question: '' });
    const { id } = useParams();
    const courseId = id;
    const firestore = getFirestore();
    const userId = localStorage.getItem('user.uid');
    const {useridd} = useContext(MyContext);




    useEffect(() => {
        // Check if the document exists, if not, create it
        const checkAndCreateDocument = async () => {
            const docRef = doc(firestore, 'comments', documentID);
            const docSnap = await getDoc(docRef);
            // alert("user id is: " + useridd)
            if (!docSnap.exists()) {
                await setDoc(docRef, {CourseID: courseId, items: [] }); // Create the document with an empty 'items' array
                console.log('Document created successfully!');
            }
        };

        checkAndCreateDocument();
    }, [firestore]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const docRef = doc(firestore, 'comments', documentID);
            // const userId = localStorage.getItem('user.uid');
            await updateDoc(docRef, {
                items: arrayUnion({
                    user: useridd,
                    title: formData.title,
                    question: formData.question,
                    timestamp: new Date(), // Add a timestamp field
                })
            });
            console.log('Document updated successfully!');

            // Clear the form
            setFormData({ title: '', question: '' });

        } catch (error) {
            console.error('Error updating document: ', error);
        }
    };

    return (
        <div className='max-w-md mx-auto bg-white p-6 rounded-md shadow-md'>
            <h2 className='text-2xl font-semibold mb-4'>Ask a Question</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label htmlFor='title' className='block text-sm font-medium text-gray-700'>
                        Title
                    </label>
                    <input
                        type='text'
                        id='title'
                        name='title'
                        value={formData.title}
                        onChange={handleChange}
                        className='mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                        required
                    />
                </div>
                <div className='mb-4'>
                    <label htmlFor='question' className='block text-sm font-medium text-gray-700'>
                        Question
                    </label>
                    <textarea
                        id='question'
                        name='question'
                        value={formData.question}
                        onChange={handleChange}
                        rows='4'
                        className='mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                        required
                    ></textarea>
                </div>
                <button
                    type='submit'
                    className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md'
                >
                    Submit
                </button>
            </form>
        </div>
    );

}

export default MaterialAsk;


// import React, { useState } from 'react';
// import { collection, getDocs, query, where, doc, getDoc,getFirestore } from 'firebase/firestore';


// function MaterialAsk({documentID}) {
//   const [formData, setFormData] = useState({ title: '', question: '' });
//   const { id } = useParams();
//   const courseId = id;
//   const firestore = getFirestore();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission here, e.g., send data to Firestore
//     console.log('Form Data:', formData);
//   };

//   return (
//     <div className='max-w-md mx-auto bg-white p-6 rounded-md shadow-md'>
//       <h2 className='text-2xl font-semibold mb-4'>Ask a Question</h2>
//       <form onSubmit={handleSubmit}>
//         <div className='mb-4'>
//           <label htmlFor='title' className='block text-sm font-medium text-gray-700'>
//             Title
//           </label>
//           <input
//             type='text'
//             id='title'
//             name='title'
//             value={formData.title}
//             onChange={handleChange}
//             className='mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
//             required
//           />
//         </div>
//         <div className='mb-4'>
//           <label htmlFor='question' className='block text-sm font-medium text-gray-700'>
//             Question
//           </label>
//           <textarea
//             id='question'
//             name='question'
//             value={formData.question}
//             onChange={handleChange}
//             rows='4'
//             className='mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
//             required
//           ></textarea>
//         </div>
//         <button
//           type='submit'
//           className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md'
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// }

// export default MaterialAsk;
