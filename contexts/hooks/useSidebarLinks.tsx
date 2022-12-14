import { ReactElement, useState } from 'react'
import { IoLogOutOutline, IoSettingsOutline, IoDiamondOutline } from 'react-icons/io5'
import { BsPalette, BsShopWindow } from 'react-icons/bs'
import { MdOutlinePostAdd, MdOutlineNaturePeople } from 'react-icons/md'
import { TbListDetails } from 'react-icons/tb'
import { RiArrowDownSLine, RiShoppingCartLine, RiHomeSmile2Line, RiPlayListAddLine } from 'react-icons/ri'

export type DropDown = {
    opened: boolean;
    items: Link[]
}

export type Link = {
    url: string;
    icon?: ReactElement;
    text: string;
    dropDown?: DropDown;
}

export const useSidebarLinks = () => {
    let [links, _] = useState<Link[]>([
        {
            url: '#',
            icon: <RiShoppingCartLine size={23} className="" />,
            text: 'Orders'
        },
        {
            url: '#',
            icon: <BsShopWindow size={23} className="" />,
            text: 'Products'
        },
        {
            url: '#',
            icon: <MdOutlineNaturePeople size={23} className="" />,
            text: 'Managers'
        },
        {
            url: '#',
            icon: <BsPalette size={23} className="" />,
            text: 'Categories',
            dropDown: {
                items: [
                    {
                        text: 'Create category',
                        url: '#',
                        icon: <RiPlayListAddLine size={23} className="" />
                    },
                    {
                        text: 'All categories',
                        url: '#',
                        icon: <TbListDetails size={23} className="" />
                    }
                ],
                opened: false
            }
        },
    ])

    return [links]
}