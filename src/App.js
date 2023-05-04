import './App.css';
import {Editor} from '@localizeio/editor';
import {testedData} from "./helpers/resultData";
import FileLoader from "./components/FileLoader";
import {useState} from "react";
import CheckBoxSwitch from "./components/CheckBoxSwitch";

function App() {
    const [isDevMode, setIsDevMode] = useState(false)

    const {segments, metaData, layout} = testedData

    const [segmentsTestOne, setSegmentsTestOne] = useState(segments)
    const [segmentsTestTwo, setSegmentsTestTwo] = useState(segments)

    const onFileLoad = (file) => {
        console.log(file)
    }

    const findAndChangeSegment = (changedSegment, callback, state, setState) => {
        const changedSegments = state.map((segment) => {
            if (changedSegment.id === segment.id) {
                callback('success', changedSegment)
                return changedSegment
            } else {
                return segment
            }
        })
        setState((prevState) => {
            return changedSegments
        })
    }

    const onSegmentChangeOne = (changedSegment, callback) => {
        findAndChangeSegment(changedSegment, callback, segmentsTestOne, setSegmentsTestOne)
    }
    const onSegmentChangeTwo = (changedSegment, callback) => {
        findAndChangeSegment(changedSegment, callback, segmentsTestTwo, setSegmentsTestTwo)
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
        <div className='editors__container'>
            <Editor data={{metaData, layout, segments: segmentsTestOne}}
                    title='EDITOR 1'
                    onSegmentChange={onSegmentChangeOne}
                    isDevMode={isDevMode}/>
            {isDevMode && <Editor data={{metaData, layout, segments: segmentsTestTwo}}
                                  title='EDITOR 2'
                                  onSegmentChange={onSegmentChangeTwo}
                                  isDevMode={isDevMode}/>}
        </div>
    </div>
  );
}

export default App;
