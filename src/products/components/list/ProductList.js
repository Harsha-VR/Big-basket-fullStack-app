import axios from "axios";
import React, { useEffect, useState } from "react";

function ProductList() {
  let [products, setProducts] = useState([]);

  useEffect(() => {
    let dataURL = "http://127.0.0.1:7000/api/products";
    axios
      .get(dataURL)
      .then((res) => {
        setProducts(res.data.product);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <section className="p-3">
        <div className="container animated zoomIn delay-1s">
          <div className="row">
            <div className="col">
              <p className="h3 text-success">Product List</p>
              <p>
                Lorem50 vghb h ejdnsuhjnc dggujwhs ghjdb ghjvbdsn uhjvd gyehdjn{" "}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section>
        {products.length > 0 ? (
          <React.Fragment>
            <div className="container">
              <div className="row">
                {products.map((product) => {
                  return (
                    <div className="col-md-3" key={product._id}>
                      <div className="card mb-4">
                        <div className="card-header text-center">
                          <img src={product.image} alt="" width="150" height="150"/>
                        </div>
                        <div className="card-body">
                          <ul className="list-group">
                            <li className="list-group-item">
                              NAME : {product.name}
                            </li>
                            <li className="list-group-item">
                              Price : &#8377; {product.price.toFixed(2)}
                            </li>
                            <li className="list-group-item">
                              Qty : {product.qty} kgs
                            </li>
                            
                          </ul>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>no product found</React.Fragment>
        )}
      </section>
    </>
  );
}

export default ProductList;
