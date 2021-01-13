import Header from "../Screens/User/Header";
import Home from "../Screens/User/Home";
import EditUser from "../Screens/User/EditUser";

import Logout from "../Screens/Auth/Logout";

const UserNavigation = [
    { path: "/", component: Header },
    { path: "/Home", component: Home },
    { path: "/EditUser", component: EditUser },
    { path: "/Logout", component: Logout },

];

export default UserNavigation;
