"use client"
import { usePathname, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { TiArrowSortedDown } from "react-icons/ti";
import { RxAvatar } from "react-icons/rx";
import { FiLogOut } from "react-icons/fi";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, User } from "@nextui-org/react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';

export default function TopNav() {
    const { loggedinUser } = useAuth()
    const pathname = usePathname();
    const [title, setTitle] = useState('Dashboard');

    const isMatchingPathname = (path) => /^\/app\/campaigns\/\d+\/status$/.test(path);
    const isMatchingPathnameReport = (path) => /^\/app\/campaigns\/\d+\/report$/.test(path);

    useEffect(() => {
        if (pathname === "/app/dashboard") setTitle("Overview");
        else if (pathname === "/app/campaigns/create") setTitle("New Campaign");
        else if (pathname.startsWith("/app/campaigns")) setTitle("Campaigns");
        else if (pathname.startsWith("/app/templates")) setTitle("Design Templates");
        else if (pathname.startsWith("/app/mailing-list")) setTitle("Audience");
        else if (pathname === "/app/messages") setTitle("Messages");
        else if (pathname === "/app/email-services") setTitle("Connections");
        else if (pathname === "/app/users") setTitle("Team Management");
        else if (pathname === "/app/profile") setTitle("Personal Settings");
        else if (isMatchingPathname(pathname)) setTitle("Delivery Status");
        else if (isMatchingPathnameReport(pathname)) setTitle("Analytics Report");
    }, [pathname]);

    return (
        <motion.header 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="sticky top-0 z-[990] w-full flex items-center justify-between px-8 py-4 bg-white/80 backdrop-blur-lg border-b border-slate-200/60"
        >
            <div className="flex flex-col">
                <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-0.5">Epistle Platform</p>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{title}</h2>
            </div>

            <div className="flex items-center gap-6">
                <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                        <button className="flex items-center gap-3 p-1 pr-3 rounded-full hover:bg-slate-100 transition-colors group">
                            <User
                                name={loggedinUser?.first_name || "User"}
                                description={loggedinUser?.email || "Manager"}
                                avatarProps={{
                                    src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
                                    className: "w-8 h-8 rounded-lg"
                                }}
                                className="transition-transform group-hover:scale-105"
                            />
                            <TiArrowSortedDown className="text-slate-400 group-hover:text-slate-600 transition-colors" />
                        </button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Profile Actions" variant="flat" className="p-2">
                        <DropdownItem key="profile" textValue="Profile">
                            <Link className="flex items-center gap-2 w-full text-slate-700" href='/app/profile'>
                                <RxAvatar className="text-lg" />
                                <span className="font-medium">Account Settings</span>
                            </Link>
                        </DropdownItem>
                        <DropdownItem key="logout" className="text-danger" color="danger" textValue="Logout">
                            <Link className="flex items-center gap-2 w-full" href='/auth/login'>
                                <FiLogOut className="text-lg" />
                                <span className="font-medium">Sign Out</span>
                            </Link>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </motion.header>
    )
}
