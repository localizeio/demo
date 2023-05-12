import {useEffect, useState} from "react";
import {Editor} from '@localizeio/editor';
import {testedData} from "./helpers/resultData";
import MdProcessor from "@localizeio/md/dist/src/processor";
import FileLoader from "./components/FileLoader";
import CheckBoxSwitch from "./components/CheckBoxSwitch";
import MarkdownView from "./components/MarkdownView";

import './App.css';

const processor =  new MdProcessor()

function App() {
    const {segments, metaData, layout} = testedData

    const [isDevMode, setIsDevMode] = useState(false)
    const [isAllowSourceEdit, setIsAllowSourceEdit] = useState(false)

    const [markDown, setMarkDown] = useState(null)

    const [layoutData, setLayoutData] = useState(layout)
    const [sourceSegments, setSourceSegments] = useState(segments)
    const [targetSegments, setTargetSegments] = useState(segments)

    const onFileLoad = (file) => {
        setMarkDown({source: file.fileText, target: null})
    }

    useEffect(() => {
        if(markDown?.source) {
            const result = processor.parse(markDown.source)
            setSourceSegments(result.segments)
            setTargetSegments(result.segments)
            setLayoutData(result.layout)
        }
    }, [markDown])

    const onSegmentChange = (changedSegment, editableSegmentType, callback) => {
        const segmentState = editableSegmentType === 'target' ? targetSegments : sourceSegments
        const setSegmentState = editableSegmentType === 'target' ? setTargetSegments : setSourceSegments

        const changedSegments = segmentState.map((segment) => {
            if (changedSegment.id === segment.id) {
                callback('success', changedSegment)
                return changedSegment
            } else {
                return segment
            }
        })
        setSegmentState((prevState) => {
            return changedSegments
        })
    }

    return (
    <div className="App">
        <header className='header'>
            <FileLoader onFileLoad={onFileLoad}/>
            <div className='control'>
                <div className='switch'>
                    <span className='switch__title'>Allow edit source</span>
                    <CheckBoxSwitch isChecked={isAllowSourceEdit}
                                    onHandleChange={() => setIsAllowSourceEdit(!isAllowSourceEdit)}/>

                </div>
                <div className='switch'>
                    <span className='switch__title'>Dev Mode</span>
                    <CheckBoxSwitch isChecked={isDevMode}
                                    onHandleChange={() => setIsDevMode(!isDevMode)}/>
                </div>
            </div>
        </header>

        <Editor segments={{target: targetSegments, source: sourceSegments}}
                layout={layoutData}
                metaData={metaData}
                isAllowSourceEdit={isAllowSourceEdit}
                onSegmentChange={onSegmentChange}/>

        {isDevMode && <MarkdownView mdData={markDown} />}
    </div>
  );
}

export default App;
