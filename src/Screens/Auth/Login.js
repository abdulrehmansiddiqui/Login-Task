import React, { useState } from 'react';
import { connect } from "react-redux";
import { auth } from "../../Redux/actions/auth";
import Global from "../../Constants/Global";
import API from "../../Constants/API";

function Login(props) {
  const [email, setemail] = useState('abdul@live.com')
  const [pass, setpass] = useState('asdfasdf')
  const [status, setstatus] = useState(false)
  const [passsee, setpasssee] = useState(true)
  
  const [aemail, setaemail] = useState('a@live.com')
  const [apass, setapass] = useState('asdfasdf')
  const [astatus, setastatus] = useState(false)
  const [apasssee, setapasssee] = useState(true)
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
  const passwordchange = () => {
    setpasssee(!passsee)
  };
  /////////////////////////////
  const adminemailfun = (val) => {
    if (val.target.value) {
      setaemail(val.target.value)
      if (apass) {
        setastatus(false)
      }
    } else {
      setaemail('')
      setastatus(true)
    }
  }
  const adminpassfun = (val) => {
    if (val.target.value) {
      setapass(val.target.value)
      if (aemail) {
        setastatus(false)
      }
    } else {
      setapass('')
      setastatus(true)
    }
  }
  const apasswordchange = () => {
    setapasssee(!apasssee)
  };
  /////////////////////////////
  const adminLogin = () => {

    Global.postRequest(API.ADMIN_LOGIN, { email:aemail, password: apass })
      .then(res => {
        console.log("admin", res)
        if (res.status === 200) {
          Global.saveData(API.key, res.data.auth)
          props.updateAuth(res.data)

          let path = '/Home';
          props.history.push(path)

        } else {
          seterror("error to login")
        }
      })

  };
  const userLogin = () => {

    Global.postRequest(API.LOGIN, { email, password: pass })
      .then(res => {
        console.log("User", res)
        if (res.status === 200) {
          Global.saveData(API.key, res.data.auth)
          props.updateAuth(res.data)

          let path = '/Home';
          props.history.push(path)

        } else {
          seterror("error to login")
        }
      })

  };


  return (
    <div className="App">

      <div className="container">

        <h1>CRM?!</h1>
        <span className="starttext">{error ? error : null}</span>


        <div className="row">
          <div className="col-md-6">
            <div className="card1">
              <h3>User login</h3>
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
                  onClick={userLogin.bind(this)}
                >
                  NEXT
                </button>
              }
              <p className="smalltext" onClick={() => props.history.push("Register")} >By clicking if you dont have account</p>


            </div>

          </div>

          <div className="col-md-6">
            <div className="card1">
              <h3>Admin login</h3>
              <div className="form-group">
                <input type="text" className="form-control" id="usr" required
                  onChange={(val) => adminemailfun(val)} value={aemail}
                />
                <label for="usr">Email</label>
              </div>

              <div className="eye" onClick={apasswordchange.bind(this)} >
              </div>
              <div className="form-group">
                <input type={apasssee ? "password" : "text"} className="form-control" id="password" required
                  onChange={(val) => adminpassfun(val)} value={apass}
                />
                <label for="usr">Password</label>
              </div>

              {astatus
                ? <button disabled className="btn btn-light btn-block">NEXT</button>
                : <button
                  className="btn btn-dark btn-block"
                  onClick={adminLogin.bind(this)}
                >
                  NEXT
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
export default connect(null, mapDispatchToProps)(Login)
