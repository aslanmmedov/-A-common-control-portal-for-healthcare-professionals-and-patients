import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import controller from "../../../../Api/controllers";
import { endpoints } from "../../../../Api/constants";
import "./register.scss";
const RegisterSchema = Yup.object().shape({
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});
const RegisterDoctor = () => {
  const { id } = useParams();
  
  const navigate = useNavigate(null);
  return (
    <>
      <section id="registerPatient">
        <div className="registerPatient">
          <div className="first-section">
            <div className="choiceBox">
              <div className="first">
                <h1>Qeydiyyat</h1>
              </div>
            </div>
            <div className="authBox">
              <div className="auth-form">
                <Formik
                  initialValues={{
                    email: "",
                    password: "",
                  }}
                  validationSchema={RegisterSchema}
                  onSubmit={async (values) => {
                    const data = await controller.editDataById(
                      endpoints.doctors,
                      id,
                      values
                    );
                    {data.message === "Succesfuly registered" ? navigate(`/doctor`):null}
                  }}
                >
                  {({ errors, touched }) => (
                    <Form>
                      <div className="first">
                        <Field
                          name="email"
                          placeholder="Email adresi təyin edin"
                          className="input"
                        />
                        {errors.email && touched.email ? (
                          <div className="errorMesage">{errors.email}</div>
                        ) : null}
                        <Field
                          name="password"
                          placeholder="Giriş parolu təyin edin"
                          className="input"
                          type = "password"
                        />
                        {errors.password && touched.password ? (
                          <div className="errorMesage">{errors.password}</div>
                        ) : null}
                      </div>
                      <div className="btn">
                        <button type="submit" className="submit">
                          Təsdiqlə!
                        </button>
                        <div className="already">
                          <NavLink to="/access">Hesabınız var?</NavLink>
                        </div>
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

export default RegisterDoctor;
