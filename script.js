// --- 1. LOGIKA NAVIGASI SIDEBAR ---
const navItems = document.querySelectorAll("#sidebar-nav li");
const sections = document.querySelectorAll(".page-section");

// Fungsi untuk menampilkan riwayat
function displayHistory() {
  const riwayatCard = document.querySelector("#riwayat .card");
  const storedHistory = localStorage.getItem("healthHistory");
  
  if (!storedHistory || JSON.parse(storedHistory).length === 0) {
    riwayatCard.innerHTML = '<p class="empty-state">Belum ada data riwayat yang tersimpan.</p>';
    return;
  }
  
  const historyList = JSON.parse(storedHistory);
  let historyHTML = '<div class="history-list">';
  
  historyList.forEach((item, index) => {
    historyHTML += `
      <div class="history-item">
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 10px;">
          <div>
            <p style="font-size: 0.9rem; color: var(--text-muted); margin: 0;">${item.timestamp}</p>
            <h3 style="font-size: 1.3rem; margin: 5px 0; color: var(--primary);">${item.status}</h3>
          </div>
          <span class="bmi-badge">BMI: ${item.bmi}</span>
        </div>
        
        <div style="font-size: 0.9rem; line-height: 1.6; margin-bottom: 10px;">
          <p><b>Usia:</b> ${item.age} Tahun | <b>Berat:</b> ${item.berat} kg | <b>Tinggi:</b> ${item.tinggi} cm</p>
          <p><b>Standar:</b> ${item.standar.toUpperCase()} | <b>Tujuan:</b> ${item.goal === "jaga" ? "Menjaga Kesehatan" : item.goal + "kan berat badan"}</p>
          <p style="margin-bottom: 8px;">${item.keterangan}</p>
        </div>
        
        <div style="background: #f1f5f9; padding: 10px; border-radius: 8px; font-size: 0.85rem; line-height: 1.6;">
          🍽️ ${item.menuContent}
        </div>
        
        <button class="btn-delete" data-id="${item.id}" style="margin-top: 10px; padding: 6px 12px; background: #ef4444; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 0.85rem;">
          🗑️ Hapus
        </button>
      </div>
    `;
  });
  
  historyHTML += '</div>';
  riwayatCard.innerHTML = historyHTML;
  
  // Tambah event listener untuk tombol hapus
  document.querySelectorAll(".btn-delete").forEach((btn) => {
    btn.addEventListener("click", function() {
      const itemId = parseInt(this.getAttribute("data-id"));
      let historyList = JSON.parse(localStorage.getItem("healthHistory"));
      historyList = historyList.filter(item => item.id !== itemId);
      localStorage.setItem("healthHistory", JSON.stringify(historyList));
      displayHistory();
    });
  });
}

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    // Ubah status aktif di sidebar
    navItems.forEach((i) => i.classList.remove("active"));
    item.classList.add("active");

    // Ubah tampilan halaman/section
    sections.forEach((s) => s.classList.remove("active"));
    const targetId = item.getAttribute("data-target");
    document.getElementById(targetId).classList.add("active");
    
    // Jika klik riwayat, tampilkan riwayatnya
    if (targetId === "riwayat") {
      displayHistory();
    }
  });
});

