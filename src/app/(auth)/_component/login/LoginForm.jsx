"use client";

import { handleGoogleLogin, login } from "../../../../lib/action";
import Link from "next/link";
import Image from "next/image";
import styles from './form.module.css'
import { useState } from "react";
import { useRouter } from "next/navigation";

const LoginForm = () => {

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState(null); // State to handle errors
    const [isLoading, setIsLoading] = useState(false); // Loading state

    const router = useRouter();

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null); // Clear errors on submit

        const result = await login(formData.username, formData.password);
        if (!result?.error) {
            router.push('/');
        } else { setError(result.error); }
        setIsLoading(false);
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.logoDiv}>
                <Link href='/'><Image src="/logo.png" alt="Logo" height={100} width={100} /></Link>
                <h1 className={styles.logoText}>Blogify</h1>
            </div>
            <form className={styles.googleLogin} action={handleGoogleLogin}>
                <button className={styles.googleButton}>Continue with Google</button>
            </form>
            {error && <div className={styles.error}><p>{error}</p></div>}
            <form className={styles.bottomForm} action={handleSubmit}>
                <input className={styles.input} type="text" value={formData.username} placeholder="Username" name="username" onChange={handleChange} />
                <input className={styles.input} type="text" value={formData.password} placeholder="Password" name="password" onChange={handleChange} />
                <button onClick={handleSubmit} className={styles.formButton} disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
            </form>
            <p className={styles.registerLink}>Don't have an account? <Link href="/register"><span>Register here</span></Link></p>
        </div>
    )
};


export default LoginForm