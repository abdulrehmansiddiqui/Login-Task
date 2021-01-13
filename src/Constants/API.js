class API {
  static BASE_URL = "http://localhost:1000";

  static key = "Asdiuailsdjk";
  static LOGIN = "/auth/login";
  static REGISTER = "/auth/reg";
  

  static GET_USER_DATA = "/user";
  static UPDATE_USER = "/user/update";
  
  static GET_LEAD_DATA = "/lead";
  static ADD_LEAD = "/lead/add";
  static UPDATE_LEAD = "/lead/update";
  static DELETE_LEAD = "/lead/delete";


  static ADMIN_LEAD_BY_USER = "/admin/lead/alluser";
  static ADMIN_UPDATE_LEAD = "/admin/lead/update";
  static ADMIN_DELETE_LEAD = "/admin/lead/delete";


  static ADMIN_USER = "/admin/allusers";
  static ADMIN_ADMIN_USER = "/admin/updateuser";
  static ADMIN_DELETE_USER = "/admin/deleteuser";
  static ADMIN_LOGIN = "/admin/login";
  static ADMIN_REGISTER = "/admin/reg";

  
  

}

export default API;
