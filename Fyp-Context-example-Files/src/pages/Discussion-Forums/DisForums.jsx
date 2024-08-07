import React, { useContext, useState } from 'react';
import Forms from '../../components/Forms.js';
import NavigatorLeft from "./NavigatorLeft.jsx";
import ContentRight from "./ContentRight.js";
import MyContext from '../../MyContext.js';
import DisscussAsk from './DisscussAsk.jsx';

function DisForums() {
  const { accordianFetched } = useContext(MyContext);
  const [selectedMenu, setSelectedMenu] = useState(null);

  return (
    <div className='h-screen bg-blue-100'>
      <div className='flex'>
        <div>
          <NavigatorLeft onSelect={setSelectedMenu} />
        </div>
        <div className='flex flex-col w-full mx-8'>
          <div className='mb-4'>
            <h1 className='text-3xl mb-4 mt-12'>Discussion Forums</h1>
            <div className='flex'>
              {/* <Forms isInput={false} title={false} /> */}
              {/* <DisscussAsk /> */}
            </div>
          </div>
          <div>
            {accordianFetched && <ContentRight selected={selectedMenu} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DisForums;
