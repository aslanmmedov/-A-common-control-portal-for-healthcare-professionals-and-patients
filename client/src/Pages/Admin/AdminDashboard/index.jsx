import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Swal from "sweetalert2";
import "./index.scss";
import controller from "../../../Api/controllers";
import { endpoints } from "../../../Api/constants";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
const AdminDashboard = () => {
  const [page, setPage] = useState("XB");
  const [news, setNews] = useState([]);
  const [dNews, setDnews] = useState([]);
  const [id, setId] = useState("");
  const [existingData, setExistingData] = useState(null);
  const [existingDaata, setExistingDaata] = useState(null);
  const GetAllNews = async () => {
    const { data } = await controller.getAllData(endpoints.news);
    console.log(data);
    setNews(data);
  };
  const GetAllDNews = async () => {
    const { data } = await controller.getAllData(endpoints.d_news);
    setDnews(data);
  };
  const GetDNewsById = async () => {
    if (id) {
      const { data } = await controller.getDataById(endpoints.d_news, id);
      // console.log("id",data);
      setExistingData(data);
    }
  };
  const GetNewsById = async () => {
    if (id) {
      const { data } = await controller.getDataById(endpoints.news, id);
      console.log("id",data);
      setExistingDaata(data);
    }
  };
  useEffect(() => {
    GetDNewsById();
    GetNewsById();
  }, [id]);
  useEffect(() => {
    GetAllNews();
    GetAllDNews();
  }, []);

  const handleDelete = async (id) => {
    const data = await controller.deleteDataById(endpoints.news, id);
    GetAllNews();
  };
  const handleDeleteDNews = async (id) => {
    const data = await controller.deleteDataById(endpoints.d_news, id);
    GetAllDNews();
  };
  const NewsSchema = Yup.object().shape({
    name: Yup.string()
      .required("Required"),
    image: Yup.string().required("Required"),
    news: Yup.string().required("Required"),
  });
  const DNewsSchema = Yup.object().shape({
    name: Yup.string()
      .required("Required"),
    image: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
  });
  return (
    <>
      <main id="adminPage">
        <div className="container">
          <div className="panel">
            <div className="side">
              <div className="ul">
                <ul>
                  <li>
                    <button
                      onClick={() => {
                        setPage("XB");
                      }}
                    >
                      Xəbərlər(Ana səhifə)
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        setPage("XH");
                      }}
                    >
                      Xəbərlər(Həkimlər üçün)
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div className="main">
              {page === "XB" && news.length > 0 ? (
                <div>
                  <div className="flex">
                  <div className="addForm">
                    <h1>Xəbər əlavə edin (Əsas)</h1>
                    <Formik
                      initialValues={{
                        name: "",
                        news: "",
                        image: null,
                      }}
                      validationSchema={NewsSchema}
                      onSubmit={async (values) => {
                        const formData = new FormData();
                        formData.append("name", values.name);
                        formData.append("news", values.news);
                        formData.append("image", values.image);
                        console.log(formData);
                        await controller.addNewData(endpoints.news, formData);
                        GetAllNews();
                      }}
                    >
                      {({ errors, touched }) => (
                        <Form>
                          <Field
                            name="name"
                            placeholder="Xəbərin adını daxil edin"
                          />
                          {errors.name && touched.name ? (
                            <div>{errors.name}</div>
                          ) : null}
                          <Field
                            name="news"
                            placeholder="Xəbərin mətnini daxil edin"
                          />
                          {errors.news && touched.news ? (
                            <div>{errors.news}</div>
                          ) : null}
                          <Field name="image">
                            {({ field, form }) => (
                              <input
                                type="file"
                                className="file"
                                onChange={(event) => {
                                  form.setFieldValue(
                                    "image",
                                    event.currentTarget.files[0]
                                  );
                                }}
                              />
                            )}
                          </Field>
                          {errors.image && touched.image ? (
                            <div>{errors.image}</div>
                          ) : null}
                          <button type="submit">Submit</button>
                        </Form>
                      )}
                    </Formik>
                  </div>
                  {id && existingDaata !== null && (
                      <div className="editForm">
                        <div className="editForm">
                          <h1>Xəbəri redaktə edin</h1>
                          <Formik
                            initialValues={{
                              name: existingDaata?.name || "",
                              news: existingDaata?.news || "",
                              image: null,
                            }}
                            validationSchema={NewsSchema}
                            onSubmit={async (values) => {
                              const formData = new FormData();
                              formData.append("name", values.name);
                              formData.append(
                                "news",
                                values.news
                              );
                              if (values.image) {
                                formData.append("image", values.image);
                              }
                              await controller.editDataById(
                                endpoints.news,
                                existingDaata._id,
                                formData
                              );
                              GetAllNews();
                            }}
                          >
                            {({ errors, touched }) => (
                              <Form>
                                <Field
                                  name="name"
                                  placeholder="Xəbərin adını redaktə edin"
                                />
                                {errors.name && touched.name ? (
                                  <div>{errors.name}</div>
                                ) : null}
                                <Field
                                  name="news"
                                  placeholder="Xəbərin mətnini redaktə edin"
                                />
                                {errors.news && touched.news ? (
                                  <div>{errors.news}</div>
                                ) : null}
                                <Field name="image">
                                  {({ field, form }) => (
                                    <input
                                      type="file"
                                      className="file"
                                      onChange={(event) => {
                                        form.setFieldValue(
                                          "image",
                                          event.currentTarget.files[0]
                                        );
                                      }}
                                    />
                                  )}
                                </Field>
                                {errors.image && touched.image ? (
                                  <div>{errors.image}</div>
                                ) : null}
                                <div className="btns">
                                  <button type="submit">Təstiq</button>
                                  <button
                                    onClick={() => {
                                      setId(null);
                                      setExistingDaata(null);
                                    }}
                                  >
                                    Çıxış
                                  </button>
                                </div>
                              </Form>
                            )}
                          </Formik>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="News">
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 400 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Image</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">description</TableCell>
                            <TableCell align="right">Date</TableCell>
                            <TableCell align="right">Actions</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {news.map((row) => (
                            <TableRow
                              key={row.name}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                <img src={row.image} alt="" />
                              </TableCell>
                              <TableCell align="right">{row.name}</TableCell>
                              <TableCell align="right">{row.news}</TableCell>
                              <TableCell align="right">{row.date}</TableCell>
                              <TableCell align="right">
                                <button
                                  className="btnDelete"
                                  onClick={() => {
                                    Swal.fire({
                                      title: "Are you sure?",
                                      text: "You won't be able to revert this!",
                                      icon: "warning",
                                      showCancelButton: true,
                                      confirmButtonColor: "#3085d6",
                                      cancelButtonColor: "#d33",
                                      confirmButtonText: "Yes, delete it!",
                                    }).then((result) => {
                                      if (result.isConfirmed) {
                                        handleDelete(row._id);
                                        Swal.fire({
                                          title: "Deleted!",
                                          text: "Your file has been deleted.",
                                          icon: "success",
                                        });
                                      }
                                    });
                                  }}
                                >
                                  Delete
                                </button>
                                <br />
                                <br />
                                <button className="btnEdit" onClick={() => {
                                    setId(row._id);
                                  }}>Edit</button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                </div>
              ) : null}
              {page === "XH" && dNews.length > 0 ? (
                <div>
                  <div className="flex">
                    <div className="addForm">
                      <h1>Xəbər əlavə edin(Tibb işçiləri)</h1>
                      <Formik
                        initialValues={{
                          name: "",
                          description: "",
                          image: null,
                        }}
                        validationSchema={DNewsSchema}
                        onSubmit={async (values) => {
                          const formData = new FormData();
                          formData.append("name", values.name);
                          formData.append("description", values.description);
                          formData.append("image", values.image);
                          console.log(formData);
                          await controller.addNewData(
                            endpoints.d_news,
                            formData
                          );
                          GetAllDNews();
                        }}
                      >
                        {({ errors, touched }) => (
                          <Form>
                            <Field
                              name="name"
                              placeholder="Xəbərin adını daxil edin"
                            />
                            {errors.name && touched.name ? (
                              <div>{errors.name}</div>
                            ) : null}
                            <Field
                              name="description"
                              placeholder="Xəbərin mətnini daxil edin"
                            />
                            {errors.description && touched.description ? (
                              <div>{errors.description}</div>
                            ) : null}
                            <Field name="image">
                              {({ field, form }) => (
                                <input
                                  type="file"
                                  className="file"
                                  onChange={(event) => {
                                    form.setFieldValue(
                                      "image",
                                      event.currentTarget.files[0]
                                    );
                                  }}
                                />
                              )}
                            </Field>
                            {errors.image && touched.image ? (
                              <div>{errors.image}</div>
                            ) : null}
                            <button type="submit">Submit</button>
                          </Form>
                        )}
                      </Formik>
                    </div>
                    {id && existingData !== null && (
                      <div className="editForm">
                        <div className="editForm">
                          <h1>Xəbəri redaktə edin</h1>
                          <Formik
                            initialValues={{
                              name: existingData?.name || "",
                              description: existingData?.description || "",
                              image: null,
                            }}
                            validationSchema={DNewsSchema}
                            onSubmit={async (values) => {
                              const formData = new FormData();
                              formData.append("name", values.name);
                              formData.append(
                                "description",
                                values.description
                              );
                              if (values.image) {
                                formData.append("image", values.image);
                              }
                              await controller.editDataById(
                                endpoints.d_news,
                                existingData._id,
                                formData
                              );
                              GetAllDNews();
                            }}
                          >
                            {({ errors, touched }) => (
                              <Form>
                                <Field
                                  name="name"
                                  placeholder="Xəbərin adını redaktə edin"
                                />
                                {errors.name && touched.name ? (
                                  <div>{errors.name}</div>
                                ) : null}
                                <Field
                                  name="description"
                                  placeholder="Xəbərin mətnini redaktə edin"
                                />
                                {errors.description && touched.description ? (
                                  <div>{errors.description}</div>
                                ) : null}
                                <Field name="image">
                                  {({ field, form }) => (
                                    <input
                                      type="file"
                                      className="file"
                                      onChange={(event) => {
                                        form.setFieldValue(
                                          "image",
                                          event.currentTarget.files[0]
                                        );
                                      }}
                                    />
                                  )}
                                </Field>
                                {errors.image && touched.image ? (
                                  <div>{errors.image}</div>
                                ) : null}
                                <div className="btns">
                                  <button type="submit">Təstiq</button>
                                  <button
                                    onClick={() => {
                                      setId(null);
                                      setExistingData(null);
                                    }}
                                  >
                                    Çıxış
                                  </button>
                                </div>
                              </Form>
                            )}
                          </Formik>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="News">
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 400 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Image</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">description</TableCell>
                            <TableCell align="right">Date</TableCell>
                            <TableCell align="right">Actions</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {dNews.map((row) => (
                            <TableRow
                              key={row.name}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                <img src={row.image} alt="" />
                              </TableCell>
                              <TableCell align="right">{row.name}</TableCell>
                              <TableCell align="right">
                                {row.description}
                              </TableCell>
                              <TableCell align="right">{row.date}</TableCell>
                              <TableCell align="right">
                                <button
                                  className="btnDelete"
                                  onClick={() => {
                                    Swal.fire({
                                      title: "Are you sure?",
                                      text: "You won't be able to revert this!",
                                      icon: "warning",
                                      showCancelButton: true,
                                      confirmButtonColor: "#3085d6",
                                      cancelButtonColor: "#d33",
                                      confirmButtonText: "Yes, delete it!",
                                    }).then((result) => {
                                      if (result.isConfirmed) {
                                        handleDeleteDNews(row._id);
                                        Swal.fire({
                                          title: "Deleted!",
                                          text: "Your file has been deleted.",
                                          icon: "success",
                                        });
                                      }
                                    });
                                  }}
                                >
                                  Delete
                                </button>
                                <br />
                                <br />
                                <button
                                  className="btnEdit"
                                  onClick={() => {
                                    setId(row._id);
                                  }}
                                >
                                  Edit
                                </button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default AdminDashboard;
