import './App.css';
import {Editor} from '@localizeio/editor';
import {testedData} from "./helpers/resultData";

function App() {
  return (
    <div className="App">
      <Editor data={testedData}/>
    </div>
  );
}

export default App;
