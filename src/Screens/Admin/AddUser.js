import React, { useState } from 'react';
import { connect } from "react-redux";
import { auth } from "../../Redux/actions/auth";
import Global from "../../Constants/Global";
import API from "../../Constants/API";

function AddUser(props) {
  const [email, setemail] = useState('abdul@live.com')
  const [pass, setpass] = useState('asdfasdf')
  const [name, setname] = useState('abdul')
  const [phone, setphone] = useState('1234')
  const [status, setstatus] = useState(false)
  const [passsee, setpasssee] = useState(true)
  // const [remember, setremember] = useState(false)
  const [error, seterror] = useState('')


  const emailfun = (val) => {
    if (val.target.value) {
      setemail(val.target.value)
      if (pass) {
        setstatus(false)
      }
    } else {
      setemail('')
      setstatus(true)
    }
  }
  const passfun = (val) => {
    if (val.target.value) {
      setpass(val.target.value)
      if (email) {
        setstatus(false)
      }
    } else {
      setpass('')
      setstatus(true)
    }
  }

  const userAddUser = () => {

    const data = {
      email: email,
      password: pass,
      name: name,
      phone: phone
    }

    Global.postRequest(API.REGISTER, data)
      .then(res => {
          if (res.data.status) {
            let path = '/Home';
            props.history.push(path)
          } else {
            seterror(res.data.message)
          }
      })

  };

  const passwordchange = () => {
    setpasssee(!passsee)
  };

  return (
    <div className="App">

      <div className="container">

        <span className="starttext">{error ? error : null}</span>


        <div className="row">
          <div className="col-md-6">
            <div className="card1">
              <h3>Add User</h3>
              <div className="form-group">
                <input type="text" className="form-control" id="usr" required
                  onChange={(val) => setname(val.target.value)} value={name}
                />
                <label for="usr">Name</label>
              </div>

              <div className="form-group">
                <input type="number" className="form-control" id="usr" required
                  onChange={(val) => setphone(val.target.value)} value={phone}
                />
                <label for="usr">Phone</label>
              </div>

              <div className="form-group">
                <input type="text" className="form-control" id="usr" required
                  onChange={(val) => emailfun(val)} value={email}
                />
                <label for="usr">Email</label>
              </div>

              <div className="eye" onClick={passwordchange.bind(this)} >
              </div>
              <div className="form-group">
                <input type={passsee ? "password" : "text"} className="form-control" id="password" required
                  onChange={(val) => passfun(val)} value={pass}
                />
                <label for="usr">Password</label>
              </div>

              {status
                ? <button disabled className="btn btn-light btn-block">NEXT</button>
                : <button
                  className="btn btn-dark btn-block"
                  onClick={userAddUser.bind(this)}
                >
                  Add User
                </button>
              }

            </div>

          </div>

        </div>



      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateAuth: (data) => { dispatch(auth(data)) },
  }
}
export default connect(null, mapDispatchToProps)(AddUser)
