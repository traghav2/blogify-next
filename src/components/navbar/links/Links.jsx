"use client"

import { useState } from "react";
import styles from "./links.module.css";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const Links = () => {

    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    //TEMPORARY
    const session = false;
    const isAdmin = false;

    function handleOpenChange() {
        setOpen((prev) => !prev);
        console.log(open);
    }

    return (
        <div className={styles.container}>
            <div className={styles.links}>
                <Link href={'/about'} className={`${pathname === '/about' && styles.active} ${styles.link}`}>About</Link>
                <Link href={'/contact'} className={`${pathname === '/contact' && styles.active} ${styles.link}`}>Contact</Link>
                <Link href={'/'} className={styles.logo}><Image src='/logo.png' width={80} height={80} className={styles.logo} /></Link>
                <Link href={'/blog'} className={`${pathname === '/blog' && styles.active} ${styles.link}`}>Blog</Link>

                {session ? (
                    <>
                        {isAdmin && <Link href={'/admin'} className={`${pathname === '/admin' && styles.active} ${styles.link}`}>Admin</Link>}
                        <button className={styles.logout}>Logout</button>
                    </>
                ) : (
                    <Link href='/login' className={`${pathname === '/login' && styles.active} ${styles.link}`}>Login</Link>
                )}
            </div>
            <div className={styles.mobileNav}>
                <Link href='/'><Image className={styles.mobileLogo} src='/logo.png' alt="" height={30} width={30} /></Link>
                <Image className={styles.menuButton} src='/menu.png' alt="" height={30} width={30} onClick={handleOpenChange} />
            </div>
            {open && (
                <div className={styles.mobileLinks}>
                    <Link onClick={handleOpenChange} href={'/about'} className={`${pathname === '/about' && styles.active} ${styles.link}`}>About</Link>
                    <Link onClick={handleOpenChange} href={'/contact'} className={`${pathname === '/contact' && styles.active} ${styles.link}`}>Contact</Link>
                    <Link onClick={handleOpenChange} href={'/blog'} className={`${pathname === '/blog' && styles.active} ${styles.link}`}>Blog</Link>
                </div>
            )}
        </div>
    );
};

export default Links