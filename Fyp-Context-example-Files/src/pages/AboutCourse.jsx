import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from './StudentSidebar';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import MyContext from '../MyContext';

const CourseInfo = () => {
  const { id } = useParams();
  const [courseName, setCourseName] = useState('');
  const [loading, setLoading] = useState(true);
  const [courseInfo, setCourseInfo] = useState('');
  const [certificateGenerated, setCertificateGenerated] = useState(false);
  const { userId } = useContext(MyContext); // Use context to get user ID

  useEffect(() => {
    const fetchCourseName = async () => {
      try {
        const courseDoc = await getDoc(doc(db, 'courses', id));
        if (courseDoc.exists()) {
          setCourseName(courseDoc.data().courseName);
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching course name:', error);
      }
    };

    const fetchCourseInfo = async () => {
      try {
        const courseInfoDoc = await getDoc(doc(db, 'courseinfo', id));
        if (courseInfoDoc.exists()) {
          setCourseInfo(courseInfoDoc.data());
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching course info:', error);
      }
    };

    const checkCertificateStatus = async () => {
      try {
        if (!userId) {
          console.log('User ID is not found in context');
          return;
        }
        console.log('User ID:', userId);
        const userEnrollmentDoc = await getDoc(doc(db, 'userEnrollments', userId));
        if (userEnrollmentDoc.exists()) {
          const userEnrollmentData = userEnrollmentDoc.data();
          if (userEnrollmentData[id] && userEnrollmentData[id].completed) {
            setCertificateGenerated(true);
          }
        }
      } catch (error) {
        console.error('Error checking certificate status:', error);
      }
    };

    fetchCourseName();
    fetchCourseInfo();
    checkCertificateStatus();
    setLoading(false);
  }, [id, userId]);

  const handleDownloadCertificate = () => {
    const link = document.createElement('a');
    link.href = '/path/to/random/certificate/file.pdf'; // Update this to the path of your random file
    link.download = 'Course_Completion_Certificate.pdf';
    link.click();
  };

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24"></div>
        </div>
      ) : (
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex-1 bg-gray-100 p-4">
            <div className="bg-white shadow-md py-4 px-6 flex justify-between items-center mb-4">
              <h1 className="text-xl font-semibold">{courseName} - Course Info</h1>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-2">Course Description</h2>
              {courseInfo && <p className="mb-3 ml-3 font-normal text-gray-700 dark:text-gray-400">{courseInfo.description}</p>}
              <h2 className="text-lg font-semibold mt-4 mb-2">Instructor's Note</h2>
              {courseInfo && <p className="mb-3 ml-3 font-normal text-gray-700 dark:text-gray-400">{courseInfo.instructorNote}</p>}
              {certificateGenerated && (
                <div className="mt-4">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    onClick={handleDownloadCertificate}
                  >
                    Download Certificate
                  </button>
                </div>
              )}
            </div>
            {/* Additional content can be added here */}
          </div>
        </div>
      )}
    </>
  );
};

export default CourseInfo;
