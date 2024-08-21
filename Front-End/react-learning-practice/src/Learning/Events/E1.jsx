export default function E1() {
    return (
      <Toolbar
        onPlayMovie={() => alert("Playing!")}
        onUploadImage={() => alert("Uploading!")}
      />
    );
  }
  
  function Toolbar({ onPlayMovie, onUploadImage }) {
    return (
      <div>
        {/* <Button onClick={onPlayMovie}>
          Play Movie
        </Button>
        <Button onClick={onUploadImage}>
          Upload Image
        </Button> */}
        <button onClick={onPlayMovie}>Play Movie</button>
        <button onClick={onUploadImage}>Upload Image</button>
      </div>
    );
  }
  
  // function Button({ onClick, children }) {
  //   return <button onClick={onClick}>{children}</button>;
  // }
  