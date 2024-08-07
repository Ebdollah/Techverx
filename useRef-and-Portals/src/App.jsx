import FilePicker from './components/RefPractice/FilePicker/FilePicker.jsx';
import  Appp  from './components/RefPractice/Input/Appp.jsx';
import Player from './components/RefPractice/Player.jsx';
import File from './components/RefPractice/Workout/File.jsx';
import TimerChallenge from './components/TimerChallenge.jsx';

function App() {
  return (
    <>
      {/* <Player /> */}
      {/* <FilePicker/> */}
      {/* <File /> */}
      {/* <Appp /> */}
      <div id="challenges">
        <TimerChallenge title="Easy" targetTime={1}/>
        <TimerChallenge title="Not Easy" targetTime={5}/>
        <TimerChallenge title="Getting tough" targetTime={10}/>
        <TimerChallenge title="Pros Only" targetTime={15}/>
      </div>
    </>
  );
}

export default App;
