import React from 'react';
function FilePicker() {
    const picker = React.useRef();
    
  return (
    <div id="app">
      <p>Please select an image</p>
      <p>
        <input ref={picker} data-testid="file-picker" type="file" accept="image/*" />
        <button onClick={()=>picker.current.click()}>Pick Image</button>
      </p>
    </div>
  );
}

export default FilePicker;
