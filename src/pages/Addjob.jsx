import React from "react";
import { statusOpt, typeOpt } from "../constants";
import { v4 } from "uuid";
import axios from "axios";
import { toast } from "react-toastify";
import { createjob } from "../redux/slice/Jobslice";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Addjob = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handlesubmit = (e) => {
    e.preventDefault();

    //inputlardakı verilere erişememiz lazım

    const formData = new FormData(e.target);

    // iputlardaki değerleri diziye çevirir.
    const newjob = Object.fromEntries(formData.entries());

    // tarih ve id ekle (olusşturduğumuz nesneye)
    newjob.id = v4();
    newjob.date = new Date().toLocaleDateString();

    // apiye veri ekle
    axios
      .post("http://localhost:2000/jobs", newjob)

      // başarılı olursa store a ekle

      .then((res) => {
        toast.success("Yeni iş eklendi");
        dispatch(createjob(newjob));
        navigate("/");
      })
      //  başarısız olursa  uyarı ekle ver.

      .catch(() => {
        toast.warn("İş eklenirken hata meydana geldi..");
      });
  };

  return (
    <div className="add-page">
      <section className="add-sec">
        <h3>Yeni İş Ekle</h3>

        <form onSubmit={handlesubmit}>
          <div>
            <label>Pozisyon</label>
            <input name="position" type="text" required />
          </div>
          <div>
            <label>Şirket</label>
            <input name="company" type="text" required />
          </div>

          <div>
            <label>Lokasyon</label>
            <input name="location" type="text" required />
          </div>

          <div>
            <label>Durum</label>
            <select name="status" id="selectID" required>
              <option value="" hidden>
                Seçiniz
              </option>
              {statusOpt.map((i, index) => (
                <option key={index}>{i}</option>
              ))}
            </select>
          </div>

          <div>
            <label>Tür</label>
            <select name="type" id="selectID" required>
              {/* hidden ile seçiniz optionu seçilemez hale gelıyo */}
              <option value="" hidden>
                Seçiniz
              </option>
              {typeOpt.map((fdl, index) => (
                <option key={index}>{fdl}</option>
              ))}
            </select>
          </div>

          {/* ADDJOB  BUTONU */}
          <div className="basma">
            <button className="btn" type="submit">
              <strong>BUTTON</strong>
              <div id="container-stars">
                <div id="stars"></div>
              </div>

              <div id="glow">
                <div class="circle"></div>
                <div class="circle"></div>
              </div>
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Addjob;
