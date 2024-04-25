"use client"

import { MessageCircleCode } from 'lucide-react';
import styles from './gemini.module.css';
import { useEffect, useRef, useState } from 'react';
import { generateResponseAI } from '../../lib/action';

const GeminiAI = () => {

    const [clicked, setClicked] = useState(false);
    const [response, setResponse] = useState("");
    const responseContainerRef = useRef(null);

    function handleOnClick() {
        setClicked(!clicked);
    }

    async function handlePrompt(e) {
        const res = await generateResponseAI(e.target.value);
        setResponse(res);

    }
    useEffect(() => {
        if (clicked && response && responseContainerRef.current) {
            responseContainerRef.current.innerHTML = response;

        }
    }, [clicked, response]);
    return (
        <>
            <div className={styles.aiContainer}>
                {clicked && (
                    <div className={styles.chatBotContainer}>
                        <div className={styles.geminiIntro}>
                            <MessageCircleCode className={styles.aiIcon} width={25} height={25} />
                            <p>Select one of these options to get help with blog ideas!</p>
                        </div>
                        <div className={styles.prompts}>
                            <button onClick={handlePrompt} value='Generate five blog ideas maximum in a list using ul and li tags each list item will have a blog idea just return that. also you must not add any separators such as `-` or anything of that sort I just want the html code with blog ideas in it.'>Trending Blog Topics</button>
                        </div>
                        <div ref={responseContainerRef} className={styles.responseContainer}>
                        </div>
                    </div>
                )}
                <button onClick={handleOnClick} className={styles.floatingButton}>
                    <MessageCircleCode className={styles.aiIcon} width={33} height={33} />
                </button>
            </div>
        </>
    )
}

export default GeminiAI;