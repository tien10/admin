import React from "react";

import axios from "axios";
import Nav from "./Nav";

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      name: "",
      kind: "",
      price: 0,
      image_name: "",
      id: 0,
    };
  }

  componentDidMount() {
    axios.get("https://web-bh-api.herokuapp.com/list_product").then((res) => {
      console.log("get list products: ", res);
      this.setState({
        products: res.data.data,
        name: "",
        kind: "",
        price: "",
        image_name: "",
        id: 0,
      });
    });
  }

  namechange = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  kindchange = (e) => {
    this.setState({
      kind: e.target.value,
    });
  };

  pricechange = (e) => {
    this.setState({
      price: e.target.value,
    });
  };

  imagechange = (e) => {
    this.setState({
      image_name: e.target.value,
    });
  };

  submit(e, id) {
    e.preventDefault();
    if (id === 0) {
      axios
        .post("https://web-bh-api.herokuapp.com/insert_product", {
          name: this.state.name,
          kind: this.state.kind,
          price: this.state.price,
          image_name: this.state.image_name,
        })
        .then((res) => {
          console.log("them moi 1 product: ", res);
          this.componentDidMount();
        });
    } else {
      axios
        .put(`https://web-bh-api.herokuapp.com/update_product/${id}`, {
          name: this.state.name,
          kind: this.state.kind,
          price: this.state.price,
          image_name: this.state.image_name,
        })
        .then((res) => {
          console.log("update 1 product: ", res);
          this.componentDidMount();
        });
    }
  }

  delete(id) {
    console.log("id de delete: ", id);
    axios
      .delete(`https://web-bh-api.herokuapp.com/delete_product/${id}`)
      .then((res) => {
        console.log("delete 1 product: ", res);
        this.componentDidMount();
      });
  }

  getone(id) {
    console.log("id de get 1 product: ", id);
    axios
      .get(`https://web-bh-api.herokuapp.com/get_product_id/${id}`)
      .then((res) => {
        console.log("get 1 product: ", res);
        this.setState({
          name: res.data.data.name,
          kind: res.data.data.kind,
          price: res.data.data.price,
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
                    <b>Kind</b>
                  </label>
                  <input
                    onChange={(e) => {
                      this.kindchange(e);
                    }}
                    value={this.state.kind}
                    type="text"
                    className="form-control"
                  ></input>
                </div>
                <div className="form-group">
                  <label>
                    <b>Price</b>
                  </label>
                  <input
                    onChange={(e) => {
                      this.pricechange(e);
                    }}
                    value={this.state.price}
                    type="number"
                    className="form-control"
                  ></input>
                </div>
                {/* <div className="form-group">
                  <label>
                    <b>Image</b>
                  </label>
                  <input
                    onChange={(e) => {
                      this.imagechange(e);
                    }}
                    value={this.state.image_name}
                    type="text"
                    className="form-control"
                  ></input>
                </div> */}
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
                    <th>Kind</th>
                    <th>Price</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.products.map((product) => (
                    <tr key={product._id}>
                      <td>{product._id}</td>
                      <td>{product.name}</td>
                      <td>
                        <img
                          alt="image_name"
                          src={product.image_name}
                          style={{ width: 100 }}
                        ></img>
                      </td>
                      <td>{product.kind}</td>
                      <td>{product.price}</td>
                      <td>
                        <button
                          onClick={(e) => this.getone(product._id)}
                          className="btn btn-sm btn-primary"
                        >
                          <i className="fa fa-pencil"></i>
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={(e) => this.delete(product._id)}
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

export default Products;
