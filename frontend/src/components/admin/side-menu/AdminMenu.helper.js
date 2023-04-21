import { SiGoogleanalytics, SiTemporal } from 'react-icons/si';
import { HiViewGrid, HiViewGridAdd } from 'react-icons/hi';
import { MdOutlineStreetview } from 'react-icons/md';
import { TbBrandFlipboard } from 'react-icons/tb';
import { GrDocumentUpdate } from 'react-icons/gr';
import { GoListUnordered } from 'react-icons/go';
import { IoPersonAddSharp } from 'react-icons/io5';
import { MdPerson4 } from 'react-icons/md';
export const MenuContents = [
    {
        icon: SiGoogleanalytics,
        title: "Analytics",
        path: "/admin",
    },
    {
        icon: HiViewGridAdd,
        title: "Add Product",
        path: "/admin/add-product"
    },
    {
        icon: HiViewGrid,
        title: "View Product",
        path: "/admin/product-list"
    },
    {
        icon: TbBrandFlipboard,
        title: "Add Brand",
        path: "/admin/add-brand"
    },
    {
        icon: GrDocumentUpdate,
        title: "Update Product",
        path: "/admin/update-product"
    },
    {
        icon: GoListUnordered,
        title: "Orders",
        path: "/admin/order-list"
    },
    {
        icon: MdOutlineStreetview,
        title: "Workers",
        path: "/admin/workers"
    },
    {
        icon: MdOutlineStreetview,
        title: "Add Worker",
        path: "/admin/add-worker"
    },
    {
        icon: IoPersonAddSharp,
        title: "Add Supplier",
        path: "/admin/add-supplier"
    },
    {
        icon: MdPerson4,
        title: "Suppliers",
        path: "/admin/suppliers"
    },
]