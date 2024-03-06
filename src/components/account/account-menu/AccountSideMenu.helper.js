import { CgProfile } from 'react-icons/cg';
import { FaAddressBook } from 'react-icons/fa';
import { MdOutlineMailOutline } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { RiDatabase2Fill } from 'react-icons/ri'

export const MenuList = [
    {
        title: "My Profile",
        path: '/account',
        icon: CgProfile
    },
    {
        title: "Address",
        path: '/account/address',
        icon: FaAddressBook
    },
    {
        title: "Change Email",
        path: '/account/change-email',
        icon: MdOutlineMailOutline
    },
    {
        title: "Change Password",
        path: '/account/change-password',
        icon: RiLockPasswordLine
    },
    {
        title: "My Data",
        path: '/account/my-data',
        icon: RiDatabase2Fill
    },

]