import React from "react";
import { ImLocation } from "react-icons/im";
import Button2 from "./Button2";
import { MdDateRange } from "react-icons/md";
import { FaRegBuilding } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { deletejob } from "../redux/slice/Jobslice";
import { useDispatch } from "react-redux";

const Card = ({ job }) => {
  const dispatch = useDispatch();
  const handledelete = () => {
    // 1 ) APİ isteği atıp veritabanından iş'i kaldırıcaz.
    // 2 ) İşlem başarılı olursa  storedan da kaldır ve  store u güncelleme işlemı yapabiliriz..
    // 3 ) Basarısız olursa uyarı vericez..

    axios
      .delete(`http://localhost:2000/jobs/${job.id}`)
      // başarılı olursa storedan kaldırma işlemı yapıcaz..
      .then(() => {
        toast.success("Silme işlemı başarılı");
        dispatch(deletejob(job.id));
      })
      // başarısız olursa yapıcagımız şeyde bu olucak
      .catch(() => {
        toast.warn("Silme işleminde bir sorun çıktı.");
      });
  };



  return (
    <div className="card">
      <div className="head">
        <div className="left">
          <div className="letter">
            <span>{job.company.charAt(0)}</span>
          </div>

          <div className="info">
            <h2>{job.position}</h2>
            <h3>{job.company}</h3>
          </div>
        </div>
        <div className="right">
          {/* handledelete i prop olarak aldık ve button2 içinde kullanabilicez. */}
          <Button2 handledelete={handledelete} />
        </div>
      </div>

      <div className="body">
        <div className="bodyüst">
          <div className="lokasyon">
            <ImLocation />
            <p>{job.location}</p>
          </div>
          <div className="type">
            <FaRegBuilding />
            <p>{job.type}</p>
          </div>
        </div>

        <div className="bodyalt">
          <div className="date">
            <MdDateRange />
            <div>{job.date}</div>
          </div>

          <span
            className="durum"
            style={{
              backgroundColor:
                job.status === "Reddedildi"
                  ? "red"
                  : job.status === "Mülakat"
                  ? "yellow"
                  : "green",
            }}
          >
            {job.status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
