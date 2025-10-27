// export const BASE_URL = "http://localhost:8080/api";
// constants.ts
export const BASE_URL = (window).__ENV__?.API_URL;

export const WWP_URL = "http://localhost:8080/api";
export const PRR_URL = "http://localhost:8080/api/pr";

export const endpoints = {
    news: "news",
    doctors:"doctors",
    hospitals:"hospitals",
    patients:"patients",
    departments:"departments",
    patient_authentication:"patient_authentication",
    patient_registiration:"patient_registiration",
    patient_login:"patient_login",
    doctor_authentication:"doctor_authentication",
    doctor_login:"doctor_login",
    d_news:"d_news",
    notifications:"notifications",
    admin_login:"admin/admin_login",
    ap:"ap",
    cp:"cp",
    pp:"pp",
    vp:"vp",
    mp:"mp"
}