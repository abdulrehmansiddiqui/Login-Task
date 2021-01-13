import Header from "../Screens/Admin/Header";
import Home from "../Screens/Admin/Home";

import Logout from "../Screens/Auth/Logout";

const AdminNavigation = [
    { path: "/", component: Header },
    { path: "/Home", component: Home },
    { path: "/Logout", component: Logout },
    
];

export default AdminNavigation;
