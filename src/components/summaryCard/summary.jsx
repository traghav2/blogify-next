"use client";

import { useEffect, useRef, useState } from 'react';
import styles from './summary.module.css';
import { ChevronDown } from 'lucide-react';
import { generateResponseAI } from '../../lib/action';
const Summary = ({postDescription}) => {
    const [toggle, setToggle] = useState(false);
    const [response, setResponse] = useState("Loading...");
    const responseContainerRef = useRef(null);
    
    function handleOnClick() {
        setToggle(!toggle);
        if(!toggle){
            setResponse("Loading...");
        }
        handlePrompt();
    }

    async function handlePrompt() {
        const value = `Given a description of a blog post: ${postDescription},  If the description looks gibberish or containing less than 50 words generate html like <p>Content too short no summary could be generated!</p>. Else Provide a bulleted list summarizing the key points of the blog in a list using ul and li tags each list item will have a key point just return that. also you must not add any separators such as - or anything of that sort I just want the html code with blog points in it. Also try to stay as accurate as possible as key points impact user experience.`;
        const res = await generateResponseAI(value);
        setResponse(res);
    }
    useEffect(() => {
        if (toggle && response && responseContainerRef.current) {
            responseContainerRef.current.innerHTML = response;
        }
    }, [toggle, response]);


    return (
        <div className={styles.container} onClick={handleOnClick}>
            <div className={styles.summaryContainer}>
                <h2>Key Points</h2>
                <ChevronDown className={styles.summaryToggleIcon} height={30} width={30} />
            </div>
            {toggle && (
                <div className={styles.summaryContent} ref={responseContainerRef}>
                    {response}
                </div>
            )}
        </div>
    )
}

export default Summary;