function AlertButton({ message, children }) {
    return (
      <button className="m-2 p-1 bg-blue-400 rounded-lg w-20" onClick={() => alert(message)}>
        {children}
      </button>
    );
  }
  
  export default function E3() {
    return (
      <div>
        <AlertButton message="Playing!">
          Play Movie
        </AlertButton>
        <AlertButton message="Uploading!">
          Upload Image
        </AlertButton>
      </div>
    );
  }
  