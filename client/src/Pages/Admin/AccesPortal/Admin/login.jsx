import React, { useContext, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { endpoints } from "../../../../Api/constants";
import controller from "../../../../Api/controllers";
import { NavLink, useNavigate } from "react-router-dom";
import "./login.scss"
import { AuthContext } from "../../../../Context/AccesContext";
const LoginSchema = Yup.object().shape({
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});
const LoginAdmin = () => {
  const navigate = useNavigate(null);
  const [message, setMessage] = useState("");

  const { token, decodedToken, handleLogin, handleLogout } = useContext(AuthContext);

  return (
    <>
      <section id="loginPatient">
        <div className="loginPatient">
          <div className="first-section">
            <div className="choiceBox">
              <div className="first">
                <h1>Admin Giriş</h1>
              </div>
            </div>
            <div className="authBox">
              <div className="auth-form">
                <Formik
                  initialValues={{
                    password: "",
                    email: "",
                  }}
                  validationSchema={LoginSchema}
                  onSubmit={async (values) => {
                    try {
                      const data = await controller.addNewData(
                        endpoints.admin_login,
                        values
                      );
                      {
                        data.message !== "Email or Password is not correct"
                          ? handleLogin(data.token,'/admin/dashboard')
                          : setMessage(data.message);
                      }
                      
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                >
                  {({ errors, touched }) => (
                    <Form>
                      <div className="first">
                        <Field
                          name="email"
                          placeholder="Email adresini daxil edin!"
                          className="input"
                        />
                        {errors.email && touched.email ? (
                          <div className="errorMesage">{errors.email}</div>
                        ) : null}
                        <Field name="password" 
                        placeholder="Giriş parolunu daxil edin!"
                        className = "input"
                        />
                        {errors.password && touched.password ? (
                          <div className="errorMesage">{errors.password}</div>
                        ) : null}
                        {message === "" ? null : (
                          <p className="errorMesage">Email və ya password yanlışdır!</p>
                        )}
                      </div>
                      <div className="btn">
                        <button type="submit" className="submit">
                          Daxil olun!
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
          <div className="second-section">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Logo_of_the_Ministry_of_Healthcare_of_Azerbaijan.png"
              alt=""
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginAdmin;
