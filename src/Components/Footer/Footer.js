import React from 'react'
const Footer = () => {
  return (
    <footer className="pt-5" style={{ backgroundColor: "#f7f7f7" }}>
        <div className="container text-center">
          <h2 className="fs-1 fw-bold my-5">
          AWFER MARKIT
          </h2>
          <div className="row my-5">
            <div className="col-6 col-md-4">
              <h3 className="fw-bold">Products</h3>
              <ul>
                <li>
                  <a className='text-secondary fw-bold' href="#">AWFER MARKIT</a>
                </li>
                <li>
                  <a className='text-secondary fw-bold' href="#">AWFER MARKIT</a>
                </li>
              </ul>
            </div>
            <div className="col-6 col-md-4">
              <h3 className="fw-bold">Resources</h3>
              <ul>
                <li>
                  <a className='text-secondary fw-bold' href="#">w3schools</a>
                </li>
                <li>
                  <a className='text-secondary fw-bold' href="#">React document</a>
                </li>
                <li>
                  <a className='text-secondary fw-bold' href="#">Redux toolkit document</a>
                </li>
              </ul>
            </div>
            <div className="col-6 col-md-4">
              <h3 className="fw-bold">Company</h3>
              <ul>
                <li>
                  <a className='text-secondary fw-bold' href="#">INS</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="d-flex justify-content-evenly">
            <p>Copyright © 2024 - INS team</p>
            <ul className="d-flex">
              <li className="me-3">
                <a href="..">
                  <i className="fa-brands fa-twitter text-info "></i>
                </a>
              </li>
              <li className="me-3">
                <a href="..">
                  <i className="fa-brands fa-linkedin"></i>
                </a>
              </li>
              <li className="me-3">
                <a href="..">
                  <i className="fa-brands fa-facebook"></i>
                </a>
              </li>
              <li>
                <a href="..">
                  <i className="fa-brands fa-youtube text-danger"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
  )
}

export default Footer