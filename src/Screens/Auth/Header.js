import React, {  } from 'react';

function Header(props) {

  return (
    <div className="App">

      <div className="container">

        <ul class="nav justify-content-center">
          <li class="nav-item">
            <a class="nav-link" href="login">Login</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="Register">Register</a>
          </li>
        </ul>


      </div>
    </div>
  );
}

export default Header
