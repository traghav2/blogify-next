"use client"

import { handleLogout } from "../../../lib/action";
import { useState } from "react";
import styles from "./links.module.css";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const Links = ({session}) => {
    // console.log(session);
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    function handleOpenChange() {
        setOpen((prev) => !prev);
    }

    return (
        <div className={styles.container}>
            <div className={styles.links}>
                <Link href={'/about'} className={`${pathname === '/about' && styles.active} ${styles.link}`}>About</Link>
                <Link href={'/create'} className={`${pathname === '/create' && styles.active} ${styles.link}`}>Create</Link>
                <Link href={'/'} className={styles.logo}><Image src='/logo.png' width={80} height={80} className={styles.logo} /></Link>
                <Link href={'/blog'} className={`${pathname === '/blog' && styles.active} ${styles.link}`}>Blog</Link>

                {session?.user ? (
                    <>
                        {session.user?.isAdmin && <Link href={'/admin'} className={`${pathname === '/admin' && styles.active} ${styles.link}`}>Admin</Link>}
                        <Link href={'/dashboard'} className={`${pathname === '/dashboard' && styles.active} ${styles.link}`}>Dashboard</Link>
                        <form action={handleLogout}>
                            <button className={styles.logout}>Logout</button>
                        </form>
                    </>
                ) : (
                    <Link href='/login' className={`${pathname === '/login' && styles.active} ${styles.link}`}>Login</Link>
                )}
            </div>
            <div className={styles.mobileNav}>

                <Image className={styles.menuButton} src='/menu.png' alt="" height={30} width={30} onClick={handleOpenChange} />
            </div>
            {open && (
                <div className={styles.mobileLinks}>
                    <Link onClick={handleOpenChange} href='/'><Image className={styles.mobileLogo} src='/logo.png' alt="site-logo" height={60} width={60} /></Link>
                    <Link onClick={handleOpenChange} href={'/about'} className={`${pathname === '/about' && styles.active} ${styles.link}`}>About</Link>
                    <Link onClick={handleOpenChange} href={'/create'} className={`${pathname === '/create' && styles.active} ${styles.link}`}>Create</Link>
                    <Link onClick={handleOpenChange} href={'/blog'} className={`${pathname === '/blog' && styles.active} ${styles.link}`}>Blog</Link>
                    <Link onClick={handleOpenChange} href={'/dashboard'} className={`${pathname === '/dashboard' && styles.active} ${styles.link}`}>Dashboard</Link>
                    {session?.user ? (
                    <>
                        {session.user?.isAdmin && <Link href={'/admin'} className={`${pathname === '/admin' && styles.mobActive} ${styles.link}`}>Admin</Link>}
                        <form action={handleLogout}>
                            <button className={styles.logout}>Logout</button>
                        </form>

                    </>
                ) : (
                    <Link href='/login' className={`${pathname === '/login' && styles.active} ${styles.link}`}>Login</Link>
                )}
                </div>
            )}
        </div>
    );
};

export default Links