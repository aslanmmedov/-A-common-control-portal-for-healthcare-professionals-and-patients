const express = require('express')
const mongoose = require('mongoose');
const cors = require("cors")
const PatientRouter = require("./routers/PatientRouter");
const DoctorRouter = require("./routers/DoctorRouter");
const HospitalRouter = require("./routers/HospitalRouter");
const DepartmentRouter = require("./routers/DepartmentRouter");
const NewsRouter = require("./routers/NewsRouter");
const AuthPatientRouter = require("./routers/authPatientRouter");
const PatientMessage = require("./routers/WorkWithPatientInfoRouter");
const AuthDoctorRouter = require("./routers/authDoctorRouter");
const NotificationRouter = require("./routers/NotificationRouter");
const DoctorNewsRouter = require("./routers/DoctorNewsRouter");
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
app.use('/api/notifications',NotificationRouter)
app.use('/api/d_news',DoctorNewsRouter)
app.use('/api', AuthPatientRouter);
app.use('/api', AuthDoctorRouter);
app.use('/api/message',PatientMessage)

app.use(express.static(path.join(__dirname, "images")));
app.use(express.static(path.join(__dirname, "documents")));


mongoose.connect('mongodb+srv://aslanzmazmp202:aslan2004@clusterimmigration.njfsy.mongodb.net/PortalDb?retryWrites=true&w=majority&appName=ClusterImmigration')
  .then(() => {
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
      })
    console.log('Connected!')});
