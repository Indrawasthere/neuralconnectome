import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- DATA LENGKAP 10 REGION (Sesuai Desain Awal Lo) ---
const brainRegions = [
  {
    id: "frontal",
    label: "Frontal Lobe",
    emoji: "🎯",
    color: "#e74c3c",
    path: "M100,340 C95,270 100,160 150,110 C195,68 290,60 320,100 C340,130 335,230 320,340 Z",
    labelX: 210,
    labelY: 210,
    title: "Frontal Lobe",
    subtitle: "The Decision Maker",
    desc: "Ngurusin perencanaan dan kontrol perilaku. Prefrontal Cortex di sini jadi 'filter' sosial lo.",
    functions: ["Keputusan", "Kepribadian", "Kontrol Motorik"],
    clinical:
      "Kerusakan bisa memicu impulsivitas ekstrem atau perubahan watak.",
  },
  {
    id: "parietal",
    label: "Parietal Lobe",
    emoji: "📡",
    color: "#3498db",
    path: "M310,280 C308,200 315,120 360,85 C400,58 470,70 490,120 C505,165 498,230 490,280 Z",
    labelX: 400,
    labelY: 185,
    title: "Parietal Lobe",
    subtitle: "The Sensor",
    desc: "Ngeproses input sensorik: sentuhan, rasa sakit, dan navigasi ruang.",
    functions: ["Sentuhan", "Navigasi Spasial", "Suhu"],
    clinical: "Bisa nyebabin hemispatial neglect (lupa sisi tubuh sebelah).",
  },
  {
    id: "occipital",
    label: "Occipital Lobe",
    emoji: "👁️",
    color: "#9b59b6",
    path: "M480,270 C478,220 485,170 510,150 C535,132 575,140 588,175 C598,210 595,250 588,280 C580,300 490,295 480,270 Z",
    labelX: 535,
    labelY: 215,
    title: "Occipital Lobe",
    subtitle: "The Visual Processor",
    desc: "Memproses semua data visual. Gambar masuk terbalik, di sini di-flip jadi bener.",
    functions: ["Penglihatan", "Interpretasi Warna"],
    clinical:
      "Kerusakan bisa bikin buta meski mata sehat (cortical blindness).",
  },
  {
    id: "temporal",
    label: "Temporal Lobe",
    emoji: "💬",
    color: "#e67e22",
    path: "M420,275 C418,310 425,370 460,410 C490,438 545,440 570,415 C590,390 585,340 578,290 C570,265 425,260 420,275 Z",
    labelX: 498,
    labelY: 355,
    title: "Temporal Lobe",
    subtitle: "Memory & Language",
    desc: "Pusat pendengaran dan memori jangka panjang. Ada Hippocampus di dalamnya.",
    functions: ["Bahasa", "Memori", "Pengenalan Wajah"],
    clinical: "Gangguan di sini bisa bikin amnesia atau sulit ngerti omongan.",
  },
  {
    id: "limbic",
    label: "Limbic System",
    emoji: "⚡",
    color: "#f39c12",
    path: "M290,310 C288,275 295,240 330,225 C360,213 410,218 425,245 C437,268 432,305 420,325 C405,342 295,340 290,310 Z",
    labelX: 355,
    labelY: 280,
    title: "Limbic System",
    subtitle: "The Emotion Engine",
    desc: "Pusat emosi dan insting survival (fight or flight).",
    functions: ["Emosi", "Survival", "Gairah"],
    clinical: "Aktivitas berlebih di Amygdala memicu gangguan kecemasan.",
  },
  {
    id: "thalamus",
    label: "Thalamus",
    emoji: "🔄",
    color: "#1abc9c",
    path: "M320,275 C318,255 325,235 348,228 C368,222 395,228 400,248 C404,265 398,278 388,285 C370,292 322,288 320,275 Z",
    labelX: 358,
    labelY: 258,
    title: "Thalamus",
    subtitle: "The Router",
    desc: "Stasiun relay sensorik. Semua info lewat sini dulu sebelum ke cortex.",
    functions: ["Relay Data", "Kesadaran"],
    clinical: "Bisa nyebabin gangguan tidur kronis atau hilangnya sensasi.",
  },
  {
    id: "hypothalamus",
    label: "Hypothalamus",
    emoji: "🌡️",
    color: "#27ae60",
    path: "M325,288 C323,302 328,320 350,328 C370,334 392,330 398,318 C403,306 398,290 390,286 C372,280 327,282 325,288 Z",
    labelX: 360,
    labelY: 310,
    title: "Hypothalamus",
    subtitle: "The Thermostat",
    desc: "Menjaga homeostasis (lapar, haus, suhu tubuh) dan sistem hormon.",
    functions: ["Hormon", "Homeostasis", "Tidur"],
    clinical: "Kerusakan memicu gangguan makan atau regulasi suhu tubuh.",
  },
  {
    id: "basalGanglia",
    label: "Basal Ganglia",
    emoji: "🔁",
    color: "#e84393",
    path: "M260,270 C258,252 264,238 282,232 C298,227 318,233 320,248 C322,262 316,275 306,280 C290,285 262,282 260,270 Z",
    labelX: 290,
    labelY: 258,
    title: "Basal Ganglia",
    subtitle: "The Habit Machine",
    desc: "Mengatur gerakan otomatis dan pembentukan kebiasaan (habit).",
    functions: ["Habit", "Kontrol Motorik", "Reward"],
    clinical: "Pusat utama penyakit Parkinson jika sel dopamin di sini mati.",
  },
  {
    id: "cerebellum",
    label: "Cerebellum",
    emoji: "🎨",
    color: "#fd79a8",
    path: "M500,380 C498,345 505,310 535,295 C560,282 600,288 615,315 C627,340 622,375 612,400 C600,420 505,418 500,380 Z",
    labelX: 558,
    labelY: 350,
    title: "Cerebellum",
    subtitle: "The Coordinator",
    desc: "Mengatur presisi gerakan dan keseimbangan tubuh.",
    functions: ["Keseimbangan", "Koordinasi", "Presisi"],
    clinical: "Bikin jalan sempoyongan (Ataksia) kalau bermasalah.",
  },
  {
    id: "brainstem",
    label: "Brain Stem",
    emoji: "❤️",
    color: "#6c5ce7",
    path: "M380,335 C378,365 375,410 380,460 C383,490 395,510 415,512 C435,510 448,490 450,460 C454,410 450,365 445,335 C440,320 385,318 380,335 Z",
    labelX: 415,
    labelY: 420,
    title: "Brain Stem",
    subtitle: "Life Support",
    desc: "Fungsi vital: napas, detak jantung, dan kesadaran dasar.",
    functions: ["Napas", "Detak Jantung", "Survival"],
    clinical: "Kerusakan fatal biasanya berujung pada koma atau kematian.",
  },
];

