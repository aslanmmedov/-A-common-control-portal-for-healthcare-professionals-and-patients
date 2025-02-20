const express = require('express')
const mongoose = require('mongoose');
const cors = require("cors")
const PatientRouter = require("./routers/PatientRouter");
const DoctorRouter = require("./routers/DoctorRouter");
const HospitalRouter = require("./routers/HospitalRouter");
const DepartmentRouter = require("./routers/DepartmentRouter");
const NewsRouter = require("./routers/NewsRouter");
const AuthPatientRouter = require("./routers/authPatientRouter");
const AuthDoctorRouter = require("./routers/authDoctorRouter");
const app = express()
const port = 8080
const path = require("path");

app.use(cors());
app.use(express.json())

app.use('/api/patients', PatientRouter);
app.use('/api/doctors', DoctorRouter);
app.use('/api/hospitals', HospitalRouter);
app.use('/api/departments', DepartmentRouter);
app.use('/api/news', NewsRouter);
app.use('/api', AuthPatientRouter);
app.use('/api', AuthDoctorRouter);


app.use(express.static(path.join(__dirname, "images")));

mongoose.connect('mongodb+srv://aslanzmazmp202:aslan2004@clusterimmigration.njfsy.mongodb.net/PortalDb?retryWrites=true&w=majority&appName=ClusterImmigration')
  .then(() => {
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
      })
    console.log('Connected!')});