// --- 2. LOGIKA KALKULATOR (JS KAMU) ---
document.getElementById("healthForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const age = parseInt(document.getElementById("age").value);
  const berat = parseFloat(document.getElementById("weight").value);
  const tinggi = parseFloat(document.getElementById("height").value) / 100;
  const goal = document.getElementById("goal").value;
  const level = document.getElementById("level").value;
  const standar = document.getElementById("bmiStandard").value;

  if (isNaN(berat) || isNaN(tinggi) || tinggi <= 0) {
    alert("❌ Input tidak valid. Periksa kembali berat & tinggi badan.");
    return;
  }

  const bmi = berat / (tinggi * tinggi);
  let status = "";
  let keterangan = "";

  if (standar === "asia") {
    if (bmi < 18.5) {
      status = "Kurus";
      keterangan =
        "Berat badan kamu di bawah normal. Tambah asupan kalori sehat.";
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
    if (bmi < 18.5) {
      status = "Kurus";
      keterangan = "Berat badan di bawah normal.";
    } else if (bmi < 25) {
      status = "Normal";
      keterangan = "Berat badan ideal.";
    } else if (bmi < 30) {
      status = "Overweight";
      keterangan = "Berat badan agak berlebih.";
    } else {
      status = "Obesitas";
      keterangan = "Berat badan tinggi.";
    }
  }

  let menuContent = "";
  if (goal === "turun") {
    if (level === "ringan") {
      menuContent =
        "🥣 Pagi: Nasi + tempe | 🥗 Siang: Sayur bening + tahu | 🌙 Malam: Sup bayam + telur | 🍎 Snack: Pisang";
    } else {
      menuContent =
        "🥣 Pagi: Oat / Bubur Kacang Hijau | 🥗 Siang: Nasi merah + kangkung | 🌙 Malam: Capcay sederhana | 🍎 Snack: Pepaya";
    }
  } else if (goal === "naik") {
    menuContent =
      "🥣 Pagi: Nasi + Telur + Teh manis | 🥗 Siang: Ayam goreng + Sop | 🌙 Malam: Roti + Susu | 🍎 Snack: Kacang rebus";
  } else {
    menuContent =
      "🥣 Pagi: Nasi uduk + tempe | 🥗 Siang: Ikan pindang + sayur asem | 🌙 Malam: Sup bening + tahu | 🍎 Snack: Semangka";
  }

  const resultArea = document.getElementById("result");
  resultArea.style.display = "block";

  // --- SIMPAN KE RIWAYAT ---
  const now = new Date();
  const timestamp = now.toLocaleString("id-ID", { 
    weekday: "short", 
    year: "numeric", 
    month: "short", 
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
  
  const historyData = {
    id: now.getTime(),
    timestamp: timestamp,
    bmi: bmi.toFixed(1),
    status: status,
    keterangan: keterangan,
    age: age,
    berat: berat,
    tinggi: tinggi * 100,
    goal: goal,
    level: level,
    standar: standar,
    menuContent: menuContent
  };
  
  // Ambil riwayat dari localStorage
  let historyList = [];
  const storedHistory = localStorage.getItem("healthHistory");
  if (storedHistory) {
    historyList = JSON.parse(storedHistory);
  }
  
  // Tambah data baru ke awal array
  historyList.unshift(historyData);
  
  // Simpan kembali ke localStorage
  localStorage.setItem("healthHistory", JSON.stringify(historyList));

  resultArea.innerHTML = `
    <div class="result-container">
      <div style="display: flex; justify-content: space-between; align-items: flex-start;">
        <div>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 5px;">Hasil Analisis:</p>
          <h2 style="font-size: 1.6rem; margin: 0;">${status}</h2>
          <span class="bmi-badge">BMI: ${bmi.toFixed(1)}</span>
        </div>
        <div style="text-align: right; color: var(--text-muted); font-size: 0.9rem;">
          <p>Usia: <b>${age} Thn</b></p>
          <p>Standar: <b>${standar.toUpperCase()}</b></p>
        </div>
      </div>
      
      <p style="margin-top: 15px; font-size: 0.95rem; line-height: 1.5;">${keterangan}</p>
      
      <div class="menu-list">
        <h4 style="margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
          <span>🍽️</span> Rekomendasi Menu Hemat
        </h4>
        <div class="menu-item" style="line-height: 1.8;">
          ${menuContent}
        </div>
        <p style="font-size: 0.8rem; color: var(--text-muted); font-style: italic; margin-top: 15px;">
          *Rencana ini disesuaikan untuk tujuan <b>${goal === "jaga" ? "Menjaga Kesehatan" : goal + "kan berat badan"}</b>.
        </p>
      </div>
      
      <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid var(--border);">
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 10px;">✅ Hasil telah tersimpan ke Riwayat</p>
        <button id="viewHistory" class="btn-calculate" style="width: 100%; cursor: pointer;">Lihat Riwayat Lengkap</button>
      </div>
    </div>
  `;

  // Tambah event listener untuk tombol "Lihat Riwayat Lengkap"
  document.getElementById("viewHistory").addEventListener("click", function() {
    navItems.forEach((i) => i.classList.remove("active"));
    document.querySelector('[data-target="riwayat"]').classList.add("active");
    sections.forEach((s) => s.classList.remove("active"));
    document.getElementById("riwayat").classList.add("active");
    displayHistory();
    setTimeout(() => {
      document.querySelector("#riwayat .card").scrollIntoView({ behavior: "smooth" });
    }, 100);
  });

  resultArea.scrollIntoView({ behavior: "smooth" });
});
