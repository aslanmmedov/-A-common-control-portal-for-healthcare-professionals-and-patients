const express = require('express')
const mongoose = require('mongoose');
const cors = require("cors")
const PatientRouter = require("./routers/PatientRouter");
const DoctorRouter = require("./routers/DoctorRouter");
const HospitalRouter = require("./routers/HospitalRouter");
const DepartmentRouter = require("./routers/DepartmentRouter");
const app = express()
const port = 8080

app.use(cors());
app.use(express.json())

app.use('/patients', PatientRouter);
app.use('/doctors', DoctorRouter);
app.use('/hospitals', HospitalRouter);
app.use('/departments', DepartmentRouter);


mongoose.connect('mongodb+srv://aslanzmazmp202:aslan2004@clusterimmigration.njfsy.mongodb.net/PortalDb?retryWrites=true&w=majority&appName=ClusterImmigration')
  .then(() => {
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
      })
    console.log('Connected!')});
