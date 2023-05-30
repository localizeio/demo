import {useState, useEffect} from "react";
import {Editor} from '@localizeio/editor';
import {testedData} from "./helpers/resultData";
import MdProcessor from "@localizeio/md/dist/processor";
import FileLoader from "./components/FileLoader";
import CheckBoxSwitch from "./components/CheckBoxSwitch";
import MarkdownView from "./components/MarkdownView";
import { saveAs } from 'save-files/dist/FileSaver';
import './App.css';

const processor =  new MdProcessor()

function App() {
    const {metaData} = testedData

    const [isDevMode, setIsDevMode] = useState(false)
    const [isAllowSourceEdit, setIsAllowSourceEdit] = useState(false)

    const [markDown, setMarkDown] = useState(null)

    const [layoutData, setLayoutData] = useState(null)
    const [sourceSegments, setSourceSegments] = useState(null)
    const [targetSegments, setTargetSegments] = useState(null)

    const onFileLoad = (file) => {
        setMarkDown({source: file.fileText, target: null})
        if(file.fileText) {
            const result = processor.parse(file.fileText)
            console.log(result)
            setSourceSegments(result.segments)
            setTargetSegments(result.segments)
            setLayoutData(result.layout)
        }
    }

    const setMD = (changedSegments, editableSegmentType) => {
        try {
            const data = {segments: changedSegments, layout: JSON.parse(JSON.stringify(layoutData))}
            const result = processor.stringify(data)
            setMarkDown({...markDown, [editableSegmentType]: result})
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        layoutData && setMD(targetSegments, 'target')
    }, [layoutData])

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
        setSegmentState(changedSegments)
        setMD(changedSegments, editableSegmentType)
    }

    const handleSaveAs = (fileName) => {
        const file = new File([markDown.target], fileName, {type: "text/plain;charset=utf-8"});
        saveAs(file);
    }

    return (
    <div className="App">
        <header className='header'>
            <FileLoader onFileLoad={onFileLoad} isSaveActive={!!markDown?.target} handleSaveAs={handleSaveAs}/>
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
