const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const path = require("path");
const { createProxyMiddleware } = require('http-proxy-middleware');

// Routers
const PatientRouter = require("./routers/PatientRouter");
const DoctorRouter = require("./routers/DoctorRouter");
const HospitalRouter = require("./routers/HospitalRouter");
const DepartmentRouter = require("./routers/DepartmentRouter");
const NewsRouter = require("./routers/NewsRouter");
const AuthPatientRouter = require("./routers/authPatientRouter");
const PatientMessage = require("./routers/WorkWithPatientInfoRouter");
const AuthDoctorRouter = require("./routers/authDoctorRouter");
const LoginAdminRouter = require("./routers/adminRouter");
const NotificationRouter = require("./routers/NotificationRouter");
const DoctorNewsRouter = require("./routers/DoctorNewsRouter");
const addPrescription = require("./routers/AddPrescriptionRouter");

const app = express();
const port = process.env.PORT || 8080;

// ---------- Middleware ----------
app.use(cors());
app.use(express.json());

// ---------- API Routes ----------
app.use('/api/patients', PatientRouter);
app.use('/api/doctors', DoctorRouter);
app.use('/api/hospitals', HospitalRouter);
app.use('/api/departments', DepartmentRouter);
app.use('/api/news', NewsRouter);
app.use('/api/notifications', NotificationRouter);
app.use('/api/d_news', DoctorNewsRouter);
app.use('/api', AuthPatientRouter);
app.use('/api', AuthDoctorRouter);
app.use('/api/admin', LoginAdminRouter);
app.use('/api', PatientMessage);
app.use('/api/pr', addPrescription);

// ---------- Runtime Config for Frontend ----------
const PUBLIC_API_URL = process.env.PUBLIC_API_URL || '/api'; // frontend uses this
app.get('/env-config.js', (req, res) => {
  const env = {
    API_URL: PUBLIC_API_URL // public, non-secret
  };
  res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store, must-revalidate');
  res.send(`window.__ENV__ = ${JSON.stringify(env)};`);
});

// ---------- Serve Static Assets ----------
app.use(express.static(path.join(__dirname, "images")));
app.use(express.static(path.join(__dirname, "documents")));

// ---------- Serve Frontend Build ----------
app.use(express.static(path.join(__dirname, "../client/dist"))); // assuming frontend build is ../frontend/dist

// SPA fallback (React Router support)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

// ---------- Optional API Proxy for Internal APIs ----------
const INTERNAL_API_URL = process.env.INTERNAL_API_URL || 'https://real-internal-api.example.com';
app.use('/internal-api', createProxyMiddleware({
  target: INTERNAL_API_URL,
  changeOrigin: true,
  pathRewrite: { '^/internal-api': '' }, // strip prefix if needed
  secure: true,
  onError(err, req, res) {
    console.error('Proxy error:', err);
    res.status(502).json({ error: 'Bad gateway' });
  }
}));

// ---------- MongoDB Connection & Server Start ----------
mongoose.connect('mongodb+srv://aslanzmazmp202:aslan2004@clusterimmigration.njfsy.mongodb.net/PortalDb?retryWrites=true&w=majority&appName=ClusterImmigration')
  .then(() => {
    console.log('Connected to MongoDB!');
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
