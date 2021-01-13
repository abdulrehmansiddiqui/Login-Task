import Header from "../Screens/Admin/Header";
import Home from "../Screens/Admin/Home";
import AddUser from "../Screens/Admin/AddUser";
import EditUser from "../Screens/Admin/EditUser";
import ViewUser from "../Screens/Admin/ViewUser";
import Logout from "../Screens/Auth/Logout";

const AdminNavigation = [
    { path: "/", component: Header },
    { path: "/Home", component: Home },
    { path: "/AddUser", component: AddUser },
    { path: "/EditUser", component: EditUser },
    { path: "/ViewUser", component: ViewUser },
    { path: "/Logout", component: Logout },
    
];

export default AdminNavigation;
