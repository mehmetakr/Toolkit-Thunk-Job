import React, { useEffect, useState } from "react";
import { sorOpt, statusOpt, typeOpt } from "../constants";
import { useDispatch } from "react-redux";
import { filterBySearch, sortjobs } from "../redux/slice/Jobslice";

const Filter = ({ jobs }) => {
  const [text, setText] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(filterBySearch({ field: "company", text }));
    }, 500);

    return () => clearTimeout(timer);
  }, [text, dispatch]);

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
    dispatch(filterBySearch({ field: "status", text: e.target.value }));
  };

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
    dispatch(filterBySearch({ field: "type", text: e.target.value }));
  };

  return (
    <div>
      <section className="filter-sec">
        <h2>Filtreleme methodu</h2>
        <form>
          <div>
            <label>Şirket ismine göre ara :</label>
            <input type="text" onChange={(e) => setText(e.target.value)} />
          </div>
          <div>
            <label>Durum</label>
            <select
              value={selectedStatus}
              onChange={handleStatusChange}
              name="status"
              required
            >
              <option value="" hidden>
                Seçiniz
              </option>
              {statusOpt.map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Tür</label>
            <select
              value={selectedType}
              onChange={handleTypeChange}
              name="type"
              required
            >
              <option value="" hidden>
                Seçiniz
              </option>
              {typeOpt.map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Sırala</label>
            <select
              onChange={(e) => dispatch(sortjobs(e.target.value))}
              name="sort"
              required
            >
              {sorOpt.map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
          </div>
          <div className="basma">
            <button className="btn" type="reset">
              <strong>Filtreleri Sıfırala</strong>
              <div id="container-stars">
                <div id="stars"></div>
              </div>
              <div id="glow">
                <div className="circle"></div>
                <div className="circle"></div>
              </div>
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Filter;
