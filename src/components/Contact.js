import React from "react";
import Footer from "./Footer";
import Bar from "./Bar";
import Styles from "./Contact.module.css";
import Groupnt from "../Assets/Groupnt.png";
import Groupse from "../Assets/Groupse.png";
import Groupsei from "../Assets/Groupsei.png";

export default function Contact() {
  return (
    <>
      <div className={Styles.rmvoverflow}>
        <div className={Styles.Blognavback}>
          <Bar />
        </div>
        <div style={{ backgroundColor: "#FBFBFB" }} className="pb-5">
          <div className={`${Styles.Blogback} text-center pt-5`}>
            <div className="container col-lg-9">
              <div className="text-white text-start pt-5">
                <h4 className={`${Styles.bloghead} fw-bold mt-2`}>
                  Contact With Us
                </h4>
                <p className={`${Styles.blogpara}`}>
                  We are here for your assistance
                </p>
              </div>
            </div>
          </div>
          <div className="container col-lg-9 my-5 card border-0 shadow">
            <div className="row">
              <div className={`col-lg-7 col-sm-6 my-5 mx-4 ${Styles.first}`}>
                <div className="mb-4">
                  <p className={`${Styles.contctformhead} fw-bold mb-0`}>
                    Get In Touch
                  </p>
                  <p className={`m-0 ${Styles.nsrform}`}>
                    Do you have questions or suggestions ?
                  </p>
                </div>
                <form className="my-1">
                  <div className="mb-4">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className={`form-label fw-bold ${Styles.frmlabel}`}
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      className="form-control py-2 rounded-1"
                      id="exampleFormControlInput1"
                      placeholder="Your Name"
                    />
                  </div>
                  <div className="mb-3 pt-2">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className={`form-label fw-bold ${Styles.frmlabel}`}
                    >
                      Email address
                    </label>
                    <input
                      type="email"
                      className="form-control py-2 rounded-1"
                      id="exampleFormControlInput1"
                      placeholder="someone@gmail.com"
                    />
                  </div>
                  <div className="mb-3 mt-4">
                    <label
                      htmlFor="exampleFormControlTextarea1"
                      className={`form-label fw-bold ${Styles.frmlabel}`}
                    >
                      Your Message
                    </label>
                    <textarea
                      className="form-control rounded-1"
                      id="exampleFormControlTextarea1"
                      rows={7}
                      defaultValue={""}
                      placeholder="Write Something..."
                    />
                  </div>
                  <button
                    type="submit"
                    class={`btn btn-primary rounded-pill my-2 p-0 ${Styles.formbtn}`}
                  >
                    Submit
                  </button>
                </form>
              </div>
              <div className="col-lg-4 col-sm-6 m-auto me-0">
                <div
                  className={`${Styles.sidedivbck} text-center rounded-1 ms-5 w-100`}
                >
                  <br />
                  <p
                    className={`${Styles.frmsidehead} py-1 mt-2 bg-white fw-bold`}
                  >
                    Meet In Person
                  </p>

                  <div className={`my-5 ${Styles.formsidediv}`}>
                    <div
                      className={`${Styles.nsbbc} col-8 my-5`}
                      style={{ color: "#737373" }}
                    >
                      <div className="d-flex my-2">
                        <div>
                          <img
                            src={Groupse}
                            width={54}
                            height={54}
                            alt="Picture of the author"
                            className="mx-4"
                          />
                        </div>
                        <div className="text-white text-start">
                          <p className="mt-1">+1-212-1234567 +1-212-1234567</p>
                        </div>
                      </div>
                      <br />
                      <div className="d-flex my-2">
                        <div>
                          <img
                            src={Groupnt}
                            width={54}
                            height={54}
                            alt="Picture of the author"
                            className="mx-4"
                          />
                        </div>
                        <div className="text-white text-start">
                          <p className="mt-3">info@look4ads.com</p>
                        </div>
                      </div>
                      <br />
                      <div className="d-flex my-2">
                        <div>
                          <img
                            src={Groupsei}
                            width={54}
                            height={54}
                            alt="Picture of the author"
                            className="mx-4 mt-2"
                          />
                        </div>
                        <div className="text-white col-lg-10 text-start">
                          <p className="">
                            77 Westbury Road, Birmingham, England, B17 8HY
                          </p>
                        </div>
                      </div>
                      <br />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container col-lg-9 col-sm-12 text-center">
            <h4 className={`${Styles.blogsehead} fw-bold mb-4 pt-4`}>
              You Can Also Find Us On:
            </h4>
          </div>
          <br />
          <div className="container-fluid bg-white">
            <div className="row">
              <div className="col-3 bg-primary text-center">
                <i
                  class={`${Styles.justfntsize} fa fa-instagram text-white mx-2  my-4`}
                  aria-hidden="true"
                ></i>
              </div>

              <div className="text-center col-3">
                <i
                  class={`fa fa-linkedin text-primary m-2 my-4 ${Styles.justfntsize}`}
                  aria-hidden="true"
                ></i>
              </div>
              <div
                className="vr text-center opacity-100"
                style={{
                  padding: "0.1px",
                  height: "67px",
                  marginLeft: "-5px",
                  backgroundColor: "#707070",
                }}
              ></div>

              <div className="col-3 text-center">
                <i
                  class={`${Styles.justfntsize} fa fa-twitter text-primary m-2 my-4`}
                  aria-hidden="true"
                ></i>
              </div>
              <div
                className="vr text-center opacity-100"
                style={{
                  padding: "0.3px",
                  height: "67px",
                  marginLeft: "-5px",
                  backgroundColor: "#707070",
                }}
              ></div>

              <div className="col-2 text-center">
                <i
                  class={`${Styles.justfntsize} fa fa-facebook text-primary mx-2 my-4`}
                  aria-hidden="true"
                ></i>
              </div>
            </div>
          </div>
        </div>

        <div className="text-start">
          <div
            class="divider"
            style={{
              background: "linear-gradient(to right,#597CAE, #F48FC4)",
              padding: "3px",
            }}
          ></div>
          <Footer />
        </div>
      </div>
    </>
  );
}
