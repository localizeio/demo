import React from 'react';
import cl from './MarkdownView.module.css'

const MarkdownView = ({mdData}) => {

    return (
        <div className={cl.container}>
            <div className={cl.column}>
                <div className={cl.title__container}><b className={cl.title}>SOURCE MD</b></div>
                {mdData?.source && <p>{mdData.source}</p>}
            </div>
            <div className={cl.column}>
                <div className={cl.title__container}><b className={cl.title}>TARGET MD</b></div>
                {mdData?.target && <p>{mdData.target}</p>}
            </div>
        </div>
    );
};

export default MarkdownView;