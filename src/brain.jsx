import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const brainRegions = [
  {
    id: "frontal",
    label: "Frontal Lobe",
    emoji: "🎯",
    color: "#ff6b6b",
    accentColor: "#ff9f9f",
    path: "M100,340 C95,270 100,160 150,110 C195,68 290,60 320,100 C340,130 335,230 320,340 Z",
    labelX: 210,
    labelY: 210,
    title: "Frontal Lobe",
    subtitle: "Executive Function & Decision Making",
    desc: "Bertindak sebagai pusat kontrol eksekutif: merencanakan, membuat keputusan, dan mengatur perilaku. Prefrontal cortex berperan sebagai filter sosial yang menahan impuls dan menimbang konsekuensi.",
    detailedDesc:
      "Frontal lobe mengintegrasikan informasi dari berbagai area untuk mengarahkan tujuan jangka panjang. Area Broca (produksi bahasa) berada di sini, bersama primary motor cortex yang memulai gerakan sadar. Perkembangannya berlanjut hingga sekitar usia 25 tahun.",
    functions: [
      "Perencanaan Strategis",
      "Pengambilan Keputusan",
      "Kontrol Perilaku",
      "Kepribadian",
      "Bahasa Ekspresif",
    ],
    keyStructures: [
      "Prefrontal Cortex",
      "Broca's Area",
      "Primary Motor Cortex",
      "Orbitofrontal Cortex",
      "Anterior Cingulate",
    ],
    clinical:
      "Kerusakan frontal lobe dapat menyebabkan dysexecutive syndrome: impulsivitas, perubahan kepribadian, dan gangguan penilaian sosial. Kasus Phineas Gage menunjukkan perubahan kepribadian drastis setelah cedera frontal.",
    connections: [
      { targetId: "parietal", type: "Executive-Sensory Integration" },
      { targetId: "temporal", type: "Memory-Decision Loop" },
      { targetId: "limbic", type: "Emotion Regulation" },
    ],
    neurotransmitters: ["Dopamine", "Glutamate", "Serotonin"],
    activity: 78,
    connectionCount: 124,
    region: "Anterior",
    volume: "~41% of Cortex",
    aiAnalogy: "Model perencana (planner) yang memutuskan prioritas aksi.",
  },
  {
    id: "parietal",
    label: "Parietal Lobe",
    emoji: "📡",
    color: "#4aa3ff",
    accentColor: "#7db9ff",
    path: "M310,280 C308,200 315,120 360,85 C400,58 470,70 490,120 C505,165 498,230 490,280 Z",
    labelX: 400,
    labelY: 185,
    title: "Parietal Lobe",
    subtitle: "Sensory Integration & Spatial Awareness",
    desc: "Hub sensorik yang menggabungkan sentuhan, suhu, nyeri, dan posisi tubuh. Membentuk peta ruang 3D untuk orientasi dan navigasi.",
    detailedDesc:
      "Somatosensory cortex memetakan tubuh berdasarkan kepadatan reseptor. Parietal lobe juga penting untuk perhitungan, manipulasi simbol, dan perhatian spasial. Lobus kanan dominan untuk perhatian spasial global.",
    functions: [
      "Integrasi Sensorik",
      "Navigasi Spasial",
      "Persepsi Sentuhan",
      "Kognisi Numerik",
      "Perhatian",
    ],
    keyStructures: [
      "Primary Somatosensory Cortex",
      "Superior Parietal Lobule",
      "Inferior Parietal Lobule",
      "Angular Gyrus",
      "Supramarginal Gyrus",
    ],
    clinical:
      "Kerusakan dapat menimbulkan hemispatial neglect: mengabaikan satu sisi ruang. Pasien bisa hanya makan setengah piring atau menggambar setengah objek tanpa sadar.",
    connections: [
      { targetId: "frontal", type: "Sensory-Motor Integration" },
      { targetId: "occipital", type: "Visual-Spatial Processing" },
      { targetId: "thalamus", type: "Sensory Relay" },
    ],
    neurotransmitters: ["Glutamate", "Acetylcholine", "GABA"],
    activity: 62,
    connectionCount: 98,
    region: "Dorsal-Posterior",
    volume: "~19% of Cortex",
    aiAnalogy: "Fusi data multi-sensor untuk membangun peta lingkungan.",
  },
  {
    id: "occipital",
    label: "Occipital Lobe",
    emoji: "👁️",
    color: "#9c7bff",
    accentColor: "#c0abff",
    path: "M480,270 C478,220 485,170 510,150 C535,132 575,140 588,175 C598,210 595,250 588,280 C580,300 490,295 480,270 Z",
    labelX: 535,
    labelY: 215,
    title: "Occipital Lobe",
    subtitle: "Visual Processing Center",
    desc: "Pusat pengolahan visual yang mengubah sinyal cahaya menjadi objek bermakna. Informasi visual diproses bertahap dari fitur dasar hingga pengenalan kompleks.",
    detailedDesc:
      "Occipital lobe memiliki peta retina (retinotopic map) dengan representasi fovea yang sangat besar. Jalur ventral memproses identitas objek, jalur dorsal memproses lokasi dan gerak.",
    functions: [
      "Penglihatan",
      "Interpretasi Visual",
      "Pengenalan Warna",
      "Depth Perception",
      "Pengenalan Wajah",
    ],
    keyStructures: [
      "Primary Visual Cortex (V1)",
      "Visual Cortex V2/V3",
      "V4 Color Area",
      "MT/V5 Motion Area",
      "Calcarine Sulcus",
    ],
    clinical:
      "Cortical blindness: mata sehat tetapi otak tidak memproses visual. Anton-Babinski: pasien buta tetapi menyangkal kebutaannya. Visual agnosia: melihat tanpa mengenali objek.",
    connections: [
      { targetId: "parietal", type: "Where Pathway" },
      { targetId: "temporal", type: "What Pathway" },
      { targetId: "thalamus", type: "Visual Relay" },
    ],
    neurotransmitters: ["Glutamate", "GABA", "Acetylcholine"],
    activity: 71,
    connectionCount: 87,
    region: "Posterior",
    volume: "~18% of Cortex",
    aiAnalogy: "Vision encoder: ekstraksi fitur hingga pengenalan objek.",
  },
  {
    id: "temporal",
    label: "Temporal Lobe",
    emoji: "💬",
    color: "#ff9f4a",
    accentColor: "#ffbf7d",
    path: "M420,275 C418,310 425,370 460,410 C490,438 545,440 570,415 C590,390 585,340 578,290 C570,265 425,260 420,275 Z",
    labelX: 498,
    labelY: 355,
    title: "Temporal Lobe",
    subtitle: "Memory, Language & Auditory Processing",
    desc: "Pusat memori jangka panjang dan pemrosesan bahasa. Hippocampus membentuk memori baru dan amygdala menambahkan bobot emosional.",
    detailedDesc:
      "Temporal lobe menyimpan representasi memori episodik yang tersebar. Area Wernicke mengatur pemahaman bahasa, sedangkan cortex auditori memproses suara kompleks.",
    functions: [
      "Memori Jangka Panjang",
      "Pemahaman Bahasa",
      "Pengenalan Wajah",
      "Pemrosesan Auditori",
      "Emosi",
    ],
    keyStructures: [
      "Hippocampus",
      "Amygdala",
      "Primary Auditory Cortex",
      "Wernicke's Area",
      "Fusiform Gyrus",
    ],
    clinical:
      "Anterograde amnesia: tidak bisa membentuk memori baru (kasus H.M.). Wernicke's aphasia: bicara lancar tapi tidak koheren. Temporal lobe epilepsy bisa memicu deja vu.",
    connections: [
      { targetId: "frontal", type: "Memory-Decision Loop" },
      { targetId: "limbic", type: "Emotional Memory" },
      { targetId: "occipital", type: "Visual Recognition" },
    ],
    neurotransmitters: ["Glutamate", "GABA", "Acetylcholine"],
    activity: 84,
    connectionCount: 156,
    region: "Lateral-Inferior",
    volume: "~22% of Cortex",
    aiAnalogy: "Memory indexer & language decoder.",
  },
  {
    id: "limbic",
    label: "Limbic System",
    emoji: "⚡",
    color: "#f6c453",
    accentColor: "#ffe1a3",
    path: "M290,310 C288,275 295,240 330,225 C360,213 410,218 425,245 C437,268 432,305 420,325 C405,342 295,340 290,310 Z",
    labelX: 355,
    labelY: 280,
    title: "Limbic System",
    subtitle: "Emotional Processing & Memory Formation",
    desc: "Jaringan struktur yang mengatur emosi, motivasi, pembelajaran, dan memori. Amygdala sebagai alarm emosional, hippocampus sebagai pembentuk memori.",
    detailedDesc:
      "Sistem limbik menghubungkan emosi dengan respon tubuh melalui hypothalamus. Reward system (nucleus accumbens) menguatkan perilaku yang memberi rasa senang.",
    functions: [
      "Regulasi Emosi",
      "Formasi Memori",
      "Motivasi",
      "Respons Stress",
      "Reward Processing",
    ],
    keyStructures: [
      "Amygdala",
      "Hippocampus",
      "Cingulate Gyrus",
      "Nucleus Accumbens",
      "Septal Nuclei",
    ],
    clinical:
      "Hiperaktivitas amygdala terkait anxiety dan PTSD. Kerusakan hippocampus menyebabkan amnesia. Depresi terkait disregulasi sirkuit limbik-prefrontal.",
    connections: [
      { targetId: "frontal", type: "Emotion Regulation" },
      { targetId: "hypothalamus", type: "Autonomic Response" },
      { targetId: "temporal", type: "Emotional Memory" },
    ],
    neurotransmitters: ["Serotonin", "Dopamine", "Norepinephrine", "GABA"],
    activity: 91,
    connectionCount: 201,
    region: "Deep-Medial",
    volume: "~5% of Brain Volume",
    aiAnalogy: "Reward engine yang memberi bobot emosi pada keputusan.",
  },
  {
    id: "thalamus",
    label: "Thalamus",
    emoji: "🔄",
    color: "#34cdb5",
    accentColor: "#78e6d7",
    path: "M320,275 C318,255 325,235 348,228 C368,222 395,228 400,248 C404,265 398,278 388,285 C370,292 322,288 320,275 Z",
    labelX: 358,
    labelY: 258,
    title: "Thalamus",
    subtitle: "Central Relay Station & Consciousness",
    desc: "Stasiun relay utama yang mengarahkan hampir semua informasi sensorik ke korteks. Mengatur aliran informasi untuk perhatian dan kesadaran.",
    detailedDesc:
      "Thalamus memiliki nuklei spesifik untuk modalitas sensorik. Berperan dalam integrasi multimodal dan modulasi ritme tidur-bangun.",
    functions: [
      "Sensory Relay",
      "Regulasi Kesadaran",
      "Integrasi Informasi",
      "Regulasi Tidur",
      "Perhatian",
    ],
    keyStructures: [
      "LGN (Visual)",
      "MGN (Auditory)",
      "Pulvinar",
      "Ventral Anterior Nucleus",
      "Intralaminar Nuclei",
    ],
    clinical:
      "Thalamic stroke dapat memicu thalamic pain syndrome dan gangguan kesadaran. Kerusakan intralaminar nuclei dapat mengakibatkan koma.",
    connections: [
      { targetId: "frontal", type: "Cortico-Thalamic Loop" },
      { targetId: "brainstem", type: "Consciousness Regulation" },
      { targetId: "basalGanglia", type: "Motor Modulation" },
    ],
    neurotransmitters: ["Glutamate", "GABA", "Acetylcholine"],
    activity: 55,
    connectionCount: 342,
    region: "Central-Deep",
    volume: "~2% of Brain Volume",
    aiAnalogy: "Router utama yang mengarahkan sinyal ke modul yang tepat.",
  },
  {
    id: "hypothalamus",
    label: "Hypothalamus",
    emoji: "🌡️",
    color: "#5bc86a",
    accentColor: "#8be39a",
    path: "M325,288 C323,302 328,320 350,328 C370,334 392,330 398,318 C403,306 398,290 390,286 C372,280 327,282 325,288 Z",
    labelX: 360,
    labelY: 310,
    title: "Hypothalamus",
    subtitle: "Homeostasis & Endocrine Control",
    desc: "Pusat kendali homeostasis: suhu, lapar, haus, siklus tidur-bangun, dan respons stres. Menghubungkan sistem saraf dengan hormonal.",
    detailedDesc:
      "Mengatur ritme sirkadian melalui suprachiasmatic nucleus. Mengontrol HPA axis untuk respons stres dan mengatur pelepasan hormon dari pituitary.",
    functions: [
      "Homeostasis",
      "Regulasi Suhu",
      "Kontrol Endokrin",
      "Ritme Sirkadian",
      "Perilaku Insting",
    ],
    keyStructures: [
      "Suprachiasmatic Nucleus",
      "Arcuate Nucleus",
      "Paraventricular Nucleus",
      "Mammillary Bodies",
      "Pituitary Stalk",
    ],
    clinical:
      "Lesi dapat menyebabkan gangguan tidur, diabetes insipidus, perubahan nafsu makan, dan disregulasi suhu tubuh.",
    connections: [
      { targetId: "limbic", type: "Emotional Response" },
      { targetId: "brainstem", type: "Autonomic Regulation" },
      { targetId: "thalamus", type: "Circadian Integration" },
    ],
    neurotransmitters: ["Neuropeptides", "Dopamine", "GABA"],
    activity: 67,
    connectionCount: 78,
    region: "Ventral-Deep",
    volume: "<1% of Brain Volume",
    aiAnalogy: "Autopilot homeostasis yang menjaga sistem tetap stabil.",
  },
  {
    id: "basalGanglia",
    label: "Basal Ganglia",
    emoji: "🔁",
    color: "#ff7aa2",
    accentColor: "#ffb3c7",
    path: "M260,270 C258,252 264,238 282,232 C298,227 318,233 320,248 C322,262 316,275 306,280 C290,285 262,282 260,270 Z",
    labelX: 290,
    labelY: 258,
    title: "Basal Ganglia",
    subtitle: "Motor Control & Habit Formation",
    desc: "Kelompok nuklei subkortikal yang memilih dan memulai gerakan yang tepat, serta menekan gerakan yang tidak dibutuhkan. Penting untuk kebiasaan.",
    detailedDesc:
      "Sirkuit langsung memfasilitasi gerakan dan sirkuit tidak langsung menghambat gerakan. Dopamine dari substantia nigra memodulasi keseimbangan ini.",
    functions: [
      "Kontrol Motor",
      "Pembelajaran Kebiasaan",
      "Sistem Reward",
      "Seleksi Gerakan",
      "Kognisi Procedural",
    ],
    keyStructures: [
      "Caudate Nucleus",
      "Putamen",
      "Globus Pallidus",
      "Substantia Nigra",
      "Subthalamic Nucleus",
    ],
    clinical:
      "Parkinson terjadi karena degenerasi dopamine. Huntington melibatkan degenerasi striatum. Dyskinesia dapat muncul sebagai efek samping obat.",
    connections: [
      { targetId: "thalamus", type: "Motor Feedback" },
      { targetId: "frontal", type: "Motor Planning" },
      { targetId: "brainstem", type: "Posture Modulation" },
    ],
    neurotransmitters: ["Dopamine", "GABA", "Glutamate", "Acetylcholine"],
    activity: 73,
    connectionCount: 109,
    region: "Sub-Cortical",
    volume: "~3% of Brain Volume",
    aiAnalogy: "Policy selector yang menyalakan aksi dan mematikan noise.",
  },
  {
    id: "cerebellum",
    label: "Cerebellum",
    emoji: "🎨",
    color: "#ff8fb1",
    accentColor: "#ffc0d4",
    path: "M500,380 C498,345 505,310 535,295 C560,282 600,288 615,315 C627,340 622,375 612,400 C600,420 505,418 500,380 Z",
    labelX: 558,
    labelY: 350,
    title: "Cerebellum",
    subtitle: "Motor Coordination & Cognitive Timing",
    desc: "Meski hanya 10% volume, cerebellum menyimpan lebih dari 50% neuron. Mengatur koordinasi, keseimbangan, dan timing gerakan.",
    detailedDesc:
      "Menerima salinan perintah motorik dan feedback sensorik untuk koreksi cepat. Pola microcircuit yang teratur memungkinkan presisi milidetik.",
    functions: [
      "Koordinasi Motor",
      "Keseimbangan",
      "Timing Presisi",
      "Belajar Motorik",
      "Fungsi Kognitif",
    ],
    keyStructures: [
      "Cerebellar Vermis",
      "Cerebellar Hemispheres",
      "Dentate Nucleus",
      "Purkinje Cells",
      "Flocculonodular Lobe",
    ],
    clinical:
      "Kerusakan menyebabkan ataxia, tremor intention, dan dismetria. Cerebellar mutism dapat terjadi pasca operasi.",
    connections: [
      { targetId: "brainstem", type: "Balance & Posture" },
      { targetId: "frontal", type: "Cortico-Cerebellar Loop" },
      { targetId: "parietal", type: "Sensorimotor Timing" },
    ],
    neurotransmitters: ["Glutamate", "GABA"],
    activity: 48,
    connectionCount: 67,
    region: "Posterior-Inferior",
    volume: "~10% of Brain Volume",
    aiAnalogy: "Stabilizer yang melakukan koreksi mikro secara real-time.",
  },
  {
    id: "brainstem",
    label: "Brain Stem",
    emoji: "❤️",
    color: "#7d8cff",
    accentColor: "#b1bbff",
    path: "M380,335 C378,365 375,410 380,460 C383,490 395,510 415,512 C435,510 448,490 450,460 C454,410 450,365 445,335 C440,320 385,318 380,335 Z",
    labelX: 415,
    labelY: 420,
    title: "Brain Stem",
    subtitle: "Vital Functions & Consciousness",
    desc: "Struktur paling kuno yang mengatur fungsi vital otomatis: pernapasan, detak jantung, tekanan darah, dan kesadaran.",
    detailedDesc:
      "Terdiri dari midbrain, pons, dan medulla. Reticular formation mengatur kewaspadaan dan siklus tidur. Jalur utama semua informasi sensorik dan motorik.",
    functions: [
      "Fungsi Vital",
      "Kesadaran",
      "Refleks Protektif",
      "Autonomic Control",
      "Integrasi Sensorimotor",
    ],
    keyStructures: [
      "Midbrain",
      "Pons",
      "Medulla Oblongata",
      "Reticular Formation",
      "Cranial Nerve Nuclei",
    ],
    clinical:
      "Kerusakan brainstem sering fatal. Brainstem stroke bisa menyebabkan locked-in syndrome. Herniasi brainstem adalah kondisi emergensi.",
    connections: [
      { targetId: "thalamus", type: "Arousal Pathways" },
      { targetId: "cerebellum", type: "Coordination Circuits" },
      { targetId: "spinalCord", type: "Ascending/Descending Tracts" },
    ],
    neurotransmitters: [
      "Serotonin",
      "Norepinephrine",
      "Dopamine",
      "Acetylcholine",
    ],
    activity: 99,
    connectionCount: 88,
    region: "Medulla-Pons",
    volume: "~2.5% of Brain Volume",
    aiAnalogy: "Kernel sistem yang menjaga proses vital tetap berjalan.",
  },
];

