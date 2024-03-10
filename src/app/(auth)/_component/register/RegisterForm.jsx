"use client";

import Link from "next/link";
import { useFormState } from "react-dom";
import { handleGoogleLogin, register } from "../../../../lib/action";
import styles from './form.module.css'
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
const RegisterForm = () => {

    const [state, formAction] = useFormState(register, undefined); 

    const router = useRouter();

    useEffect(() => {
        state?.success && router.push('/login');
    }, [state?.success, router])

    return (
        <div className={styles.wrapper}>
            <div className={styles.logoDiv}>
                <Link href='/'><Image src="/logo.png" alt="Logo" height={100} width={100} /></Link>
                <h1 className={styles.logoText}>Blogify</h1>
            </div>
            <form className={styles.googleLogin} action={handleGoogleLogin}>
                <button className={styles.googleButton}>Continue with Google</button>
            </form>
            {state?.error && <div className={styles.error}><p>{state.error}</p></div>}
            <form className={styles.bottomForm} action={formAction}>
                <input className={styles.input} type="text" placeholder="Username" name="username" />
                <input className={styles.input} type="text" placeholder="Email" name="email" />
                <input className={styles.input} type="text" placeholder="Password" name="password" />
                <input className={styles.input} type="text" placeholder="Confirm Password" name="confirmPassword" />
                <button className={styles.formButton}>Register</button>
            </form>
            <p className={styles.loginLink}>Already have an account? <Link href="/login"><span>Login here</span></Link></p>
        </div>
    )
}

export default RegisterForm