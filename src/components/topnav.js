"use client"
import { usePathname, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { TiArrowSortedDown } from "react-icons/ti";
import { RxAvatar } from "react-icons/rx";
import { FiLogOut } from "react-icons/fi";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import Link from 'next/link';
import nProgress from 'nprogress';
import { useRouter } from 'next/navigation';
import { Router } from 'next/router';
// import NextProgress from "next-progress";

export default function TopNav() {
    const pathname = usePathname();
    const [name, setName] = useState('');

    const router = useRouter();

    const searchParams = useSearchParams()

    useEffect(() => {
        const url = `${pathname}?${searchParams}`
        // console.log(url)
        // console.log(Router.events)
        // You can now use the current URL
        // ...
    }, [pathname, searchParams])


    // nProgress.start();
    // nProgress.set(0.5);
    // setTimeout(() => {
    //     nProgress.done()
    // }, 5000)
    const isMatchingPathname = (pathname) => {
        const regex = /^\/app\/campaigns\/\d+\/status$/;
        return regex.test(pathname);
    };
    const isMatchingPathnameReport = (pathname) => {
        const regex = /^\/app\/campaigns\/\d+\/report$/;
        return regex.test(pathname);
    };

    useEffect(() => {
        if (pathname == "/app/dashboard") {
            setName("Dashboard")
        }
        if (pathname == "/app/campaigns") {
            setName("Campaigns")
        }
        if (pathname == "/app/campaigns/create") {
            setName("Create Campaign")
        }
        if (pathname == "/app/mailing-list") {
            setName("Mailing List")
        }
        if (pathname == "/app/messages") {
            setName("Messages")
        }

        if (isMatchingPathname(pathname)) {
            setName("Campaign Status")
        }
        if (isMatchingPathnameReport(pathname)) {
            setName("Campaign Report")
        }
        if (pathname == "/app/templates") {
            setName("Templates")
        }
        if (pathname.startsWith("/app/templates")) {
            setName("Templates")
        }
        if (pathname.startsWith("/app/campaigns")) {
            setName("Campaigns")
        }
        if (pathname == "/app/email-services") {
            setName("Email Services")
        }
        if (pathname == "/app/settings") {
            setName("Settings")
        }
        if (pathname == "/app/users") {
            setName("Manage Users")
        }
        if (pathname == "/app/profile") {
            setName("Profile")
        }

    }, [pathname])

    // <NextProgress />
    return (
        <div style={{
            width: "100%", display: 'flex', justifyContent: 'space-between', backgroundColor: "#fff",

            padding: "20px 35px",
        }}>
            <h2 style={{ fontSize: "25px", color: '#555' }}>{name}</h2>
            <div style={{ display: 'flex', gap: '3px', justifyContent: 'center', alignItems: 'center' }}>
                <RxAvatar />
                <p style={{ paddingLeft: '10px' }}>Fola</p>
                <Dropdown >
                    <DropdownTrigger>
                        <Button isIconOnly={false} radius="full" size="sm" variant="light">
                            <TiArrowSortedDown />
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Example with disabled actions" disabledKeys={["edit", "delete"]}>
                        <DropdownItem key="profile">

                            <Link style={{ display: 'flex', gap: '5px', alignItems: 'center' }} href={'/app/profile'}>
                                <RxAvatar />
                                <p>My Profile</p>
                            </Link>
                        </DropdownItem>
                        <DropdownItem key="logout">
                            <Link style={{ display: 'flex', gap: '5px', alignItems: 'center' }} href={'/auth/login'}>
                                <FiLogOut />
                                <p>Log out</p>
                            </Link>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>

            </div>
        </div>
    )
}
