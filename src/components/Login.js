import React from "react";
import axios from "axios";

import "./Login.css";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };
  }

  onChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let { email, password } = this.state;
    console.log({ email, password });
    if (!email || !password) {
      return alert("Vui long nhap!");
    }

    // GOI API
    axios
      .post("https://web-bh-api.herokuapp.com/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res);
        if (!res.data.success) return alert("Dang nhap that bai!");
        localStorage.setItem("token", res.data.data.token);

        // GOI API INFO_USER
        axios
          .get(
            `https://web-bh-api.herokuapp.com/validate/${res.data.data.token}`
          )
          .then((res) => {
            console.log({ ...res });
            if (res.data.data.role[0] !== "admin")
              return alert("Ban khong phai Admin!");

            console.log(this.props.history);
            this.props.history.push("/users");
          });
      });
  };

  render() {
    return (
      <div className="container col-6">
        <form action="action_page.php" method="post">
          <div className="container">
            <label htmlFor="uname">
              <b>Email</b>
            </label>
            <input
              onChange={this.onChange}
              type="text"
              placeholder="Enter Email"
              id="email"
              required
            />
            <label htmlFor="psw">
              <b>Password</b>
            </label>
            <input
              onChange={this.onChange}
              type="password"
              placeholder="Enter Password"
              id="password"
              required
            />
            <button onClick={this.handleSubmit} type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
