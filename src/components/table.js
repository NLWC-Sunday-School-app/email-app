
// "use client"
import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Dropdown, DropdownTrigger, Button, DropdownMenu, Input, DropdownItem, User, Chip, ModalFooter, Checkbox, ModalBody, ModalHeader, ModalContent, Modal, useDisclosure, Textarea } from "@nextui-org/react";
import { VerticalDotsIcon } from "./VerticalDotsIcon";
import { SearchIcon } from "./SearchIcon";
import { PlusIcon } from "./PlusIcon";
import { ChevronDownIcon } from "./ChevronDownIcon";
import { statusOptions } from "./data";
import Link from "next/link";


export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
// export function EditModal({ isOpen, onOpen, onOpenChange }) {

//     const validateEmail = (value) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);



//     const [toEmail, setToEmail] = React.useState("");
//     // const [isToEmailInvalid, setIsToEmailInvalid] = React.useState(false);

//     const [fromEmail, setFromEmail] = React.useState("");
//     // const [isFromEmailInvalid, setIsFromEmailInvalid] = React.useState(false);

//     const [subject, setSubject] = React.useState("");
//     // const [isSubjectInvalid, setIsSubjectInvalid] = React.useState(false);

//     const [description, setDescription] = React.useState("");
//     // const [isDescriptionInvalid, setIsDescriptionInvalid] = React.useState("");

//     const isToEmailInvalid = React.useMemo(() => {
//         if (toEmail === "") return false;

//         return validateEmail(toEmail) ? false : true;
//     }, [toEmail]);

//     const isFromEmailInvalid = React.useMemo(() => {
//         if (fromEmail === "") return false;

//         return validateEmail(fromEmail) ? false : true;
//     }, [fromEmail]);

//     const isSubjectInvalid = React.useMemo(() => {
//         if (!subject) return false;
//         return false;
//     }, [subject]);

//     const isDescriptionInvalid = React.useMemo(() => {
//         if (description === "") return false;
//         return false
//     }, [description]);


//     const enableSubmit = React.useMemo(() => {
//         if (description && subject && fromEmail && toEmail && !isToEmailInvalid && !isFromEmailInvalid) return true;
//         return false
//     }, [description, subject, fromEmail, toEmail]);

//     const submitModal = ({ onClose }) => {
//         onClose()
//     }
//     return (
//         <Modal
//             isOpen={isOpen}
//             onOpenChange={onOpenChange}
//             placement="center"
//             scrollBehavior="inside"
//         >
//             <ModalContent>
//                 {(onClose) => (
//                     <div>
//                         <ModalHeader className="flex flex-col gap-1">Test Email Service: Test</ModalHeader>
//                         <ModalBody>
//                             <Input
//                                 isRequired
//                                 autoFocus
//                                 label="To Email"
//                                 labelPlacement="outside"
//                                 // placeholder="Enter your email"
//                                 variant="bordered"
//                                 value={toEmail}
//                                 onChange={(e) => setToEmail(e.target.value)}
//                                 isInvalid={isToEmailInvalid}
//                                 errorMessage={isToEmailInvalid ? "Please enter a valid email" : ''}
//                             />
//                             <Input
//                                 isRequired
//                                 label="From Email"
//                                 labelPlacement="outside"
//                                 // placeholder="Enter your email"
//                                 variant="bordered"
//                                 value={fromEmail}
//                                 onChange={(e) => setFromEmail(e.target.value)}
//                                 isInvalid={isFromEmailInvalid}
//                                 errorMessage={isFromEmailInvalid ? "Please enter a valid email" : ''}
//                             />
//                             <Input
//                                 isRequired
//                                 label="Subject"
//                                 labelPlacement="outside"
//                                 // placeholder="Enter your email"
//                                 variant="bordered"
//                                 value={subject}
//                                 onChange={(e) => setSubject(e.target.value)}
//                                 isInvalid={isSubjectInvalid}
//                             />
//                             <Textarea
//                                 isRequired
//                                 label="Email Body"
//                                 labelPlacement="outside"
//                                 // placeholder="Enter your description"
//                                 variant="bordered"
//                                 value={description}
//                                 onChange={(e) => setDescription(e.target.value)}
//                                 isInvalid={isDescriptionInvalid}
//                             />

//                         </ModalBody>
//                         <ModalFooter>
//                             <Button color="danger" variant="flat" onPress={onClose}>
//                                 Close
//                             </Button>
//                             <Button color="primary" onPress={() => submitModal(onClose = { onClose })} isDisabled={!enableSubmit}>
//                                 Test
//                             </Button>
//                         </ModalFooter>
//                     </div>
//                 )}
//             </ModalContent>
//         </Modal>
//     )
// }

