document.getElementById("healthForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const age = parseInt(document.getElementById("age").value);
  const berat = parseFloat(document.getElementById("weight").value);
  const tinggi = parseFloat(document.getElementById("height").value) / 100; 
  const goal = document.getElementById("goal").value;
  const level = document.getElementById("level").value;
  const standar = document.getElementById("bmiStandard").value;

  if (isNaN(berat) || isNaN(tinggi) || tinggi <= 0) {
    document.getElementById("result").innerHTML = "<b>❌ Input tidak valid. Periksa kembali berat & tinggi badan.</b>";
    return;
  }

  const bmi = berat / (tinggi * tinggi);
  let status = "";
  let keterangan = "";

  if (standar === "asia") {
    // Standar Asia
    if (bmi < 18.5) {
      status = "Kurus";
      keterangan = "Berat badan kamu di bawah normal. Tambah asupan kalori sehat.";
    } else if (bmi < 23) {
      status = "Normal";
      keterangan = "Berat badan ideal. Pertahankan pola makan & olahraga.";
    } else if (bmi < 25) {
      status = "Overweight Ringan";
      keterangan = "Sedikit berlebih. Kurangi kalori manis & lebih aktif.";
    } else if (bmi < 30) {
      status = "Overweight";
      keterangan = "Berat badan berlebih. Rutin olahraga & atur pola makan.";
    } else {
      status = "Obesitas";
      keterangan = "Berat badan tinggi. Disarankan konsultasi ke dokter/gizi.";
    }
  } else {
    // Standar WHO
    if (bmi < 18.5) {
      status = "Kurus";
      keterangan = "Berat badan kamu di bawah normal. Tambah asupan kalori sehat.";
    } else if (bmi < 25) {
      status = "Normal";
      keterangan = "Berat badan ideal. Pertahankan pola makan & olahraga.";
    } else if (bmi < 30) {
      status = "Overweight";
      keterangan = "Berat badan agak berlebih. Kurangi makanan manis/berlemak.";
    } else {
      status = "Obesitas";
      keterangan = "Berat badan tinggi. Disarankan konsultasi ke dokter/gizi.";
    }
  }

  let saran = `
    <h3>📊 Hasil BMI</h3>
    Usia: <b>${age} tahun</b><br>
    Standar: <b>${standar.toUpperCase()}</b><br>
    BMI: <b>${bmi.toFixed(1)}</b> → <b>${status}</b><br>
    <p>${keterangan}</p>
    <hr>
    <h3>🍽️ Menu Sehat Minggu Ini</h3>
  `;

  if (goal === "turun") {
  if (level === "ringan") {
    saran += `
      - Pagi: Nasi + tempe goreng<br>
      - Siang: Nasi + sayur bening + tahu rebus<br>
      - Malam: Sup bayam + telur rebus<br>
      - Snack: Pisang / singkong rebus
    `;
  } else {
    saran += `
      - Pagi: Oat murah / bubur kacang hijau<br>
      - Siang: Nasi merah (sedikit) + sayur tumis kangkung + telur dadar<br>
      - Malam: Capcay sederhana (kol, wortel, bakso)<br>
      - Snack: Pepaya potong
    `;
  }
} else if (goal === "naik") {
  saran += `
    - Pagi: Nasi + telur dadar + teh manis<br>
    - Siang: Nasi + ayam goreng sederhana + sayur sop<br>
    - Malam: Roti tawar + susu bubuk sachet<br>
    - Snack: Kacang tanah rebus
  `;
} else {
  saran += `
    - Pagi: Nasi uduk + tempe<br>
    - Siang: Nasi + ikan pindang + sayur asem<br>
    - Malam: Sup bening + tahu kukus<br>
    - Snack: Buah musiman (pisang / pepaya / semangka)
  `;
}


  document.getElementById("result").innerHTML = saran;
});
