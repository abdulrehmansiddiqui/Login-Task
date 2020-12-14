import React, { useEffect } from "react";
import { Route, Switch, BrowserRouter as Router, } from "react-router-dom";
// import API from "./Constants/API"
import Navigation from "./Routes/Navigation"
// import Global from "./Constants/Global";
// import API from "./Constants/API";
import Login from "./Screens/Login";
import { connect } from "react-redux";

function App(props) {

    return (
      <React.Fragment>
        <Router>
          <Switch>
            <div>
              {props.auth ?
                Navigation.map((route, idx) => (
                  <Route
                    path={route.path}
                    component={route.component}
                    key={idx}
                  />
                ))
                :
                <Route path="/" component={Login} />
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
  }
}

export default connect(mapStateToProps)(App)
