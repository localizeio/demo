import './App.css';
import {Editor} from 'editor';
import {testedData} from "./helpers/resultData";
import FileLoader from "./components/FileLoader";
import {useState} from "react";
import CheckBoxSwitch from "./components/CheckBoxSwitch";
import MarkdownView from "./components/MarkdownView";

function App() {
    const {segments, metaData, layout} = testedData

    const [isDevMode, setIsDevMode] = useState(false)
    const [markDown, setMarkDown] = useState(null)
    const [segmentsTest, setSegmentsTest] = useState(segments)

    const onFileLoad = (file) => {
        setMarkDown({source: file.fileText, target: null})
    }

    const onSegmentChange = (changedSegment, callback) => {
        const changedSegments = segmentsTest.map((segment) => {
            if (changedSegment.id === segment.id) {
                callback('success', changedSegment)
                return changedSegment
            } else {
                return segment
            }
        })
        setSegmentsTest((prevState) => {
            return changedSegments
        })
    }

    return (
    <div className="App">
        <header className='header'>
            <FileLoader onFileLoad={onFileLoad}/>
            <div className='switch'>
                <span>Dev Mode</span>
                <CheckBoxSwitch isChecked={isDevMode}
                                onHandleChange={() => setIsDevMode(!isDevMode)}/>
            </div>
        </header>

        <Editor data={{metaData, layout, segments: segmentsTest}}
                onSegmentChange={onSegmentChange}/>

        {isDevMode && <MarkdownView mdData={markDown} />}
    </div>
  );
}

export default App;
