import React, { Component } from "react";
import { connect } from "react-redux";
import { auth } from "../../Redux/actions/auth";
// import { get_user } from "../Redux/actions/user";
// import Global from "../../Constants/Global";
// import API from "../../Constants/API";

class Home extends Component {
    constructor() {
        super();
        this.state = {
            users: [],

        };
    }


    render() {
        return (

            <div className="container">
                <div className="text-center">
                    <h1>Welcome User</h1>
                    <p>
                        <button
                            className="btn btn-info"
                            onClick={() => this.props.history.push("EditUser")}
                        >Edit Profile</button>

                    <button className="btn btn-success" onClick={() => this.props.history.push("AddLead")} > lead </button>

                    </p>
                    <br></br>
                    <button
                        className="btn btn-dark btn-block"
                        onClick={() => this.props.history.push("Logout")}
                    >Logout</button>
                </div>
            </div>

        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateAuth: (data) => { dispatch(auth(data)) },
    }
}
export default connect(null, mapDispatchToProps)(Home)
