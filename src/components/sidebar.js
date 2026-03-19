'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { CloseCircle, HambergerMenu } from 'iconsax-react';
import { IoMdMail, IoMdHome } from "react-icons/io";
import { HiTemplate } from "react-icons/hi";
import { CiViewList, CiUser } from "react-icons/ci";
import { MdMiscellaneousServices } from "react-icons/md";
import "./globals.css";

const navLinks = [
    { name: 'Dashboard', href: '/app/dashboard', icon: IoMdHome },
    { name: 'Campaigns', href: '/app/campaigns/sent', icon: IoMdMail, match: '/app/campaigns/' },
    { name: 'Templates', href: '/app/templates', icon: HiTemplate, match: '/app/templates' },
    { name: 'Mailing List', href: '/app/mailing-list', icon: CiViewList, match: '/app/mailing-list' },
    { name: 'Messages', href: '/app/messages', icon: IoMdMail, match: '/app/messages' },
    { name: 'Email Services', href: '/app/email-services', icon: MdMiscellaneousServices, match: '/app/email-services' },
    { name: 'Manage Users', href: '/app/users', icon: CiUser, match: '/app/users' },
];

export default function Sidebar() {
    const pathname = usePathname();
    const [isSidebarHidden, setIsSidebarHidden] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const small = window.innerWidth < 1024;
            setIsSmallScreen(small);
            if (!small) setIsSidebarHidden(false);
            else setIsSidebarHidden(true);
        };

        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => setIsSidebarHidden(!isSidebarHidden);

    const isActive = (link) => {
        if (link.match) return pathname.startsWith(link.match);
        return pathname === link.href;
    };

    return (
        <>
            <button
                onClick={toggleSidebar}
                className="fixed top-6 left-4 z-[1001] lg:hidden p-2 bg-white soft-shadow rounded-xl border border-slate-100"
            >
                <HambergerMenu size="24" className="text-slate-600" />
            </button>

            <AnimatePresence mode="wait">
                {(!isSidebarHidden || !isSmallScreen) && (
                    <motion.aside
                        initial={isSmallScreen ? { x: -300 } : { x: 0 }}
                        animate={{ x: 0 }}
                        exit={{ x: -300 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-y-0 left-0 z-[1000] w-64 bg-[#1e2442] p-6 flex flex-col h-screen lg:static lg:translate-x-0"
                    >
                        <div className="flex items-center justify-between mb-10">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center soft-shadow">
                                    <span className="text-white font-bold text-xl">E</span>
                                </div>
                                <h1 className="text-white font-bold text-xl tracking-tight">Epistle</h1>
                            </div>
                            <button onClick={toggleSidebar} className="lg:hidden text-slate-400 hover:text-white transition-colors">
                                <CloseCircle size="24" />
                            </button>
                        </div>

                        <nav className="flex-1 flex flex-col gap-2">
                            {navLinks.map((link) => {
                                const active = isActive(link);
                                const Icon = link.icon;
                                return (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className={`nav-item ${active ? 'active' : ''}`}
                                    >
                                        <Icon size={20} className={active ? 'text-white' : 'text-slate-400'} />
                                        <span className="font-medium">{link.name}</span>
                                        {active && (
                                            <motion.div
                                                layoutId="active-pill"
                                                className="absolute right-0 w-1.5 h-6 bg-white rounded-l-full"
                                                transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
                                            />
                                        )}
                                    </Link>
                                );
                            })}
                        </nav>

                        <div className="mt-auto pt-6 border-t border-white/10">
                            <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                                <p className="text-xs text-slate-400 font-medium mb-1">PRO PLAN</p>
                                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                                    <div className="bg-indigo-500 h-full w-3/4 rounded-full" />
                                </div>
                                <p className="text-xs text-slate-300 mt-2">7,500 / 10,000 emails</p>
                            </div>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>
        </>
    );
}
