import React, { Component } from "react";
import { connect } from "react-redux";
import { auth } from "../../Redux/actions/auth";
// import { get_user } from "../Redux/actions/user";
import Global from "../../Constants/Global";
import API from "../../Constants/API";

class ViewUser extends Component {
    constructor() {
        super();
        this.state = {
            leads: [],
            id: '',
            name: '',
            phone: '',
            email: '',
            status: '',
            error: '',
            loading: true,

            lname: '',
            lphone: '',
            lemail: '',
            lid: '',
            lindex: '',
            lstatus: false,


        };
    }

    componentDidMount() {
        if (this.props.history.location.data) {
            let userdata = this.props.history.location.data
            this.setState({
                _id: userdata._id,
                name: userdata.name,
                phone: userdata.phone,
                email: userdata.email,
            })

            Global.postRequest(API.ADMIN_LEAD_BY_USER, { userid: userdata._id })
                .then((res) => {
                    if (res.status === 200) {
                        // console.log(res.data.datatosend.data)
                        this.setState({ loading: false, leads: res.data.datatosend.data })
                    } else {
                        this.setState({ loading: false })
                    }
                })
        }
        else this.props.history.push({ pathname: "/Home" })
    }


    updateEdit(item, index) {
        this.setState({
            lid: item._id,
            lname: item.name,
            lemail: item.email,
            lphone: item.phone,
            lstatus: true,
            lindex: index
        })
    }
    UpdateLead() {

        const { lname, lphone, lemail, lid, leads, lindex } = this.state

        const data = {
            id: lid,
            email: lemail,
            name: lname,
            phone: lphone
        }

        Global.postRequest(API.ADMIN_UPDATE_LEAD, data)
            .then(res => {
                console.log("Updatelead", res.data)
                if (res.status === 200) {
                    var temp = leads
                    temp[lindex].name = lname
                    temp[lindex].phone = lphone
                    temp[lindex].email = lemail
                    this.setState({ leads: temp })

                } else {
                    this.setState({ error: res.data.msg })
                }
            })

    }



    deletelead(item, index) {

        Global.postRequest(API.ADMIN_DELETE_LEAD, { id: item._id })
            .then((res) => {
                if (res.status === 200) {
                    if (res.data.datatosend.status) {
                        var filtered = this.state.leads.filter(function (el) { return el._id !== item._id; });
                        this.setState({ leads: filtered })
                    }
                }
            })
    }

    render() {
        const { name, phone, email, error, leads, loading, lstatus,
            lname,
            lphone,
            lemail,
        } = this.state
        return (
            <div className="App">
                <div className="container">

                    <span className="starttext">{error ? error : null}</span>

                    <div className="row">
                        <div className="col-md-4">
                            <div className="card1">
                                <h3>User Detail</h3>

                                <p>Name: {name}</p>
                                <p>Phone :{phone}</p>
                                <p>Email: {email}</p>

                            </div>

                            {lstatus ?
                                <div className="card1">
                                    <h3>Update Lead</h3>
                                    <div className="form-group">
                                        <input type="text" className="form-control" required
                                            onChange={(val) => this.setState({ lname: val.target.value })} value={lname}
                                        />
                                        <label for="usr">Name</label>
                                    </div>

                                    <div className="form-group">
                                        <input type="number" className="form-control" required
                                            onChange={(val) => this.setState({ lphone: val.target.value })} value={lphone}
                                        />
                                        <label for="usr">Phone</label>
                                    </div>

                                    <div className="form-group">
                                        <input type="text" className="form-control" required
                                            onChange={(val) => this.setState({ lemail: val.target.value })}
                                            value={lemail}
                                        />
                                        <label for="usr">Email</label>
                                    </div>

                                    <button
                                        className="btn btn-dark btn-block"
                                        onClick={this.UpdateLead.bind(this)}
                                    >
                                        Update
                                    </button>



                                </div>
                                : null}


                        </div>
                        <div className="col-md-8">
                            <div className="card1">
                                <h3>User Lead</h3>
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
                                        {loading ? "Loading" :
                                            leads.length > 0 ?
                                                leads.map((item, index) => {
                                                    return (
                                                        <tr>
                                                            <th scope="row">{index + 1}</th>
                                                            <td>{item.name}</td>
                                                            <td>{item.phone ? item.phone : "-"}</td>
                                                            <td>{item.email}</td>
                                                            <td> <span onClick={() => this.updateEdit(item, index)}>Edit</span>  / <span onClick={() => this.deletelead(item, index)}>Delete</span></td>
                                                        </tr>
                                                    )
                                                })
                                                : "No User to display"
                                        }
                                    </tbody>
                                </table>

                            </div>

                        </div>

                    </div>



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
export default connect(null, mapDispatchToProps)(ViewUser)
