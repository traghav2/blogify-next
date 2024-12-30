'use client'

import { useState } from 'react';
import styles from './search.module.css';
import PostCard from '../../app/(browse)/blog/(postcard)/PostCard';

const SearchBlog = ({ posts, count }) => {

    const [prompt, setPrompt] = useState('');
    const [filteredPosts, setFilteredPosts] = useState([]);

    const handleChange = (e) => {
        setPrompt(e.target.value);
        const searchTerm = e.target.value.toLowerCase();

        if (searchTerm) {
            const newFilteredPosts = posts.filter((post) => {
                return (
                    post.title.toLowerCase().includes(searchTerm) ||
                    post.description.toLowerCase().includes(searchTerm) // Match title and content
                );
            });
            setFilteredPosts(newFilteredPosts);
        } else {
            setFilteredPosts([]); // Reset to empty array if no search term
        }
    };

    return (
        <>
            <div className={styles.container}>
                <input className={(count < 1) && styles.disabled} type="text" placeholder='Search for blogs' onChange={handleChange} />
                <div className={styles.blogContainer}>
                    {count < 1 ? (
                        <h1 className={styles.para}>No Blogs Uploaded</h1>
                    ) : filteredPosts.length > 0 ? ( // Check if filteredPosts has results
                        filteredPosts.map((post) => (
                            <div className={styles.post} key={post.id}>
                                <PostCard post={post} />
                            </div>
                        ))
                    ) : ( // Default: Render all posts 
                        posts.map((post) => (
                            <div className={styles.post} key={post.id}>
                                <PostCard post={post} />
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    )
}

export default SearchBlog