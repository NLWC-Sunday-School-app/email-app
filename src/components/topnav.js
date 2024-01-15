"use client"
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function TopNav() {
    const pathname = usePathname();
    const [name, setName] = useState('');
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
        if (pathname == "/app/email-services") {
            setName("Email Services")
        }
        if (pathname == "/app/settings") {
            setName("Settings")
        }

    }, [pathname])
    return (
        <div style={{
            width: "100%", display: 'flex', justifyContent: 'space-between', backgroundColor: "#fff",

            padding: "20px 35px",
        }}>
            <h2 style={{ fontSize: "25px", color: '#555' }}>{name}</h2>
            <div style={{ display: 'flex', gap: '3px' }}>
                <p>F</p>
                <p>FOla</p>
                <p>F</p>
            </div>
        </div>
    )
}