export default function CustomTable({ headers, data, columns, page, setPage, rowsPerPage, setRowsPerPage, searchText, setSearchText, pages, setPages, renderActionCell = null, dataIsLink = [], customBottomContent = null, CustomTopContent = null }) {
    const users = data
    const headerColumns = columns


    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const disclosure1 = useDisclosure();
    const disclosure3 = useDisclosure();

    const INITIAL_VISIBLE_COLUMNS = headers;
    const [filterValue, setFilterValue] = React.useState("");
    const onRowsPerPageChange = React.useCallback((e) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);

    const onSearchChange = React.useCallback((value) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
            if (setSearchText) {
                setSearchText(value);
            }
        } else {
            setFilterValue("");
            if (setSearchText) {
                setSearchText("");
            }
        }
    }, []);

    const statusColorMap = {

        subscribed: "success",
        unsubscribed: "danger",
        DRAFT: "warning",
        QUEUED: "default",
        Mailgun: "default",
        sending: "warning",
        sent: "success",
        cancelled: "danger",
        SENT: "default",
        OPENED: "success",
    };

    const renderCell = React.useCallback((user, columnKey, column) => {
        const keys = columnKey.split('.');

        const cellValue = keys.reduce((result, key) => {
            if (result && typeof result === 'object' && key in result) {
                return result[key];
            }
            return undefined; // return undefined if the key doesn't exist in the nested structure
        }, user);

        switch (columnKey) {
            case "status":
                return (
                    <Chip className="capitalize" color={statusColorMap[user.status] ? statusColorMap[user.status] : 'transparent'} size="sm" variant="flat">
                        {cellValue}
                    </Chip>
                );
            case "service_type.name":
                return (
                    <Chip className="capitalize" color={'default'} size="sm" variant="flat">
                        {cellValue}
                    </Chip>
                );
            case "actions":
                if (renderActionCell) {
                    return renderActionCell(user, disclosure1)
                }
                return (
                    <div className="relative flex justify-start items-center gap-2">
                        <Dropdown className="bg-background border-1 border-default-200">
                            <DropdownTrigger>
                                <Button isIconOnly={false} radius="full" size="sm" variant="light" >
                                    <VerticalDotsIcon className="text-default-400" />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Static Actions">
                                <DropdownItem onClick={onOpen}>Test</DropdownItem>
                                <DropdownItem onClick={() => { }}>Edit</DropdownItem>
                                <DropdownItem>Delete</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                );
            default:
                if (dataIsLink.includes(columnKey)) {
                    const selectedColumn = columns.find(item => item.uid === columnKey);
                    if (selectedColumn) {
                        const selectedColumnkeys = selectedColumn.linkKey.split('.');
                        const linkValue = selectedColumnkeys.reduce((result, key) => {
                            if (result && result !== undefined) {
                                if (result && typeof result === 'object' && key in result) {
                                    return result[key];
                                }
                            }
                            return undefined; // return undefined if the key doesn't exist in the nested structure
                        }, user);
                        let link = selectedColumn.link.replace(/{([^}]+)}/g, linkValue);
                        return (<Link href={link} style={{ color: 'blue', textDecoration: 'underline' }}> {cellValue}</Link >)

                    }


                }
                return cellValue;
        }
    }, []);



    const topContent = React.useMemo(() => {
        if (CustomTopContent) {
            return <CustomTopContent />
        }
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-3 items-end">
                    <Input
                        isClearable
                        classNames={{
                            base: "w-full sm:max-w-[44%]",
                            inputWrapper: "border-1",
                        }}
                        placeholder="Search ..."
                        size="sm"
                        startContent={<SearchIcon className="text-default-300" />}
                        value={filterValue}
                        variant="bordered"
                        onClear={() => setFilterValue("")}
                        onValueChange={onSearchChange}
                    />

                </div>
                <div className="flex justify-between items-center">
                    <span className="text-default-400 text-small">Total: {pages * rowsPerPage}</span>
                    <label className="flex items-center text-default-400 text-small">
                        Rows per page:
                        <select
                            className="bg-transparent outline-none text-default-400 text-small"
                            onChange={onRowsPerPageChange}
                        >
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                        </select>
                    </label>
                </div>
            </div>
        );
    }, [
        filterValue,
        onSearchChange,
        onRowsPerPageChange,
        pages,
        CustomTopContent,
        rowsPerPage
    ]);


    const bottomContent = React.useMemo(() => {
        if (customBottomContent) {
            return customBottomContent
        }
        return (
            <div className="flex w-full justify-center">
                <Pagination
                    isCompact
                    showShadow
                    showControls
                    classNames={{
                        cursor: "bg-foreground text-background",
                    }}
                    color="default"
                    // isDisabled={hasSearchFilter}
                    page={page}
                    total={pages}
                    variant="light"
                    onChange={setPage}
                />
            </div>
        );
    }, [page, pages, setPage, customBottomContent]);

    return (
        <div style={{ paddingTop: '20px' }}>
            <Table
                isCompact
                // removeWrapper
                aria-label="Example table with custom cells, pagination and sorting"
                bottomContent={bottomContent}
                bottomContentPlacement="outside"
                topContent={topContent}
                topContentPlacement="outside"
                classNames={{
                    wrapper: "min-h-[222px]",
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
                <TableBody emptyContent={"No data found"} items={data}>
                    {(item, column) => (
                        <TableRow key={item.id}>
                            {(columnKey, column) => <TableCell>{renderCell(item, columnKey, column)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
