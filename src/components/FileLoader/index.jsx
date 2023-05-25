import React, { useRef, useState} from 'react';
import cl from './FileLoader.module.css';

const FileLoader= ({onFileLoad, isSaveActive, handleSaveAs}) => {
    const [fileState, setFileState] = useState(null)

    const fileInputRef = useRef()

    const onFileLoadAsync = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = async (e) => {
                resolve(e.target.result)
            }
            reader.onerror = async (e) => {
                reject(reader.error)
            }
            reader.readAsText(file)
        })
    }


    const onInputFileChange = async (e) => {
        e.preventDefault()
        const targetFile = e.target.files[0]

        onFileLoadAsync(targetFile).then((text) => {
            const result = {
                file: targetFile,
                fileText: text
            }
            setFileState(result)
            onFileLoad(result)
        })
    }

    const onSaveAs = () => {
        handleSaveAs(fileState?.file?.name)
    }

    const onOpenFile = () => {
        fileInputRef.current.click()
    }

    return (
        <div className={cl.cont}>
            <div>
                <span className={cl.fileReaderButton} onClick={onOpenFile}>Choose file</span>
                <input
                    ref={fileInputRef}
                    className={cl.file}
                    type='file'
                    value={undefined}
                    onChange={onInputFileChange}
                />
                {fileState?.file?.name && <span className={cl.fileName}>{fileState?.file?.name}</span>}
            </div>
            {isSaveActive && <div>
                {fileState?.file?.name &&
                  <span className={cl.fileReaderButton} onClick={onSaveAs}>Save as...</span>}
            </div>}
        </div>
    );
};

export default FileLoader;