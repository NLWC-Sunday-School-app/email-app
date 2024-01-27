'use client'
import React, { useEffect, useState } from 'react'

import Logo from "../../public/logo-main.png";
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { usePathname } from 'next/navigation';
import "./globals.css";
import { CloseCircle, HambergerMenu, Message, Home } from 'iconsax-react';
import { IoMdMail, IoMdHome } from "react-icons/io";
import { HiTemplate } from "react-icons/hi";
import { CiViewList } from "react-icons/ci";
import { MdMiscellaneousServices } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import { columns } from './data';

export default function Sidebar() {
    // const router = useRouter();
    const pathname = usePathname();
    const [isHovered, setIsHovered] = useState(false);

    const [isSidebarHidden, setIsSidebarHidden] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 768);
            setIsSidebarHidden(isSmallScreen);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [isSmallScreen]);

    const toggleSidebar = () => {
        setIsSidebarHidden(!isSidebarHidden);
    };
    return (
        // <div
        //     style={{
        //         display: isSidebarHidden ? 'none' : 'flex',
        //         position: 'fixed',
        //         top: 0,
        //         left: 0,
        //         width: '200px',
        //         height: '100%',
        //         boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
        //         background: '#ffffff',
        //         zIndex: 999,
        //     }}
        // >
        // </div>
        <div style={{ display: 'flex', flexDirection: 'row-reverse' }} className=''>

            <HambergerMenu
                size="24"
                color="#000"
                style={{}}
                className='hamberger absolute text-white text-4xl top-7 left-2 cursor-pointer md:hidden rounded-sm bg-slate-300'
                onClick={toggleSidebar}
            />

            {!isSidebarHidden && (<div style={{
                backgroundColor: '#1e2442',
                display: 'flex',
                position: isSidebarHidden ? 'fixed' : 'static',
                flexDirection: "column",
                width: "240px",
                border: 0,
                top: 0,
                left: 0,
                // padding: '0px 0vw',
                height: "100vh",
                zIndex: 999,
                boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
            }}
                className='sidebar fixed top-0 bottom-0 lg:left-0 '
            >
                <div style={{ display: "flex", justifyContent: "center", paddingTop: "30px", position: "relative" }}>

                    <CloseCircle
                        size="24"
                        color="#fff"
                        style={{ top: 10, left: 210 }}
                        className='text-white text-4xl top-5 left-4 cursor-pointer md:hidden absolute '
                        onClick={toggleSidebar}
                    />
                </div>
                <div style={{ display: "flex", justifyContent: "end", paddingTop: "30px", flexDirection: 'column', color: "white", alignItems: 'center', fontSize: '14px', gap: '2px', }}>
                    <Link className={pathname == "/app/dashboard" ? "nav-item active" : "nav-item"} href="/app/dashboard"
                    >
                        <div className='nav-item-data' style={{}}>
                            <IoMdHome size={20} />
                            <p style={{}}>Dashboard</p>
                        </div>
                    </Link>
                    <Link className={pathname.startsWith("/app/campaigns/") ? "nav-item active" : "nav-item"} href="/app/campaigns/sent"
                    >
                        <div className='nav-item-data' style={{}}>
                            <IoMdMail size={20} />
                            <p style={{}}>Campaigns</p>
                        </div>
                    </Link>
                    <Link className={pathname.startsWith("/app/templates") ? "nav-item active" : "nav-item"} href="/app/templates"
                    >
                        <div className='nav-item-data' style={{}}>
                            <HiTemplate size={20} />
                            <p style={{}}>Templates</p>
                        </div>
                    </Link>
                    <Link className={pathname.startsWith("/app/mailing-list") ? "nav-item active" : "nav-item"} href="/app/mailing-list"
                    >
                        <div className='nav-item-data' style={{}}>
                            <CiViewList size={20} />
                            <p style={{}}>Mailing List</p>
                        </div>
                    </Link>
                    <Link className={pathname.startsWith("/app/messages") ? "nav-item active" : "nav-item"} href="/app/messages"
                    >
                        <div className='nav-item-data' style={{}}>
                            <IoMdMail size={20} />
                            <p style={{}}>Messages</p>
                        </div>
                    </Link>
                    <Link className={pathname.startsWith("/app/email-services") ? "nav-item active" : "nav-item"} href="/app/email-services"
                    >
                        <div className='nav-item-data' style={{}}>
                            <MdMiscellaneousServices size={20} />
                            <p style={{}}>Email Services</p>
                        </div>
                    </Link>
                    <Link className={pathname.startsWith("/app/users") ? "nav-item active" : "nav-item"} href="/app/users"
                    >
                        <div className='nav-item-data' style={{}}>
                            <CiUser size={20} />
                            <p style={{}}>Manage Users</p>
                        </div>
                    </Link>
                </div>


            </div>
            )}

        </div>
    )
}

// <Image
//     src={Logo}
//     width={150}
//     height={20}
//     alt="Picture of the author"
// />
