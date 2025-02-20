import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import controller from "../../../../Api/controllers";
import { endpoints } from "../../../../Api/constants";
import { useNavigate } from "react-router-dom";
import "./auth.scss";
const AuthWithFin = Yup.object().shape({
  fin: Yup.string()
    .min(6, "Too Short!")
    .max(8, "Too Long!")
    .required("Required"),
});
const AuthDoctor = () => {
  const navigate = useNavigate(null);
  const [UserId, setUserId] = useState("");
  const [condition, setCondition] = useState("");

  const handleChoice = (c) => {
    setChoice(c);
  };

  return (
    <>
      <section id="authPatient">
        <div className="authPatient">
          <div className="first-section">
            <div className="choiceBox">
              <div className="first">
                <h1>Autentifikasiya</h1>
              </div>
              {/* <div className="second">
              <button onClick={() => handleChoice("fin")} className="choice choiceOne">
                Fin ilə doğrulama
              </button>
              <button onClick={() => handleChoice("shadetname")} className="choice choiceTwo">
                Şəhadətnamə ilə doğrulama
              </button>
              </div> */}
            </div>
            <div className="authBox">
              <div className="auth-form">
                <Formik
                  initialValues={{
                    fin: "",
                  }}
                  validationSchema={AuthWithFin}
                  onSubmit={async (values) => {
                    const data = await controller.addNewData(
                      endpoints.doctor_authentication,
                      values
                    );
                    console.log(data.message);
                    if (data.message !== "Succes") {
                      if (data.message === "You already have an account!") {
                        return setCondition(data.message);
                      }
                      setUserId(null);
                    }
                    {
                      UserId !== null ? navigate(`/doctor/${data.data}`) : null;
                    }
                  }}
                >
                  {({ errors, touched }) => (
                    <Form>
                      <div className="first">
                        <Field
                          name="fin"
                          placeholder="Fərdi identifikatsiya nömrəsi"
                          className="input"
                        />
                        {condition === "" ? null : (
                          <p className="errorMesage">
                            Sizin hal hazırda hesabınız mövcuddur!
                          </p>
                        )}
                        {UserId !== null ? null : (
                          <p className="errorMesage">
                            Fin doğru daxil edilməyib
                          </p>
                        )}
                        {errors.fin && touched.fin ? (
                          <div className="errorMesage">{errors.fin}</div>
                        ) : null}
                      </div>
                      <div className="btn">
                        <button type="submit" className="submit">
                          Təsdiqlə
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

export default AuthDoctor;
