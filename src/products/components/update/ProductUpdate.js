import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProductUpdate = () => {
  let navigate = useNavigate();
  let productId = useParams().productId;
  let [selectedProduct, setSelectedProduct] = useState({
    name: "",
    image: "",
    price: "",
    qty: "",
    info: "",
  });

  let [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    let dataURL = `http://127.0.0.1:7000/api/products/${productId}`;
    axios
      .get(dataURL)
      .then((res) => {
        let product = res.data.product;
        setSelectedProduct({
          ...selectedProduct,
          name: product.name ? product.name : "",
          image: product.image ? product.image : "",
          price: product.price ? product.price : "",
          qty: product.qty ? product.qty : "",
          info: product.info ? product.info : "",
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }, [productId]);

  let updateInput = (e) => {
    setSelectedProduct({
      ...selectedProduct,
      [e.target.name]: e.target.value,
    });
  };

  let updateImage = async (e) => {
    let imageFile = e.target.files[0];
    let base64Image = await convertBase64String(imageFile);
    setSelectedProduct({
      ...selectedProduct,
      image: base64Image,
    });
  };

  let convertBase64String = (imageFile) => {
    return new Promise((resolve, reject) => {
      let fileReader = new FileReader();
      fileReader.readAsDataURL(imageFile);
      fileReader.addEventListener("load", () => {
        if (fileReader.result) {
          resolve(fileReader.result);
        } else {
          reject("error accured");
        }
      });
    });
  };

  let submitUpdateProduct = (e) => {
    let dataURL = `http://127.0.0.1:7000/api/products/${productId}`;
    axios
      .put(dataURL, selectedProduct)
      .then(() => {
        console.log("ububyuuini")
        setIsSubmitted(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <React.Fragment>
      {isSubmitted ? (
        navigate("/products/admin")
      ) : (
        <React.Fragment>
          <section> 
            <div className="container">
              <div className="row">
                <div className="col">
                  <p className="h3 text-secondary">update product</p>
                  <p>
                    lorem jh ffif irhronp jfvnivjrin jnejinjcni idnicn jinen
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section className="p-3">
            <div className="container">
              <div className="row">
                <div className="col-md-4">
                  <div className="card">
                    <div className="card-header bg-secondary text-white">
                      <p>Update Product</p>
                    </div>
                    <div className="card-body rgba-purple-light">
                      <div>
                        <div className="form-group mb-3">
                          <input
                            required
                            name="name"
                            value={selectedProduct.name}
                            onChange={updateInput}
                            type="text"
                            className="form-control"
                            placeholder="name"
                          />
                        </div>
                        <div className=" form-group mb-3">
                          <div className="custom-file form-control">
                            <input
                              className="custom-file-input"
                              type="file"
                              id="customFile"
                              onChange={updateImage}
                            />

                            <label
                              for="customFile"
                              className="custom-file-label"
                            >
                              {selectedProduct.image.length > 0 ? (
                                <img
                                  src={selectedProduct.image}
                                  height="35"
                                  width="35"
                                  alt=""
                                />
                              ) : (
                                "product image"
                              )}
                            </label>
                          </div>
                        </div>
                        <div className="form-group mb-3">
                          <input
                            required
                            name="price"
                            type="text"
                            value={selectedProduct.price}
                            onChange={updateInput}
                            className="form-control"
                            placeholder="price"
                          />
                        </div>
                        <div className="form-group mb-3">
                          <input
                            required
                            name="qty"
                            type="text"
                            value={selectedProduct.qty}
                            onChange={updateInput}
                            className="form-control"
                            placeholder="qty"
                          />
                        </div>
                        <div className="form-group mb-3">
                          <textarea
                            required
                            name="info"
                            rows="3"
                            value={selectedProduct.info}
                            onChange={updateInput}
                            className="form-control"
                            placeholder="info"
                          />
                        </div>
                        <div style={{ marginLeft: "150px" }}>
                          {/* <input
                            type="submit"
                            className="btn btn-secondary ml-9"
                            value="Update"
                          /> */}
                          <button type="submit" className="btn btn-success" onClick={submitUpdateProduct}>update</button>
                        </div>  
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ProductUpdate;
