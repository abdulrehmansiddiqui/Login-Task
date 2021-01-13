import React, { Component } from "react";
import { connect } from "react-redux";
import { auth } from "../../Redux/actions/auth";
// import { get_user } from "../Redux/actions/user";
import Global from "../../Constants/Global";
import API from "../../Constants/API";

class Home extends Component {
    constructor() {
        super();
        this.state = {
            users: [],

        };
    }

    componentDidMount() {
        Global.getRequest(API.ADMIN_USER)
            .then((res) => {
                if (res.status === 200) {
                    console.log(res.data)
                    this.setState({ users: res.data.data })
                }
            })
    }

    viewUser(item) {
        this.props.history.push({ pathname: "/ViewUser", data: item })
    }

    editfunction(item, index) {
        this.props.history.push({ pathname: "/EditUser", data: item })
        // props.history.push({
        //     pathname: '/register',
        //     state: data_you_need_to_pass
        //    });
    }

    deletefunction(item, index) {

        Global.postRequest(API.ADMIN_DELETE_USER, { userid: item._id })
            .then((res) => {
                if (res.status === 200) {

                    console.log(res.data)
                    var filtered = this.state.users.filter(function (el) { return el._id !== item._id; });
                    this.setState({ users: filtered })

                }
            })
    }

    render() {

        return (

            <div className="container">
                <div className="text-center">
                    <h1>List Of all user</h1>
                    <button className="btn btn-success " onClick={() => this.props.history.push("AddUser")} >+ add user </button>
                    {/* <button className="btn btn-success" onClick={() => this.props.history.push("AddLead")} >+ add lead </button> */}
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Email</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.users.length > 0 ?
                                    this.state.users.map((item, index) => {
                                        return (
                                            <tr>
                                                <th scope="row">{index+1}</th>
                                                <td>{item.name}</td>
                                                <td>{item.phone ? item.phone : "-"}</td>
                                                <td>{item.email}</td>
                                                <td><span onClick={() => this.viewUser(item, index)}>View</span> / <span onClick={() => this.editfunction(item, index)}>Edit</span>  / <span onClick={() => this.deletefunction(item, index)}>Delete</span></td>
                                            </tr>
                                        )
                                    })
                                    : "No User to display"
                            }
                        </tbody>
                    </table>
                    <button
                        className="btn btn-dark btn-block"
                        onClick={() => this.props.history.push("Logout")}
                    >
                        Logout
    </button>
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
