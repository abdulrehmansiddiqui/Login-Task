import React, { useState } from 'react';
import { connect } from "react-redux";
import { auth } from "../Redux/actions/auth";
import Global from "../Constants/Global";
import Constant from "../Constants/API";

function Login(props) {
  const [email, setemail] = useState('')
  const [pass, setpass] = useState('')
  const [status, setstatus] = useState(true)
  const [passsee, setpasssee] = useState(true)
  const [remember, setremember] = useState(false)


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

  const Loginfunction = () => {
    props.updateAuth("token")
    // remember ? Global.saveData(Constant.key, "token") : null

    let path = '/Home';
    props.history.push(path)

  };
  const passwordchange = () => {
    setpasssee(!passsee)
  };

  return (
    <div className="App">

      <div className="container">

        <h1>Howzit?!</h1>
        <span className="starttext">To get started, please fill out the form<br /> below to validate your account.</span>


        <div className="row">
          <div className="col-md-8">
            <div className="card1">
              <div className="form-group">
                <input type="text" className="form-control" id="usr" required
                  onChange={(val) => emailfun(val)} value={email}
                />
                <label for="usr">Email</label>
              </div>

              <div className="eye"onClick={passwordchange.bind(this)} >
              </div>
              <div className="form-group">
                <input type={passsee ?"password":"text" } className="form-control" id="password" required
                  onChange={(val) => passfun(val)} value={pass}
                />
                <label for="usr">Password</label>
              </div>

              {status
                ? <button disabled className="btn btn-light btn-block">NEXT</button>
                : <button
                  className="btn btn-dark btn-block"
                  onClick={Loginfunction.bind(this)}
                >
                  NEXT
                </button>
              }

              <p className="smalltext" >By clicking "next" you agree to be awesome</p>

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
export default connect(null, mapDispatchToProps)(Login)
