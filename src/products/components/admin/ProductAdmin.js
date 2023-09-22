import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ProductAdmin = () => {
  let [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts()
  });

  let getAllProducts = () =>{
    let dataURL = "http://127.0.0.1:7000/api/products/";
    axios
      .get(dataURL)
      .then((res) => {
        setProducts(res.data.product);
      })
      .catch((err) => {
        console.error(err);
      });
  }
let clickDeleteProduct = (productId) =>{
      let dataURL = `http://127.0.0.1:7000/api/products/${productId}`
      axios.delete(dataURL).then(()=>{
        getAllProducts()
      }).catch((err)=>{
        console.error(err)
      })
}


  return (
    <React.Fragment>
      <section className="p-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h3 text-success">Product Admin</p>
              <p>
                Lorem50 gh dgfghjk dgfghhjjkk fgfhjk ffghjk xghj ghghj fghghjjk
                gghdfghj ghj ghj ghhj c
              </p>
              <Link to="/products/create" className="btn btn-success btn-sm">
                Create Product
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="row">
            <div className="col">
              <table className="table table-hover text-center table-stripped table-success">
                <thead className="bg-dark text-success">
                  <tr>
                    <th>SNO</th>
                    <th>Product</th>
                    <th>Name</th>
                    <th>price</th>
                    <th>qty</th>
                    <th>actions</th>
                  </tr>
                </thead>
                {products.length > 0 ? (
                  <tbody>
                    {products.map((product) => {
                      return (
                        <tr key={product._id}>
                          <td>{product._id.substr(product._id.length - 5)}</td>
                          <td><img src={product.image} alt="" height="50" width="50"/></td>
                          <td>{product.name}</td>
                          <td> &#8377; {product.price.toFixed(2)}</td>
                          <td>{product.qty} kgs</td>
                          <td>
                            <Link to ={`/products/${product._id}`} className="btn btn-secondary btn-sm">Update</Link>
                            <button className="btn btn-danger btn-sm" onClick={clickDeleteProduct.bind(this ,product._id)}>delete</button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                ) : (
                  <tbody>
                    <tr>
                      <td>
                        ------------------ no products found
                        ------------------------
                      </td>
                    </tr>
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default ProductAdmin;
