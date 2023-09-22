import  Axios  from "axios";
import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';

const CreateProduct = () => {
  const navigate = useNavigate();

  let [product, setProduct] = useState({
    name: "",
    image: "",
    price: "",
    qty: "",
    info: "",
  });

  let [isSubmitted, setIsSubmitted] = useState(false);

  let updateInput = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  let updateImage = async (e) => {
    let imageFile = e.target.files[0];
    let base64Image = await convertBase64String(imageFile);
    setProduct({
      ...product,
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

  let submitCreateProduct = (e) => {
    e.preventDefault();
    let dataURL = "http://127.0.0.1:7000/api/products/";
    Axios.post(dataURL, product)
      .then(() => {
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
          <section className="p-3">
            <div className="container">
              <div className="row">
                <div className="col">
                  <p className="h3 text-success">Create product</p>
                  <p>
                    Lorem50ghj hjjhjx fcfac fxxcghas gvdayu ghdvgshg hghdjsh
                    hgdwuy yudfuuw gdvyewu hjqw
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
                    <div className="card-header bg-success text-white">
                      <p className="h4"> Create Product</p>
                    </div>
                    <div className="card-body rgba-green-light">
                      <form onSubmit={submitCreateProduct}>
                        <div className="form-group mb-3">
                          <input
                            required
                            name="name"
                            type="text"
                            value={product.name}
                            onChange={updateInput}
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
                              {product.image.length > 0 ? (
                                <img
                                  src={product.image}
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
                            value={product.price}
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
                            value={product.qty}
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
                            value={product.info}
                            onChange={updateInput}
                            className="form-control"
                            placeholder="info"
                          />
                        </div>
                        <div style={{marginLeft:'150px'}}>
                          <input
                            type="submit"
                            className="btn btn-sm btn-success ml-9"
                          />
                        </div>
                      </form>
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

export default CreateProduct;
