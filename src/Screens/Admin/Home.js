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

    editfunction(item, index) {
        console.log(item)

    }

    deletefunction(item, index) {
        console.log(item)

        // Global.postRequest(API.ADMIN_DELETE_USER,{userid:item._id})
        //     .then((res) => {
        //         if (res.status == 200) {
        //             console.log(res.data)
        //         }
        //     })
    }

    render() {

        return (

            <div className="container">
                <div className="text-center">
                    <h1>List Of all user</h1>

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
                            {this.state.users.map((item, index) => {
                                return (
                                    <tr>
                                        <th scope="row">{index}</th>
                                        <td>{item.name}</td>
                                        <td>{item.phone ? item.phone : "-"}</td>
                                        <td>{item.email}</td>
                                        <td><span onClick={() => this.editfunction(item, index)}>Edit</span> / <span onClick={() => this.deletefunction(item, index)}>Delete</span></td>
                                    </tr>
                                )
                            })}
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
