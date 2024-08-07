import React, { useState, useContext } from "react";
import Module from "./Module";
import VideoUpload from "./VideoUpload";
import MyContext from "../../../MyContext";

const WeekUpload = ({ weekNumber }) => {
  const { value, setIsEnable, isEnable } = useContext(MyContext);
  const maxMnumber = Array.isArray(value)
    ? value.reduce((max, item) => (item.weekn === weekNumber && item.mnumber > max ? item.mnumber : max), 0)
    : 0;

  const [modules, setModules] = useState([]);

  const handleUploadMaterial = (type) => {
    const currentMaxInModules = modules.reduce((max, module) => (module.weekNo === weekNumber && module.number > max ? module.number : max), 0);
    const newModuleNumber = Math.max(maxMnumber, currentMaxInModules) + 1;
    setModules([...modules, { number: newModuleNumber, materialType: type, weekNo: weekNumber }]);
    setIsEnable(true);
  };

  const handleAddModule = () => {
    setIsEnable(true);
    handleUploadMaterial("module");
  };

  const handleAddVideo = () => {
    setIsEnable(true);
    handleUploadMaterial("video");
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h2 className="text-lg font-semibold mb-2">Week {weekNumber}</h2>
      {/* {Array.isArray(value) && value.length > 0 && (
        <div>
          {value
            .filter(mod => mod.weekn === weekNumber)
            .sort((a, b) => a.mnumber - b.mnumber) // Sort existing modules in numerical order
            .map(mod => (
              <h2 key={`${mod.weekn}-${mod.mnumber}`} className="text-lg font-semibold mb-2">
                Existing Module: {mod.mnumber}
              </h2>
            ))}
        </div>
      )} */}
      <button
        onClick={handleAddModule}
        className={`bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md mr-2 
          ${isEnable ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        Add New Module
      </button>
      <button
        onClick={handleAddVideo}
        className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md mr-2
          ${isEnable ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        Add New Video
      </button>
      {modules
        .filter(material => material.weekNo === weekNumber)
        .map(material => {
          if (material.materialType === "module") {
            return (
              <Module
                key={`${weekNumber}-${material.number}`}
                moduleNumber={material.number}
                weekNo={weekNumber}
                type={material.materialType}
              />
            );
          } else if (material.materialType === "video") {
            return (
              <VideoUpload
                key={`${weekNumber}-${material.number}`}
                videoNumber={material.number}
                weekNo={weekNumber}
                type={material.materialType}
              />
            );
          }
          return null;
        })}
    </div>
  );
};

export default WeekUpload;
