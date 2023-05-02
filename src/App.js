import './App.css';
import {Editor} from '@localizeio/editor';
import {testedData} from "./helpers/resultData";
import FileLoader from "./components/FileLoader";
import {useState} from "react";

function App() {
    const {segments, metaData, layout} = testedData
    const [segmentsData, setSegmentsData] = useState(segments)

    const onFileLoad = (file) => {
        console.log(file)
    }

    const onSegmentChange = (changedSegment, callback) => {
        setSegmentsData(
            segments.map((segment) => {
                if (changedSegment.id === segment.id) {
                    callback('success', changedSegment)
                    return changedSegment
                } else {
                    return segment
                }
            })
        )
    }

    return (
    <div className="App">
      <FileLoader onFileLoad={onFileLoad}/>
      <Editor data={testedData} onSegmentChange={onSegmentChange}/>
    </div>
  );
}

export default App;
