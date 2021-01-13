import React, { useEffect } from "react";
import { Route, Switch, BrowserRouter as Router, } from "react-router-dom";
// import API from "./Constants/API"
import AdminNavigation from "./Routes/AdminNavigation"
import UserNavigation from "./Routes/UserNavigation"
// import Global from "./Constants/Global";
// import API from "./Constants/API";
import Login from "./Screens/Auth/Login";
import Header from "./Screens/Auth/Header";
import Register from "./Screens/Auth/Register";
import { connect } from "react-redux";

function App(props) {

  useEffect(() => {
    console.log(props.role, 'ssss')
  }, [])

  return (
    <React.Fragment>
      <Router>
        <Switch>
          <div>
            {props.auth ?
              props.role === 2 ?
                AdminNavigation.map((route, idx) => (
                  <Route
                    path={route.path}
                    component={route.component}
                    key={idx}
                  />
                ))
                :
                props.role === 1 ?
                  UserNavigation.map((route, idx) => (
                    <Route
                      path={route.path}
                      component={route.component}
                      key={idx}
                    />
                  ))
                  : null
              :
              <div>
                <Route path="/" component={Header} />
                <Route path="/Login" component={Login} />
                <Route path="/Register" component={Register} />
              </div>
            }
          </div>
        </Switch>
      </Router>
    </React.Fragment >
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth.auth,
    role: state.auth.role,
  }
}

export default connect(mapStateToProps)(App)
