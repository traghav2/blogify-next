"use client";

import Link from "next/link";
import { handleGoogleLogin, login } from "../../../../lib/action";
import styles from './form.module.css'
import Image from "next/image";
import { useFormState } from "react-dom";

const LoginForm = () => {

    const [state, formAction] = useFormState(login, undefined);

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
                <input className={styles.input} type="text" placeholder="Password" name="password" />
                <button className={styles.formButton}>Login</button>
            </form>
            <p className={styles.registerLink}>Don&apos;t have an account? <Link href="/register"><span>Register here</span></Link></p>
        </div>
    )
}

export default LoginForm