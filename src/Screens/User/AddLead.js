import React, { Component } from "react";
import { connect } from "react-redux";
// import { get_user } from "../Redux/actions/user";
import Global from "../../Constants/Global";
import API from "../../Constants/API";

class AddLead extends Component {
    constructor() {
        super();
        this.state = {
            leads: [],
            id: '',
            name: '',
            phone: '',
            email: '',
            loading: '',
            error: '',
            status: '',

        };
    }

    componentDidMount() {
        this.getLead()
    }

    getLead() {
        Global.getRequest(API.GET_LEAD_DATA)
            .then(res => {
                // console.log("sssssssssssssssssssssss", res.data.data)
                if (res.status === 200) {
                    this.setState({ leads: res.data.data, loading: false })
                } else {
                    this.setState({ error: res.data.msg, loading: false })
                }
            })
    }

    addLead() {

        const { name, phone, email } = this.state

        const data = {
            email: email,
            name: name,
            phone: phone
        }

        Global.postRequest(API.ADD_LEAD, data)
            .then(res => {
                console.log("addlead", res.data)
                if (res.status === 200) {
                    this.setState({ leads: [...this.state.leads, res.data] })
                } else {
                    this.setState({ error: res.data.msg })
                }
            })

    }

    updateEdit(item) {
        this.setState({
            id: item._id,
            name: item.name,
            email: item.email,
            phone: item.phone,
        })
    }
    UpdateLead() {

        const { name, phone, email, id } = this.state

        const data = {
            id: id,
            email: email,
            name: name,
            phone: phone
        }

        Global.postRequest(API.UPDATE_LEAD, data)
            .then(res => {
                console.log("Updatelead", res.data)
                if (res.status === 200) {
                    this.getLead()
                    // this.setState({ leads: [...this.state.leads,res.data] })
                } else {
                    this.setState({ error: res.data.msg })
                }
            })

    }

    deletelead(item) {

        Global.postRequest(API.DELETE_LEAD, { id: item._id })
            .then((res) => {
                if (res.status === 200) {
                    console.log("delete", res.data)
                    var filtered = this.state.leads.filter(function (el) { return el._id !== item._id; });
                    this.setState({ leads: filtered })
                }
            })
    }

    render() {
        const { id, name, email, phone, leads, error, loading, status } = this.state
        // const { userUpdate, } = this
        return (
            <div className="App">

                <div className="container">

                    <span className="starttext">{error ? error : null}</span>

                    <div className="row">

                        <div className="col-md-5">
                            <div className="card1">
                                <h3>{id != '' ? "Update" : "Add"} Lead</h3>
                                <div className="form-group">
                                    <input type="text" className="form-control" id="usr" required
                                        onChange={(val) => this.setState({ name: val.target.value })} value={name}
                                    />
                                    <label for="usr">Name</label>
                                </div>

                                <div className="form-group">
                                    <input type="number" className="form-control" id="usr" required
                                        onChange={(val) => this.setState({ phone: val.target.value })} value={phone}
                                    />
                                    <label for="usr">Phone</label>
                                </div>

                                <div className="form-group">
                                    <input type="text" className="form-control" id="usr" required
                                        onChange={(val) => this.setState({ email: val.target.value })}
                                        value={email}
                                    />
                                    <label for="usr">Email</label>
                                </div>

                                {status
                                    ? <button disabled className="btn btn-light btn-block">NEXT</button>
                                    : <button
                                        className="btn btn-dark btn-block"
                                        onClick={id != '' ? this.UpdateLead.bind(this) : this.addLead.bind(this)}
                                    >
                                        {id != '' ? "Update" : "Add"}
                                    </button>
                                }

                            </div>

                        </div>

                        <div className="col-md-7">
                            <div className="card1">
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
                                                            <td> <span onClick={() => this.updateEdit(item)}>Edit</span>  / <span onClick={() => this.deletelead(item, index)}>Delete</span></td>
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

const mapStateToProps = (state) => {
    return {
        userid: state.auth.id,
        auth: state.auth.auth,
        role: state.auth.role,
    }
}

export default connect(mapStateToProps)(AddLead)
