import Header from "../Screens/User/Header";
import Home from "../Screens/User/Home";

import Logout from "../Screens/Auth/Logout";

const UserNavigation = [
    { path: "/", component: Header },
    { path: "/Home", component: Home },
    { path: "/Logout", component: Logout },
    
];

export default UserNavigation;
