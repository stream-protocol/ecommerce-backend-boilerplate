import React, { FC, ReactElement, useState } from 'react'
import { IoLogOutOutline, IoSettingsOutline, IoDiamondOutline } from 'react-icons/io5'
import { RiArrowDownSLine, RiShoppingCartLine, RiHomeSmile2Line, RiPlayListAddLine, RiCloseFill } from 'react-icons/ri'

import Link from 'next/link'
import { Link as NavLink, useSidebarLinks } from 'contexts/hooks/useSidebarLinks'
import { State, useGlobal } from 'contexts/globalContext'

const Sidebar: FC = () => {
    const KEY = Math.round(Math.random() * Date.now())
    // const [routes, _] = useState<Link[]>(links)
    const { state: { sidebarOpened }, setState } = useGlobal()
    const [routes] = useSidebarLinks()
    return (
        // <div className='fixed left-0 w-[250px] bg-custom-dark h-full md:flex md:flex-col hidden'>
        <div className={`fixed md:flex md:flex-col   left-0 w-[250px] bg-custom-dark h-full ${!sidebarOpened && 'hidden'} z-10`}>
            {/* <div className={`fixed flex flex-col left-0 w-[250px] bg-custom-dark h-full ${!sidebarOpened && 'hidden md:flex md:flex-col'} z-10`}> */}

            <div className='h-14 w-full bg-discord-dark flex flex-col justify-center px-3'>
                <button onClick={() => setState((state: State) => ({ ...state, sidebarOpened: !sidebarOpened }))} className='flex w-[20%] items-center text-base font-normal md:hidden text-custom-gray border p-1 rounded ml-auto' type='button'>
                    <RiCloseFill size={23} className="w-full" />
                </button>
            </div>
            <div className="overflow-y-auto h-full py-4 px-3 bg-custom-dark">
                <ul className="space-y-2">
                    <li className='space-y-2 border-b mb-4 pb-4 border-gray-500'>
                        <Link href={"#"}>
                            <a className="flex items-center p-[13px] text-base font-normal  rounded hover:bg-white w-full text-custom-gray hover:text-custom-dark">
                                <RiHomeSmile2Line size={23} className="" />
                                <span className="ml-3">Dashboard</span>
                            </a>
                        </Link>
                    </li>
                    {routes.map((item, i) => (
                        <Item key={i} item={item} />
                    ))}
                </ul>
                <ul className="pt-4 mt-4 space-y-2 border-t border-gray-500">
                    <li>
                        <Link href={"#"}>
                            <a className="flex items-center p-[13px] text-base font-normal  rounded hover:bg-white w-full text-custom-gray hover:text-custom-dark">
                                <IoSettingsOutline size={23} className="" />
                                <span className="ml-3">Settings</span>
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href={"#"}>
                            <a className="flex items-center p-[13px] text-base font-normal  rounded hover:bg-white w-full text-custom-gray hover:text-custom-dark">
                                <IoDiamondOutline size={23} className="" />
                                <span className="ml-3">Upgrade account</span>
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href={"#"}>
                            <a className="flex items-center p-[13px] text-base font-normal  rounded hover:bg-white w-full text-custom-gray hover:text-custom-dark">
                                <IoLogOutOutline size={23} className="" />
                                <span className="ml-3">Log out</span>
                            </a>
                        </Link>
                    </li>
                </ul>

            </div>
        </div >
    )
}

export default Sidebar

const Item: FC<{ item: NavLink, key: any }> = ({ item: { text, url, dropDown, icon } }, key) => {
    const [opened, setOpened] = useState(dropDown?.opened)
    const KEY = Math.round(Math.random() * Date.now())
    return (
        <li key={key}>
            {dropDown == undefined && (
                <Link href={url}>
                    <a className="flex items-center p-[13px] text-base font-normal  rounded hover:bg-white text-custom-gray hover:text-custom-dark">
                        {icon && (icon)}
                        <span className="ml-3">{text}</span>
                    </a>
                </Link>
            )}
            {dropDown != undefined && (
                <>
                    <button onClick={() => setOpened(!opened)} type='button' className="flex items-center p-[13px] text-base font-normal  rounded hover:bg-white w-full text-custom-gray hover:text-custom-dark">
                        {icon && (icon)}
                        <span className="ml-3">{text}</span>
                        <RiArrowDownSLine size={23} className=" ml-auto" />
                    </button>
                    {opened && (
                        <ul className='py-2 pl-5 space-y-2'>
                            {dropDown.items.map((__item, i) => (
                                <Item key={i} item={__item} />
                            ))}
                        </ul>
                    )}
                </>
            )}
        </li>
    )
}