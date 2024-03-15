import React, { useEffect } from "react";
import { seterror, setjobs, setloading } from "../redux/slice/Jobslice"; // Burada Jobslice'ı doğru bir şekilde import ettiğinizden emin olun
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import Card from "../components/Card";
import Filter from "../components/Filter";

const Joblist = () => {
  const dispatch = useDispatch();

  const state = useSelector((store) => store.jobSlice); // Redux store'dan doğru kesimi seçtiğinizden emin olun

  const fetchData = () => {
    dispatch(setloading());

    axios
      .get("http://localhost:2000/jobs")
      // 2) veriler gelirse store'a aktar
      .then((res) => dispatch(setjobs(res.data)))
      // 3) hata olursa store'u güncelle
      .catch((err) => dispatch(seterror(err.message)));
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(state);

  return (
    <div className="list-page">
      <Filter jobs={state.jobs} />
      {state.isLoading ? (
        <Loader />
      ) : state.isError ? (
        <div className="error">
          <p>
            Üzgünüz Verilere erişirken bir sorun oluştu
            <span>{state.isError}</span>
          </p>
          <button onClick={fetchData}>Tekrar Dene</button>
        </div>
      ) : (
        <div className="job-list">
          {state.jobs.map((job) => (
            <Card job={job} key={job.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Joblist;
