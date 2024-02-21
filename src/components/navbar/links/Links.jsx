"use client"

import { useState } from "react";
import styles from "./links.module.css";
import NavLink from "./navLink/Navlink";
import Image from "next/image";

const Links = () => {

    const links = [
        {
            title: "Home",
            path: "/",
        },
        {
            title: "About",
            path: "/about",
        },
        {
            title: "Contact",
            path: "/contact",
        },
        {
            title: "Blog",
            path: "/blog",
        },
    ];

    const [open, setOpen] = useState(false);

    //TEMPORARY
    const session = true;
    const isAdmin = true;

    function handleOpenChange() {
        setOpen((prev) => !prev);
        console.log(open);
    }

    return (
        <div className={styles.container}>
            <div className={styles.links}>
                {links.map((link) => (
                    <NavLink item={link} key={link.title} />
                ))}

                {session ? (
                    <>
                        {isAdmin && <NavLink item={{ title: "Admin", path: "/admin" }} />}
                        <button className={styles.logout}>Logout</button>
                    </>
                ) : (
                    <NavLink item={{ title: "Login", path: "/login" }} />
                )}
            </div>
            <Image className={styles.menuButton} src='/menu.png' alt="" height={30} width={30} onClick={handleOpenChange} />
            {open && (
                <div className={styles.mobileLinks}>
                    {links.map((link) => {
                        return (
                            <NavLink item={link} key={link.title} />
                        )
                    })}
                </div>
            )}
        </div>
    );
};

export default Links