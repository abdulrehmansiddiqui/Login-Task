import React, { Component } from "react";
import { connect } from "react-redux";
// import { get_user } from "../Redux/actions/user";
import Global from "../../Constants/Global";
import API from "../../Constants/API";

class Home extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            _id: '',
            name: '',
            phone: '',
            email: '',
            status: '',
            error: '',

        };
    }

    componentDidMount() {

        Global.getRequest(API.GET_USER_DATA)
            .then(res => {
                console.log("sssssssssssssssssssssss", res.data)
                if (res.status === 200) {
                    this.setState({
                        _id: res.data._id,
                        name: res.data.name,
                        phone: res.data.phone,
                        email: res.data.email,
                    })
                } else {
                    this.setState({ error: res.data.msg })
                }
            })
        // console.log(this.props.history.location.data, 'ssss')
    }


    userUpdate() {
        const { name, phone, email, _id } = this.state

        const data = {
            userid: _id,
            email: email,
            name: name,
            phone: phone
        }

        Global.postRequest(API.UPDATE_USER, data)
            .then(res => {
                console.log("sssssssssssssssssssssss", res.data)
                if (res.status === 200) {
                    let path = '/Home';
                    this.props.history.push(path)

                } else {
                    this.setState({ error: res.data.msg })
                }
            })
    }

    render() {
        const { name, phone, email, error, status } = this.state
        const { userUpdate, } = this
        return (
            <div className="App">

                <div className="container">

                    <span className="starttext">{error ? error : null}</span>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="card1">
                                <h3>User Edit</h3>
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
                                        // onChange={(val) => emailfun(val)}
                                        value={email}
                                    />
                                    <label for="usr">Email</label>
                                </div>

                                {status
                                    ? <button disabled className="btn btn-light btn-block">NEXT</button>
                                    : <button
                                        className="btn btn-dark btn-block"
                                        onClick={userUpdate.bind(this)}
                                    >
                                        NEXT
                </button>
                                }

                                <p className="smalltext" onClick={() => this.props.history.push("Login")} >Back to login</p>

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
        auth: state.auth.auth,
        role: state.auth.role,
    }
}

export default connect(mapStateToProps)(Home)