const anchorPoints = {
  frontal: { x: 220, y: 190 },
  parietal: { x: 420, y: 200 },
  occipital: { x: 525, y: 210 },
  temporal: { x: 520, y: 350 },
  limbic: { x: 370, y: 275 },
  thalamus: { x: 365, y: 260 },
  hypothalamus: { x: 360, y: 315 },
  basalGanglia: { x: 295, y: 255 },
  cerebellum: { x: 565, y: 360 },
  brainstem: { x: 415, y: 430 },
  spinalCord: { x: 415, y: 520 },
};

function PulseDot({ x, y, color }) {
  return (
    <g>
      <motion.circle
        cx={x}
        cy={y}
        r="4"
        fill={color}
        animate={{ scale: [1, 1.25, 1], opacity: [0.9, 0.6, 0.9] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      />
      <motion.circle
        cx={x}
        cy={y}
        r="4"
        fill="none"
        stroke={color}
        strokeWidth="1.2"
        animate={{ r: [4, 16], opacity: [0.5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </g>
  );
}

function NeuralConnections({ activeRegion }) {
  if (!activeRegion) return null;

  const from = anchorPoints[activeRegion.id];
  if (!from) return null;

  return (
    <g>
      {activeRegion.connections.map((conn, i) => {
        const target = anchorPoints[conn.targetId];
        if (!target) return null;
        return (
          <motion.line
            key={`${conn.targetId}-${i}`}
            x1={from.x}
            y1={from.y}
            x2={target.x}
            y2={target.y}
            stroke={activeRegion.accentColor}
            strokeWidth="1.5"
            strokeDasharray="6 4"
            opacity="0.45"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.45 }}
            transition={{ duration: 1.1, delay: i * 0.15 }}
          />
        );
      })}
    </g>
  );
}

function InfoCard({ title, children }) {
  return (
    <div className="info-card">
      <div className="info-card-title">{title}</div>
      {children}
    </div>
  );
}

function StatPill({ label, value }) {
  return (
    <div className="stat-pill">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

export default function UltimateBrainMap() {
  const [selected, setSelected] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [viewMode, setViewMode] = useState("anatomy");
  const active = selected || hovered;

  const stats = useMemo(() => {
    const totalConnections = brainRegions.reduce(
      (acc, region) => acc + region.connectionCount,
      0,
    );
    const avgActivity = Math.round(
      brainRegions.reduce((acc, region) => acc + region.activity, 0) /
        brainRegions.length,
    );
    return {
      totalConnections,
      avgActivity,
    };
  }, []);

  return (
    <div className="page" style={{ "--accent": active?.color || "#2f8cff" }}>
      <div className="bg-gradient" />
      <div className="bg-orb bg-orb-one" />
      <div className="bg-orb bg-orb-two" />
      <div className="bg-grid" />

      <header className="hero">
        <div className="hero-badge">Neuroanatomy + AI • Clinical Interface</div>
        <h1 className="hero-title">Neural Connectome</h1>
        <p className="hero-subtitle">
          Peta anatomi otak yang detail, informatif, dan mudah dibaca. Dirancang
          seperti dashboard dokter modern: anatomi manusia, kecerdasan buatan,
          dan empati dalam satu tampilan.
        </p>

        <div className="hero-stats">
          <StatPill label="Regions" value={`${brainRegions.length} / 10`} />
          <StatPill label="Avg Activity" value={`${stats.avgActivity}%`} />
          <StatPill
            label="Connections"
            value={`${stats.totalConnections.toLocaleString()}+`}
          />
        </div>

        <div className="hero-controls">
          {[
            { id: "anatomy", label: "Anatomy" },
            { id: "connections", label: "Circuits" },
            { id: "functions", label: "Functions" },
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => setViewMode(mode.id)}
              className={`pill-button ${
                viewMode === mode.id ? "is-active" : ""
              }`}
            >
              {mode.label}
            </button>
          ))}
          <div className="pill-button is-muted">3D View Soon</div>
        </div>
      </header>

      <main className="content">
        <section className="panel map-panel">
          <div className="panel-header">
            <div>
              <p className="panel-title">Sagittal Brain Map</p>
              <p className="panel-caption">
                Hover atau klik region untuk detail penuh
              </p>
            </div>
            <div className="panel-legend">
              <span className="legend-dot" />
              <span>Medical-grade visualization</span>
            </div>
          </div>

          <div className="brain-container">
            <svg viewBox="60 50 580 500" aria-label="Brain map">
              <defs>
                <filter id="regionGlow">
                  <feGaussianBlur stdDeviation="10" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <filter id="softShadow">
                  <feDropShadow
                    dx="0"
                    dy="6"
                    stdDeviation="8"
                    floodColor="#0b1220"
                    floodOpacity="0.35"
                  />
                </filter>
                <linearGradient
                  id="brainGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="rgba(47,140,255,0.08)" />
                  <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                </linearGradient>
              </defs>

              <rect
                x="60"
                y="50"
                width="580"
                height="500"
                fill="url(#brainGradient)"
              />

              {[...Array(12)].map((_, i) => (
                <line
                  key={`v${i}`}
                  x1={60 + i * 48}
                  y1="50"
                  x2={60 + i * 48}
                  y2="550"
                  stroke="rgba(75,120,170,0.08)"
                  strokeWidth="0.6"
                />
              ))}
              {[...Array(10)].map((_, i) => (
                <line
                  key={`h${i}`}
                  x1="60"
                  y1={50 + i * 50}
                  x2="640"
                  y2={50 + i * 50}
                  stroke="rgba(75,120,170,0.08)"
                  strokeWidth="0.6"
                />
              ))}

              <ellipse
                cx="380"
                cy="290"
                rx="260"
                ry="230"
                fill="none"
                stroke="rgba(70,120,180,0.2)"
                strokeWidth="2"
                strokeDasharray="10 6"
              />

              {active && viewMode === "connections" && (
                <NeuralConnections activeRegion={active} />
              )}

              {brainRegions.map((r) => {
                const isActive = active?.id === r.id;
                const isOther = active && active.id !== r.id;

                return (
                  <g
                    key={r.id}
                    className="region-group"
                    onMouseEnter={() => setHovered(r)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() =>
                      setSelected(selected?.id === r.id ? null : r)
                    }
                  >
                    {isActive && (
                      <motion.path
                        d={r.path}
                        fill={r.color}
                        opacity="0.2"
                        filter="url(#regionGlow)"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.2 }}
                        transition={{ duration: 0.5 }}
                      />
                    )}

                    <motion.path
                      d={r.path}
                      animate={{
                        fill: isActive
                          ? `${r.color}99`
                          : isOther
                            ? "rgba(200,210,225,0.15)"
                            : "rgba(210,220,235,0.35)",
                        stroke: isActive
                          ? r.accentColor
                          : "rgba(130,160,200,0.35)",
                        strokeWidth: isActive ? 2.6 : 1.4,
                      }}
                      transition={{ duration: 0.3 }}
                      filter="url(#softShadow)"
                    />

                    <text
                      x={r.labelX}
                      y={r.labelY}
                      textAnchor="middle"
                      className={`region-label ${isActive ? "is-active" : ""}`}
                      style={{
                        fill: isActive
                          ? "#0b1220"
                          : isOther
                            ? "rgba(70,90,120,0.4)"
                            : "rgba(40,60,90,0.8)",
                      }}
                    >
                      {r.label}
                    </text>

                    {isActive && (
                      <>
                        <PulseDot
                          x={r.labelX - 32}
                          y={r.labelY - 20}
                          color={r.accentColor}
                        />
                        <PulseDot
                          x={r.labelX + 28}
                          y={r.labelY + 15}
                          color={r.accentColor}
                        />
                      </>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="panel-footer">
            <span>Axis: X 60-640 · Y 50-550</span>
            <span>Sagittal plane • 2D clinical view</span>
          </div>
        </section>

        <section className="panel info-panel">
          <AnimatePresence mode="wait">
            {active ? (
              <motion.div
                key={active.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="info-content"
              >
                <div className="region-header">
                  <div className="region-title">
                    <div
                      className="region-icon"
                      style={{ background: `${active.color}1f` }}
                    >
                      {active.emoji}
                    </div>
                    <div>
                      <h2 style={{ color: active.color }}>{active.title}</h2>
                      <p style={{ color: active.accentColor }}>
                        {active.subtitle}
                      </p>
                    </div>
                  </div>
                  <div className="region-badge">Active Focus</div>
                </div>

                <div className="stat-grid">
                  <div className="stat-card">
                    <span>Neural Activity</span>
                    <strong style={{ color: active.color }}>
                      {active.activity}%
                    </strong>
                  </div>
                  <div className="stat-card">
                    <span>Connection Count</span>
                    <strong style={{ color: active.color }}>
                      {active.connectionCount}
                    </strong>
                  </div>
                  <div className="stat-card">
                    <span>Brain Volume</span>
                    <strong style={{ color: active.color }}>
                      {active.volume}
                    </strong>
                  </div>
                </div>

                <InfoCard title="Overview">
                  <p className="body-text">{active.desc}</p>
                  <p className="body-text subtle">{active.detailedDesc}</p>
                </InfoCard>

                <InfoCard title="Key Structures">
                  <div className="chip-grid">
                    {active.keyStructures.map((item) => (
                      <span key={item} className="chip">
                        {item}
                      </span>
                    ))}
                  </div>
                </InfoCard>

                <InfoCard title="Primary Functions">
                  <div className="chip-grid">
                    {active.functions.map((item) => (
                      <span key={item} className="chip is-strong">
                        {item}
                      </span>
                    ))}
                  </div>
                </InfoCard>

                <InfoCard title="Connectivity Map">
                  <div className="connection-list">
                    {active.connections.map((conn) => {
                      const target = brainRegions.find(
                        (region) => region.id === conn.targetId,
                      );
                      return (
                        <div key={conn.targetId} className="connection-item">
                          <span>{target ? target.label : conn.targetId}</span>
                          <span className="connection-type">{conn.type}</span>
                        </div>
                      );
                    })}
                  </div>
                </InfoCard>

                <InfoCard title="Neurochemistry">
                  <div className="chip-grid">
                    {active.neurotransmitters?.map((nt) => (
                      <span key={nt} className="chip is-soft">
                        {nt}
                      </span>
                    ))}
                  </div>
                </InfoCard>

                <InfoCard title="Clinical Significance">
                  <p className="body-text subtle">{active.clinical}</p>
                </InfoCard>

                <InfoCard title="AI Analogy">
                  <p className="body-text">{active.aiAnalogy}</p>
                </InfoCard>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="empty-state"
              >
                <div className="empty-icon">🧠</div>
                <h3>Pilih sebuah region</h3>
                <p>
                  Klik atau hover region pada peta untuk melihat detail anatomi,
                  fungsi, konektivitas, dan signifikansi klinis.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>

      <section className="legend">
        {brainRegions.map((r) => {
          const isSelected = selected?.id === r.id;
          return (
            <button
              key={r.id}
              className={`legend-item ${isSelected ? "is-selected" : ""}`}
              onMouseEnter={() => setHovered(r)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setSelected(isSelected ? null : r)}
              style={{
                borderColor: isSelected ? r.color : "rgba(80,110,150,0.25)",
              }}
            >
              <span className="legend-dot" style={{ background: r.color }} />
              <span>{r.label}</span>
            </button>
          );
        })}
      </section>

      <footer className="footer">
        <span>© 2026 Neural Connectome Project</span>
        <span>Medical visualization • human anatomy x artificial insight</span>
        <span>Designed for clarity, empathy, and precision</span>
      </footer>
    </div>
  );
}
