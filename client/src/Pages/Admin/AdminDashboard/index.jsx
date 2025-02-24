import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Swal from 'sweetalert2'
import "./index.scss";
import controller from "../../../Api/controllers";
import { endpoints } from "../../../Api/constants";
const AdminDashboard = () => {
  const [page, setPage] = useState("ÜN");
  const [news, setNews] = useState([]);
  const [dNews,setDnews] = useState([]);
  const GetAllNews = async () => {
    const { data } = await controller.getAllData(endpoints.news);
    console.log(data);

    setNews(data);
  };
  const GetAllDNews = async () => {
    const { data } = await controller.getAllData(endpoints.d_news);
    setDnews(data);
  };
  useEffect(() => {
    GetAllNews();
    GetAllDNews();
  }, []);

  const handleDelete = async (id) => {
      const data = await controller.deleteDataById(endpoints.news,id);
      GetAllNews();
  }
  const handleDeleteDNews = async (id) => {
    const data = await controller.deleteDataById(endpoints.d_news,id);
    GetAllDNews();
}
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
                        setPage("PS");
                      }}
                    >
                      Pasiyentlər
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        setPage("HK");
                      }}
                    >
                      Həkimlər
                    </button>
                  </li>
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
                              "&:last-child td, &:last-child th": { border: 0 },
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
                                      handleDelete(row._id)
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
                              <button className="btnEdit">Edit</button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              ) : null}
              {page === "XH" && dNews.length > 0 ? (
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
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              <img src={row.image} alt="" />
                            </TableCell>
                            <TableCell align="right">{row.name}</TableCell>
                            <TableCell align="right">{row.description}</TableCell>
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
                                      handleDeleteDNews(row._id)
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
                              <button className="btnEdit">Edit</button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
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
