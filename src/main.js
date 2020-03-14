const elements = {
  values: {
    konfirmasi: document.querySelector("#value-konfirmasi"),
    meninggal: document.querySelector("#value-meninggal"),
    sembuh: document.querySelector("#value-sembuh")
  },
  tanggal : document.querySelector("#value-tanggal"),
  tema : document.querySelector("#tema"),
  gambarTema : document.querySelector("#gambar-tema"),
  gitIcon : document.querySelector("#gitIcon"),
  changeThemeTxt : document.querySelector("#changeThemeTxt")
};
const url = "https://covid19.mathdro.id/api/countries/ID";

let theme = true;
let moon = 'https://img.icons8.com/plasticine/100/000000/crescent-moon.png';
let sun = "./src/img/sun.svg";

let gitIcon = {
  dark : './src/img/GitHub-Mark-32px.png',
  light : './src/img/GitHub-Mark-Light-32px.png'
};

let changeTheme = () => {
  if (theme) {
    elements.tema.className = 'dark';
    elements.gambarTema.src = moon;
    elements.gitIcon.src = gitIcon.light;
    console.log(`Dark theme`);  
  } else {
    elements.tema.classList.remove('dark');
    elements.gambarTema.src = sun;
    elements.gitIcon.src = gitIcon.dark;
    console.log(`Remove dark`);
  }
  theme = !theme;
}

let conversiBulanIndo = (value) => {
  let bilang = {
    '01' : 'January',
    '02' : 'Februari',
    '03' : 'Maret',
    '04' : 'April',
    '05' : 'Mei',
    '06' : 'Juni',
    '07' : 'Juli',
    '08' : 'Agustus',
    '09' : 'September',
    '10' : 'Oktober',
    '11' : 'November',
    '12' : 'Desember'
  }
  console.log(bilang[`${value}`]);
  return bilang[value];
}

let conversiTanggal = (value) => {
  let arr = value.split("T");
  let tgl = arr[0].split("-");
  let tanggal = {
    tahun : tgl[0],
    bulan : conversiBulanIndo(tgl[1]),
    hari : tgl[2]
  }
  let arr2 = arr[1].split(".");
  let waktu = arr2[0];
  elements.tanggal.textContent = `${tanggal.hari} ${tanggal.bulan} ${tanggal.tahun}, Pukul ${waktu}`;
  
}

let getValue = () => {
  fetch(url).then(res => res.json()).then(data => {
    elements.values.konfirmasi.textContent = data.confirmed.value;
    elements.values.meninggal.textContent = data.deaths.value;
    elements.values.sembuh.textContent = data.recovered.value;
    conversiTanggal(data.lastUpdate);
  });
}

getValue();

