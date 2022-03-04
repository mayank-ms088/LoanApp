// component
import Iconify from "../../components/Iconify";

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: "Dashboard",
    path: "/dashboard/app",
    icon: getIcon("eva:people-fill"),
  },
  {
    title: "product",
    path: "/dashboard/products",
    icon: getIcon("eva:shopping-bag-fill"),
  },
];

export default sidebarConfig;
