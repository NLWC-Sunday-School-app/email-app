"use client"
import React from "react";
import { 
    Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, 
    Pagination, Dropdown, DropdownTrigger, Button, DropdownMenu, 
    Input, DropdownItem, Chip, useDisclosure 
} from "@nextui-org/react";
import { VerticalDotsIcon } from "./VerticalDotsIcon";
import { SearchIcon } from "./SearchIcon";
import { ChevronDownIcon } from "./ChevronDownIcon";
import Link from "next/link";

export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const statusColorMap = {
    subscribed: "success",
    unsubscribed: "danger",
    DRAFT: "warning",
    QUEUED: "default",
    Mailgun: "primary",
    sending: "warning",
    sent: "success",
    cancelled: "danger",
    SENT: "success",
    OPENED: "secondary",
};

export default function CustomTable({ 
    headers, data, columns, page, setPage, rowsPerPage, setRowsPerPage, 
    searchText, setSearchText, pages, setPages, renderActionCell = null, 
    dataIsLink = [], customBottomContent = null, customTopContent = null,
    hidePagination = false
}) {
    const headerColumns = columns;
    const { onOpen } = useDisclosure();

    const onRowsPerPageChange = React.useCallback((e) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, [setRowsPerPage, setPage]);

    const onSearchChange = React.useCallback((value) => {
        if (value) {
            setPage(1);
            if (setSearchText) setSearchText(value);
        } else {
            if (setSearchText) setSearchText("");
        }
    }, [setPage, setSearchText]);

    const renderCell = React.useCallback((user, columnKey) => {
        const keys = columnKey.split('.');
        const cellValue = keys.reduce((result, key) => (result && typeof result === 'object' && key in result) ? result[key] : undefined, user);

        switch (columnKey) {
            case "status":
                return (
                    <Chip 
                        className="capitalize border-none font-semibold text-[10px]" 
                        color={statusColorMap[user.status] || 'default'} 
                        size="sm" 
                        variant="flat"
                    >
                        {cellValue}
                    </Chip>
                );
            case "actions":
                if (renderActionCell) return renderActionCell(user);
                return (
                    <Dropdown className="bg-white border border-slate-200 soft-shadow rounded-xl">
                        <DropdownTrigger>
                            <Button isIconOnly radius="full" size="sm" variant="light">
                                <VerticalDotsIcon className="text-slate-400" />
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Actions" className="p-2">
                            <DropdownItem key="view">View Details</DropdownItem>
                            <DropdownItem key="edit">Edit</DropdownItem>
                            <DropdownItem key="delete" className="text-danger" color="danger">Delete</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                );
            default:
                if (dataIsLink.includes(columnKey)) {
                    const selectedColumn = columns.find(item => item.uid === columnKey);
                    if (selectedColumn) {
                        const linkKey = selectedColumn.linkKey || 'id';
                        const linkValue = linkKey.split('.').reduce((res, k) => (res && res[k]) ? res[k] : undefined, user);
                        const link = selectedColumn.link.replace(/{([^}]+)}/g, linkValue);
                        return <Link href={link} className="text-indigo-600 hover:text-indigo-800 font-medium underline underline-offset-4 decoration-indigo-200 transition-colors">{cellValue}</Link>;
                    }
                }
                return <span className="text-slate-600 font-medium">{cellValue}</span>;
        }
    }, [columns, dataIsLink, renderActionCell]);

    const topContent = React.useMemo(() => {
        return (
            <div className="flex flex-col gap-4 mb-2">
                {customTopContent}
                <div className="flex justify-between items-center gap-4">
                    <Input
                        isClearable
                        className="w-full sm:max-w-[320px]"
                        placeholder="Search records..."
                        size="sm"
                        startContent={<SearchIcon className="text-slate-400" />}
                        value={searchText}
                        variant="bordered"
                        onClear={() => setSearchText("")}
                        onValueChange={onSearchChange}
                        classNames={{
                            inputWrapper: "border-slate-200 hover:border-indigo-400 focus-within:!border-indigo-500 transition-colors bg-white rounded-xl shadow-sm",
                            input: "text-slate-600 placeholder:text-slate-400"
                        }}
                    />
                    <div className="flex items-center gap-3">
                        <span className="text-slate-400 text-xs font-medium">Show</span>
                        <select
                            className="bg-white border border-slate-200 rounded-lg text-slate-600 text-xs font-bold py-1 px-2 outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all cursor-pointer"
                            onChange={onRowsPerPageChange}
                            value={rowsPerPage}
                        >
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                        </select>
                    </div>
                </div>
            </div>
        );
    }, [searchText, onSearchChange, onRowsPerPageChange, rowsPerPage, customTopContent, setSearchText]);

    const bottomContent = React.useMemo(() => {
        if (hidePagination) return null;
        if (customBottomContent) return customBottomContent;
        return (
            <div className="flex items-center justify-between px-2 py-4 border-t border-slate-100">
                <span className="text-slate-400 text-xs font-medium">
                    Showing {data.length} of {pages * rowsPerPage} entries
                </span>
                <Pagination
                    isCompact
                    showShadow
                    showControls
                    classNames={{
                        cursor: "bg-indigo-600 text-white font-bold",
                        item: "text-slate-400 hover:text-indigo-600 font-medium bg-transparent",
                        prev: "bg-white border border-slate-200 text-slate-600",
                        next: "bg-white border border-slate-200 text-slate-600",
                    }}
                    page={page}
                    total={pages}
                    variant="flat"
                    onChange={setPage}
                />
            </div>
        );
    }, [page, pages, setPage, customBottomContent, data.length, rowsPerPage, hidePagination]);

    return (
        <Table
            aria-label="Records table"
            bottomContent={bottomContent}
            bottomContentPlacement="outside"
            topContent={topContent}
            topContentPlacement="outside"
            hoverable
            classNames={{
                wrapper: "bg-white soft-shadow rounded-2xl border border-slate-100 p-0 overflow-hidden",
                th: "bg-slate-50/50 text-slate-500 font-bold text-xs uppercase tracking-wider py-4 border-b border-slate-100 px-6",
                td: "py-4 px-6 border-b border-slate-50 last:border-0",
                tr: "hover:bg-slate-50/50 transition-colors cursor-default"
            }}
        >
            <TableHeader columns={headerColumns}>
                {(column) => (
                    <TableColumn
                        key={column.uid}
                        align={column.uid === "actions" ? "center" : "start"}
                    >
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody emptyContent={"No records found"} items={data}>
                {(item) => (
                    <TableRow key={item.id}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
