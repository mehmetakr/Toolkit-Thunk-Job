import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mainjobs: [], // bu diziyi asla değiştirmiyicez filtreleme amacıyla kullanıcaz.
  jobs: [],
  isloading: false,
  iserror: false,
};

const JobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    // 3 durum yazdık

    // 1 ) yüklenme durumunu güncellıyor
    setloading: (state) => {
      state.isloading = true;
    },

    //2 hata durumunu güncellıyor.
    seterror: (state, action) => {
      state.isloading = false;
      state.iserror = action.payload;
    },

    // 3 listeyü güncelliyor.  ( APİ den gelen verileri store  a aktarıyor.)
    setjobs: (state, action) => {
      state.isloading = false;
      state.iserror = false;
      state.jobs = action.payload;
      state.mainjobs = action.payload;
    },

    deletejob: (state, action) => {
      //finindex ile silicegımız elemanın sırasını bulmamız lazım o yüzden findindex methodu yazdık..
      const i = state.jobs.findIndex((item) => item.id === action.payload);

      //Silme işlemını ise burada gercekleştirdik veriyi store dan kaldırdık.
      state.jobs.splice(i, 1);
    },

    // storea yeni bir eleman ekleme slice ı yazıcaz ( YENİ BİR AKSİYON YAZICAZ )

    createjob: (state, action) => {
      // ekleme işlemını jobsa pushlama işlemı ile eklemeyi gerçekleştiriyoruz..
      state.jobs.push(action.payload);
      //

      //Filtreleme aksiynonumuzu yazalım..
      //aratılan şirket ismine göre filtrele
    },
    filterBySearch: (state, action) => {
      const query = action.payload.text.toLowerCase();
      const filtred = state.mainjobs.filter((i) =>
        i[action.payload.field].toLowerCase().includes(query)
      );

      state.jobs = filtred;
    },

    // sıralama aksiyonumuz

    sortjobs: (state, action) => {
      switch (action.payload) {
        case "a-z":
          // hangi değerin alfabede en önce geldiğini sort methoduna bildiriyor..
          state.jobs.sort((a, b) => a.company.localeCompare(b.company));
          break;
        case "z-a":
          state.jobs.sort((a, b) => b.company.localeCompare(a.company));
          break;
        case "En yeni":
          state.jobs.sort((a, b) => new Date(b.date) - new Date(a.date));
          break;
        case "En eski":
          state.jobs.sort((a, b) => new Date(a.date) - new Date(b.date));
          break;
      }
    },
  },
});

export const {
  sortjobs,
  filterBySearch,
  setloading,
  seterror,
  createjob,
  setjobs,
  deletejob,
} = JobSlice.actions;
export default JobSlice.reducer;
