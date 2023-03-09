import React, { useState, useEffect } from "react";
import "./certificate.css";
import API from "../../utilities/api";
import { useSelector, useDispatch } from "react-redux";
import Certificates from "../../component/CertificatesStudent/Certificates";
import SmallCertificate from "./smallCertificate";
const Certificate = () => {
  const login = useSelector((state) => state.login.login);
  const [certificatesData, setCertificatesData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await API.get(
        `/studentExam/studentCertificates/${login.id}`
      );
      setCertificatesData(data);
      console.log(data);
    };
    fetchData();
  }, []);
  return (
    <div
      style={{
        display: "flex",
        padding: "0px 20px",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      {certificatesData?.map((examInfo, index) => (
        <SmallCertificate examInfo={examInfo} key={index} />
      ))}
    </div>
  );
};
export default Certificate;