export default function UltimateBrainMap() {
  const [selected, setSelected] = useState(null);
  const [hovered, setHovered] = useState(null);
  const active = selected || hovered;

  return (
    <div style={containerStyle}>
      {/* Background Ambient Glow */}
      <motion.div
        animate={{
          background: active ? `${active.color}15` : "rgba(100,100,255,0.02)",
        }}
        style={bgGlowStyle}
      />

      <header style={headerStyle}>
        <h1 style={titleStyle}>
          NEURAL CONNECTOME <span style={{ fontWeight: 200 }}>PRO</span>
        </h1>
        <p style={{ color: "#555", fontSize: "12px", letterSpacing: "3px" }}>
          MAPPING HUMAN INTELLIGENCE
        </p>
      </header>

      <div style={mainLayout}>
        {/* SVG Visualization */}
        <div style={canvasWrapper}>
          <svg viewBox="60 50 580 500" width="100%" height="550">
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Skull Outline */}
            <ellipse
              cx="380"
              cy="290"
              rx="260"
              ry="230"
              fill="none"
              stroke="rgba(255,255,255,0.05)"
              strokeDasharray="5,5"
            />

            {/* Render Regions Back-to-Front */}
            {[...brainRegions].reverse().map((r) => {
              const isActive = active?.id === r.id;
              const isOther = active && active.id !== r.id;
              return (
                <g
                  key={r.id}
                  style={{ cursor: "pointer" }}
                  onMouseEnter={() => setHovered(r)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => setSelected(selected?.id === r.id ? null : r)}
                >
                  <motion.path
                    d={r.path}
                    animate={{
                      fill: isActive ? r.color : "rgba(35,35,50,0.8)",
                      opacity: isOther ? 0.3 : 1,
                      scale: isActive ? 1.02 : 1,
                    }}
                    stroke={isActive ? "#fff" : "rgba(255,255,255,0.1)"}
                    strokeWidth={isActive ? 2 : 1}
                    filter={isActive ? "url(#glow)" : "none"}
                  />
                  <text
                    x={r.labelX}
                    y={r.labelY}
                    fill={isActive ? "#fff" : "rgba(255,255,255,0.4)"}
                    style={{
                      fontSize: "11px",
                      fontWeight: "700",
                      pointerEvents: "none",
                      textAnchor: "middle",
                    }}
                  >
                    {r.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Info Panel */}
        <div style={infoPanelStyle(!!active, active?.color)}>
          <AnimatePresence mode="wait">
            {active ? (
              <motion.div
                key={active.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <span style={badgeStyle(active.color)}>
                  {active.emoji} DATABASE_ENTRY
                </span>
                <h2
                  style={{
                    color: active.color,
                    margin: "10px 0",
                    fontSize: "28px",
                  }}
                >
                  {active.title}
                </h2>
                <p style={{ color: "#aaa", marginBottom: "20px" }}>
                  {active.desc}
                </p>
                <div style={tagContainer}>
                  {active.functions.map((f) => (
                    <span key={f} style={tagStyle(active.color)}>
                      {f}
                    </span>
                  ))}
                </div>
                <div style={clinicalBox(active.color)}>
                  <strong>CLINICAL:</strong> {active.clinical}
                </div>
              </motion.div>
            ) : (
              <div style={emptyState}>SELECT REGION TO ANALYZE</div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* --- LEGEND PILLS (Balikin ini sesuai mau lo) --- */}
      <div style={legendContainer}>
        {brainRegions.map((r) => (
          <button
            key={r.id}
            onMouseEnter={() => setHovered(r)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => setSelected(selected?.id === r.id ? null : r)}
            style={pillStyle(selected?.id === r.id, r.color)}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: r.color,
              }}
            />
            {r.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// --- REFINED STYLES ---
const containerStyle = {
  minHeight: "100vh",
  width: "100vw",
  background: "#050508",
  color: "#fff",
  fontFamily: "'Inter', sans-serif",
  padding: "40px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  overflow: "hidden",
  position: "relative",
};
const bgGlowStyle = {
  position: "absolute",
  width: "100vw",
  height: "100vh",
  filter: "blur(150px)",
  zIndex: 0,
  transition: "background 0.8s ease",
};
const headerStyle = { textAlign: "center", zIndex: 1, marginBottom: "30px" };
const titleStyle = { fontSize: "32px", letterSpacing: "10px", margin: 0 };
const mainLayout = {
  display: "flex",
  width: "100%",
  maxWidth: "1250px",
  gap: "30px",
  zIndex: 1,
};
const canvasWrapper = {
  flex: 1.5,
  background: "rgba(255,255,255,0.02)",
  borderRadius: "30px",
  border: "1px solid rgba(255,255,255,0.05)",
  padding: "20px",
};
const infoPanelStyle = (active, color) => ({
  flex: 1,
  padding: "40px",
  background: "rgba(10,10,20,0.8)",
  backdropFilter: "blur(20px)",
  borderRadius: "30px",
  border: `1px solid ${active ? color + "44" : "rgba(255,255,255,0.1)"}`,
  transition: "0.5s",
});
const legendContainer = {
  display: "flex",
  flexWrap: "wrap",
  gap: "10px",
  justifyContent: "center",
  marginTop: "40px",
  zIndex: 1,
  maxWidth: "1000px",
};
const pillStyle = (active, color) => ({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  padding: "8px 16px",
  background: active ? `${color}22` : "rgba(255,255,255,0.03)",
  border: `1px solid ${active ? color : "rgba(255,255,255,0.1)"}`,
  borderRadius: "20px",
  color: active ? "#fff" : "#777",
  fontSize: "12px",
  cursor: "pointer",
  transition: "0.3s",
});
const tagContainer = {
  display: "flex",
  flexWrap: "wrap",
  gap: "8px",
  marginBottom: "20px",
};
const tagStyle = (color) => ({
  padding: "4px 12px",
  borderRadius: "10px",
  fontSize: "11px",
  background: `${color}15`,
  color: color,
  border: `1px solid ${color}44`,
});
const clinicalBox = (color) => ({
  padding: "15px",
  background: "rgba(0,0,0,0.3)",
  borderRadius: "12px",
  fontSize: "12px",
  color: "#999",
  borderLeft: `3px solid ${color}`,
});
const badgeStyle = (color) => ({
  fontSize: "10px",
  color: color,
  letterSpacing: "2px",
});
const emptyState = {
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  opacity: 0.2,
  fontWeight: "bold",
};
