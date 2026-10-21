// Data undangan — ganti isi di bawah ini dengan data asli Anda.
export const wedding = {
  groom: {
    nick: "Yogi",
    full: "Muhammad Yogi",
    parents: "Putra pertama dari Bapak Jasman & Ibu Rosdiah",
  },
  bride: {
    nick: "Afiqoh",
    full: "Afiqoh Gamala, S.Pd.",
    parents: "Putri terakhir dari Bapak Sukrisno (Alm) & Ibu Suriani (Almh)",
  },
  // Tanggal & jam hari H (WIB)
  dateISO: "2026-11-08T09:00:00+07:00",
  dateLabel: "Minggu, 8 November 2026",
  events: [
    {
      name: "Akad Nikah",
      time: "09:00 - 11:00 WIB",
      date: "Minggu, 8 November 2026",
      venue: "Masjid Al Furqon",
      address: "Klumpang Kebun",
      maps: "https://maps.app.goo.gl/We6zRX6UCRnNXRqY7",
    },
    {
      name: "Resepsi",
      time: "13:00 - 18:00 WIB",
      date: "Minggu, 8 November 2026",
      venue: "Dusun V Telaga Sari Klumpang Kebun",
      address: "Gg. Buntu Kec. Hamparan Perak",
      maps: "https://maps.app.goo.gl/7uZpbtC34uEPNTWp8",
    },
  ],
  story: [
    {
      year: "2021",
      title: "Awal Bertemu",
      text: '"Tidak ada yang tahu tentang rencana-Nya". Awal kami bertemu di tempat kerja yang sama, tegur sapa yang tidak ada rasa, hanya sapaan biasa. "Ogeek", sapaan Afiqoh padanya kala itu. Beberapa bulan kemudian, Ogek resign dan memutuskan untuk merantau.',
    },
    {
      year: "2024",
      title: "Bertemu Kembali",
      text: '"Bukan bertemu lalu berjodoh, sebab berjodohlah maka bertemu". Pada penghujung tahun 2024 adalah masa refresh Afiqoh, setelah berjuang dari lelahnya menyelesaikan skripsi hingga akhirnya wisuda, Afiqoh dan salah satu teman kuliah sedang duduk di cafe daerah UMSU langganan kami. Di tengah obrolan yang semakin seru, notif WA masuk (nomor tidak dikenal: "P"), dengan profil yang sangat familiar. "Ogeek ?" ucap Afiqoh, kemudian Afiqoh membalas seadanya. Singkat cerita, chat, telefon, hingga main ke rumah untuk bertemu abang dan kakak sudah dilewatinya. Komitmen muncul di bulan November 2025, "kita nikah tahun depan ya" (ucap Yogi), mulailah Afiqoh mencatat semuanya dari mulai seserahan, mahar, sampai konsep menikah. Selesai Afiqoh catat-catat, kita pergi beli satu per satu dari bulan ke bulan menuju hari H-lamaran.',
    },
    {
      year: "2026",
      title: "Lamaran",
      text: "Pada tanggal 12 Juli 2026, atas ridho sang illahi robbi, juga restu kakak dan abang serta kedua orang tua Yogi, kami menggelar acara lamaran dengan konsep intimate hanya keluarga besar saja. Air mata haru bahagia begitu lekat pada kami, sebab prosesnya benar-benar tidak semudah yang dibayangkan.",
    },
    {
      year: "2026",
      title: "Menikah",
      text: 'Awal dari selamanya, kini kami dari dua manusia yang memiliki ego masing-masing, memilih dan menetap untuk selamanya dari ribuan ego salah juga maaf yang terucap dan memaafkan. Dominan ego, marah juga berulang kali untuk mundur (jelas afiqoh), dia Muhammad Yogi, begitu sabarnya, begitu lembutnya, begitu pahamnya dia, sehingga wanita ini yakin dan mau untuk maju lagi bersama. "kami berlayar". Sebagaimana perkataan indahnya Sayyidina Ali Bin Abi Thalib "apa yang menjadi takdirmu akan menemukan jalannya untuk menemukanmu".',
    },
  ],
  gifts: [
    { bank: "SeaBank", number: "901701269987", holder: "Afiqoh Gamala" },
    { bank: "Bank Mandiri", number: "1060022453669", holder: "M. YOGI" },
  ],
  quote: {
    arabic:
      "وَمِنْ اٰيٰتِهٖٓ اَنْ خَلَقَ لَكُمْ مِّنْ اَنْفُسِكُمْ اَزْوَاجًا لِّتَسْكُنُوْٓا اِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَّوَدَّةً وَّرَحْمَةً ۗ اِنَّ فِيْ ذٰلِكَ لَاٰيٰتٍ لِّقَوْمٍ يَّتَفَكَّرُوْنَ",
    text: "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.",
    source: "QS. Ar-Rum : 21",
  },
};

export function buildIcsHref() {
  const start = new Date(wedding.dateISO);
  const end = new Date(start.getTime() + 9 * 60 * 60 * 1000);
  const reception = wedding.events[1];
  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Undangan//ID",
    "BEGIN:VEVENT",
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:Pernikahan ${wedding.bride.nick} & ${wedding.groom.nick}`,
    `LOCATION:${reception?.venue ?? ""}\\, ${reception?.address ?? ""}`,
    "DESCRIPTION:Mohon doa restu atas pernikahan kami.",
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return "data:text/calendar;charset=utf-8," + encodeURIComponent(lines.join("\r\n"));
}
