import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';
import { collection, getDocs, query, where, doc, getDoc, getFirestore } from 'firebase/firestore';
import MyContext from "../../MyContext";

const NavigatorLeft = ({ onSelect }) => {
  const { id } = useParams();
  const courseId = id;
  const firestore = getFirestore();
  const [weeks, setWeeks] = useState([]);

  useEffect(() => {
    const fetchCourseLength = async () => {
      try {
        if (courseId) {
          const courseDocRef = doc(firestore, "courses", courseId);
          const courseDocSnap = await getDoc(courseDocRef);
          const courseData = courseDocSnap.data();
          const { courseLength } = courseData;
          setWeeks(Array.from({ length: courseLength }, (_, index) => index + 1));
        }
      } catch (error) {
        console.error("Error fetching course length:", error);
      }
    };
    fetchCourseLength();
  }, [firestore, courseId]);

  return (
    <div className="p-4 bg-white shadow-md w-64 h-screen text-lg overflow-y-auto">
      {weeks.map((week) => (
        <Accordion key={week} title={week} onSelect={onSelect} />
      ))}
    </div>
  );
};

const Accordion = ({ title, onSelect }) => {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const courseId = id;
  const firestore = getFirestore();
  const [modules, setModules] = useState([]);
  const { setAccordianFetched } = useContext(MyContext);
  const { setIsAsk } = useContext(MyContext);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        if (courseId) {
          const modulesArray = [];
          const filesCollectionRef = collection(firestore, "files");
          const q = query(filesCollectionRef, where("course_id", "==", courseId), where("weeknum", "==", parseInt(title)));

          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            const { moduleNo, weeknum } = doc.data();
            modulesArray.push({ mnumber: moduleNo, weekn: weeknum });
          });

          modulesArray.sort((a, b) => a.mnumber - b.mnumber);

          const renumberedModules = modulesArray.map((mod, index) => ({
            ...mod,
            newMnumber: index + 1
          }));

          setLoading(false);
          setModules(renumberedModules);
          setAccordianFetched(true);
        }
      } catch (error) {
        console.error("Error fetching modules:", error);
      }
    };
    fetchModules();
  }, [firestore, courseId, title]);

  return (
    <div className="py-2">
      {loading && <p>Loading...</p>}
      {!loading && (
        <div>
          <button
            onClick={() => setAccordionOpen(!accordionOpen)}
            className="flex justify-between items-center w-full py-2 px-4 bg-blue-100 hover:bg-blue-200 rounded-md shadow-sm"
          >
            <span className="text-blue-900 font-semibold">Week {title}</span>
            {accordionOpen ? <IoIosArrowDown /> : <IoIosArrowForward />}
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out text-slate-600 text-sm ${accordionOpen
              ? "max-h-screen opacity-100 mt-2"
              : "max-h-0 opacity-0"
              }`}
          >
            {modules.map((mod) => (
              <Link
                key={mod.newMnumber}
                to={`/discussionforums/${courseId}/module/${title}/${mod.newMnumber}`}
                onClick={() => {
                  onSelect(mod);
                  setIsAsk(true);
                }}
                className="block py-2 px-4 bg-white hover:bg-gray-100 rounded-md shadow-sm mb-2 text-blue-800"
              >
                Module: {mod.newMnumber}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavigatorLeft;
