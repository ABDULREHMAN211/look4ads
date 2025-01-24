import React from "react";
import Styles from "./Footer.module.css";
import logo from "../Assets/logo.png";

export default function Footer() {
  return (
    <div className={`${Styles.backcolor} pt-3 `}>
      <div
        className={`${Styles.backcolor} container col-lg-9  col-sm-12 text-white`}
      >
        <div className="row my-5">
          <div className="col-lg-4 col-sm-4">
            <ul className="list-unstyled list-group">
              <li className={`${Styles.fheadings} fw-bold my-2`}>
                Products
              </li>
              <li className={`${Styles.fbtngrop} my-2 `}>Bill Boards</li>
              <li className={`${Styles.fbtngrop} my-2 `}>Digital</li>
              <li className={`${Styles.fbtngrop} my-2 `}>Wall Scapes</li>
              <li className={`${Styles.fbtngrop} my-2 `}>AirPort</li>
            </ul>
          </div>
          <div className="col-lg-4 col-sm-4">
            <ul className="list-unstyled list-group">
              <li className={`${Styles.fheadings} fw-bold my-2`}>
                Advertising Resources
              </li>
              <li className={`${Styles.fbtngrop} my-2 `}>Design Gallery</li>
              <li className={`${Styles.fbtngrop} my-2 `}>Design Tips</li>
              <li className={`${Styles.fbtngrop} my-2 `}>Research</li>
              <li className={`${Styles.fbtngrop} my-2 `}>Office Locations</li>
            </ul>
          </div>
          <div className="col-lg-4 col-sm-4">
            <ul className="list-unstyled list-group">
              <li className={`${Styles.fheadings} fw-bold my-2`}>About Us</li>
              <li className={`${Styles.fbtngrop} my-2 `}>News</li>
              <li className={`${Styles.fbtngrop} my-2 `}>Careers</li>
              <li className={`${Styles.fbtngrop} my-2 `}>Lease Your Land</li>
              <li className={`${Styles.fbtngrop} my-2 `}>Giving Back</li>
            </ul>
          </div>
        </div>
      </div>

      {/* new */}
      <div className={`${Styles.footerback} mt-5`}>
        <div className="container py-1">
          <div className={`${Styles.fblack} row mx-5`}>
            <div className="col-lg-6 col-sm-6">
              <span className="text-white" style={{ fontSize: "13px" }}>
                &#169; 2025 Look 4 Ads. All Rights Reserved.
              </span>
            </div>
            <div className={`${Styles.lastrep} col-lg-6 col-sm-6 row`}>
              <div className="col-lg-4 col-sm-4">
                <span className={`${Styles.decffntsize} text-white float-end`}>
                  Refund Policy
                </span>
              </div>
              <div className="col-lg-4 col-sm-4">
                <span className={`${Styles.decffntsize} text-white float-end`}>
                  Privacy Policy
                </span>
              </div>
              <div className="col-lg-4 col-sm-4">
                <span className={`${Styles.decffntsize} text-white float-end`}>
                  Terms Of Service
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
