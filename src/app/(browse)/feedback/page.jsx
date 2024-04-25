"use client"

import { useState } from 'react';
import styles from './feedback.module.css';
import { sendFeedback } from '../../../lib/action';

const Feedback = () => {
    const [feedbackDescription, setFeedbackDescription] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await sendFeedback(feedbackDescription);
        response && setIsSubmitted(true);
    };

    return (
        <div className={styles.container}>
            {isSubmitted ? (
                <div className={styles.responseMessage}>Thank you for your feedback!</div>
            ) : (
                <form className={styles.formContainer} onSubmit={handleSubmit}>
                    <label htmlFor="feedback">Feedback:</label>
                    <textarea
                        className={styles.feedback}
                        value={feedbackDescription}
                        
                        onChange={(e) => setFeedbackDescription(e.target.value)}
                        required
                    />

                    <button onClick={handleSubmit} className={styles.submit}>Submit Feedback</button>
                </form>
            )}
        </div>
    );
};

export default Feedback;
