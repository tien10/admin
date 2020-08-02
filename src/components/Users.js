import React from "react";

import axios from "axios";
import Nav from "./Nav";

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      name: "",
      email: "",
      password: "",
      image_name: null,
      id: 0,
    };
  }

  componentDidMount() {
    axios.get("https://web-bh-api.herokuapp.com/list_users").then((res) => {
      console.log("get list users: ", res);
      this.setState({
        users: res.data.data,
        name: "",
        email: "",
        password: "",
        image_name: null,
        id: 0,
      });
    });
  }

  namechange = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  emailchange = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  image_namechange = (e) => {
    this.setState({
      image_name: e.target.value,
    });
  };

  passwordchange = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  submit(e, id) {
    e.preventDefault();
    if (id === 0) {
      axios
        .post("https://web-bh-api.herokuapp.com/insert_user", {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
          image_name: this.state.image_name,
        })
        .then((res) => {
          console.log("them moi 1 user: ", res);
          this.componentDidMount();
        });
    } else {
      axios
        .put(`https://web-bh-api.herokuapp.com/update_user/${id}`, {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
          image_name: this.state.image_name,

        })
        .then((res) => {
          console.log("update 1 user: ", res);
          this.componentDidMount();
        });
    }
  }

  delete(id) {
    console.log("id de delete: ", id);
    axios
      .delete(`https://web-bh-api.herokuapp.com/delete_user/${id}`)
      .then((res) => {
        console.log("delete 1 user: ", res);
        this.componentDidMount();
      });
  }

  getone(id) {
    console.log("id de get 1 user: ", id);
    axios
      .get(`https://web-bh-api.herokuapp.com/get_user_id/${id}`)
      .then((res) => {
        console.log("get 1 user: ", res);
        this.setState({
          name: res.data.data.name,
          email: res.data.data.email,
          password: res.data.data.password,
          image_name: res.data.data.image_name,
          id: res.data.data._id,
        });
      });
  }

  render() {
    return (
      <div>
        <Nav history={this.props.history} />
        <div className="container mt-5">
          <div className="row mt-5">
            <div className="col-3 mt-5">
              <form
                onSubmit={(e) => {
                  this.submit(e, this.state.id);
                }}
              >
                <div className="form-group">
                  <label>
                    <b>Name</b>
                  </label>
                  <input
                    onChange={(e) => {
                      this.namechange(e);
                    }}
                    value={this.state.name}
                    type="text"
                    className="form-control"
                  ></input>
                </div>
                <div className="form-group">
                  <label>
                    <b>Email</b>
                  </label>
                  <input
                    onChange={(e) => {
                      this.emailchange(e);
                    }}
                    value={this.state.email}
                    type="email"
                    className="form-control"
                  ></input>
                </div>
                <div className="form-group">
                  <label>
                    <b>Password</b>
                  </label>
                  <input
                    onChange={(e) => {
                      this.passwordchange(e);
                    }}
                    value={this.state.password}
                    type="password"
                    className="form-control"
                  ></input>
                </div>
                <div className="form-group">
                  <label>
                    <b>Image</b>
                  </label>
                  <input
                    onChange={(e) => {
                      this.image_namechange(e);
                    }}
                    value={this.state.image_name}
                    type="file"
                    className="form-control"
                  ></input>
                </div>
                <button className="btn btn-block btn-primary">Submit</button>
              </form>
            </div>
            <div className="col-9 mt-5">
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Email</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.users.map((user) => (
                    <tr key={user._id}>
                      <td>{user._id}</td>
                      <td>{user.name}</td>
                      <td>
                        <img
                          alt="image_name"
                          src={user.image_name}
                          style={{ width: 100 }}
                        ></img>
                      </td>
                      <td>{user.email}</td>
                      <td>
                        <button
                          onClick={(e) => this.getone(user._id)}
                          className="btn btn-sm btn-primary"
                        >
                          <i className="fa fa-pencil"></i>
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={(e) => this.delete(user._id)}
                          className="btn btn-sm btn-danger"
                        >
                          <i className="fa fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* <div className="col"></div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default Users;
