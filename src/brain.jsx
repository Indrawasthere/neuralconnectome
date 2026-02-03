import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── FULL ENHANCED BRAIN DATA (10 REGIONS) ─── */
const brainRegions = [
  {
    id: "frontal",
    label: "Frontal Lobe",
    emoji: "🎯",
    color: "#e74c3c",
    accentColor: "#ff6b6b",
    path: "M100,340 C95,270 100,160 150,110 C195,68 290,60 320,100 C340,130 335,230 320,340 Z",
    labelX: 210,
    labelY: 210,
    title: "Frontal Lobe",
    subtitle: "Executive Function & Decision Making",
    desc: "Bertindak sebagai CEO otak, mengatur fungsi eksekutif seperti perencanaan, pengambilan keputusan, dan kontrol perilaku. Prefrontal Cortex di sini berfungsi sebagai 'filter sosial' yang mencegah Anda mengatakan hal yang mungkin disesali.",
    detailedDesc:
      "Frontal lobe adalah pusat kognitif tertinggi yang mengintegrasikan informasi dari seluruh otak. Area Broca yang mengatur produksi bahasa juga berada di sini. Perkembangan frontal lobe berlanjut hingga usia 25 tahun, menjelaskan mengapa remaja cenderung impulsif.",
    functions: [
      "Perencanaan",
      "Keputusan",
      "Kontrol Perilaku",
      "Kepribadian",
      "Bahasa Ekspresif",
    ],
    clinical:
      "Kerusakan frontal lobe dapat menyebabkan sindrom dysexecutive - impulsivitas ekstrem, perubahan kepribadian drastis, dan gangguan pengambilan keputusan. Kasus Phineas Gage (1848) menunjukkan perubahan kepribadian total setelah kerusakan frontal lobe.",
    connections: [
      { region: "Parietal Lobe", type: "Executive-Sensory Integration" },
      { region: "Temporal Lobe", type: "Memory-Decision Loop" },
      { region: "Limbic System", type: "Emotion Regulation" },
    ],
    neurotransmitters: ["Dopamine", "Glutamate", "Serotonin"],
    activity: 78,
    connections: 124,
    region: "Anterior",
    volume: "~41% of Cortex",
  },
  {
    id: "parietal",
    label: "Parietal Lobe",
    emoji: "📡",
    color: "#3498db",
    accentColor: "#5dade2",
    path: "M310,280 C308,200 315,120 360,85 C400,58 470,70 490,120 C505,165 498,230 490,280 Z",
    labelX: 400,
    labelY: 185,
    title: "Parietal Lobe",
    subtitle: "Sensory Integration & Spatial Awareness",
    desc: "Bertindak sebagai hub sensorik yang mengintegrasikan informasi sentuhan, suhu, nyeri, dan posisi tubuh. Somatosensory Cortex di sini memetakan seluruh tubuh dengan area sensitif yang lebih besar untuk bagian tubuh dengan banyak reseptor.",
    detailedDesc:
      "Parietal lobe mengintegrasikan informasi dari berbagai indera untuk membentuk persepsi lingkungan 3D. Area ini juga terlibat dalam perhitungan matematika dan pemahaman simbol. Lobus parietal kanan mengatur perhatian spasial, sedangkan kiri lebih terlibat dalam bahasa.",
    functions: [
      "Integrasi Sensorik",
      "Navigasi Spasial",
      "Persepsi Sentuhan",
      "Kognisi Numerik",
      "Perhatian",
    ],
    clinical:
      "Kerusakan dapat menyebabkan hemispatial neglect - mengabaikan satu sisi ruang (biasanya kiri). Pasien mungkin hanya makan setengah piring, mencukur setengah wajah, atau menggambar setengah objek tanpa menyadarinya.",
    connections: [
      { region: "Frontal Lobe", type: "Sensory-Motor Integration" },
      { region: "Occipital Lobe", type: "Visual-Spatial Processing" },
      { region: "Thalamus", type: "Sensory Relay" },
    ],
    neurotransmitters: ["Glutamate", "Acetylcholine", "GABA"],
    activity: 62,
    connections: 98,
    region: "Dorsal-Posterior",
    volume: "~19% of Cortex",
  },
  {
    id: "occipital",
    label: "Occipital Lobe",
    emoji: "👁️",
    color: "#9b59b6",
    accentColor: "#bb8fce",
    path: "M480,270 C478,220 485,170 510,150 C535,132 575,140 588,175 C598,210 595,250 588,280 C580,300 490,295 480,270 Z",
    labelX: 535,
    labelY: 215,
    title: "Occipital Lobe",
    subtitle: "Visual Processing Center",
    desc: "Pusat pengolahan visual yang mengubah sinyal cahaya menjadi gambar bermakna. Informasi visual diproses secara bertahap: dari bentuk dasar di Primary Visual Cortex (V1) hingga pengenalan objek kompleks di area ventral.",
    detailedDesc:
      "Setiap mata mengirim informasi ke kedua sisi otak. Occipital lobe mengandung peta retina yang terdistorsi - fovea (pusat penglihatan) mendapat area korteks yang jauh lebih besar daripada perifer. Proses penglihatan melibatkan aliran ventral (what pathway) dan dorsal (where pathway).",
    functions: [
      "Penglihatan",
      "Interpretasi Visual",
      "Pengenalan Warna",
      "Depth Perception",
      "Pengenalan Wajah",
    ],
    clinical:
      "Cortical blindness - mata sehat tetapi otak tidak dapat memproses informasi visual. Anton-Babinski syndrome: pasien buta tetapi menyangkal kebutaannya. Visual agnosia: dapat melihat tetapi tidak mengenali objek.",
    connections: [
      { region: "Parietal Lobe", type: "Where Pathway" },
      { region: "Temporal Lobe", type: "What Pathway" },
      { region: "Thalamus", type: "Visual Relay" },
    ],
    neurotransmitters: ["Glutamate", "GABA", "Acetylcholine"],
    activity: 71,
    connections: 87,
    region: "Posterior",
    volume: "~18% of Cortex",
  },
  {
    id: "temporal",
    label: "Temporal Lobe",
    emoji: "💬",
    color: "#e67e22",
    accentColor: "#f5b041",
    path: "M420,275 C418,310 425,370 460,410 C490,438 545,440 570,415 C590,390 585,340 578,290 C570,265 425,260 420,275 Z",
    labelX: 498,
    labelY: 355,
    title: "Temporal Lobe",
    subtitle: "Memory, Language & Auditory Processing",
    desc: "Pusat memori jangka panjang dan pemrosesan bahasa. Hippocampus (pembentuk memori baru) dan amygdala (pemrosesan emosi) berada di lobus temporal medial. Area Wernicke di sini mengatur pemahaman bahasa.",
    detailedDesc:
      "Temporal lobe mengintegrasikan informasi dari berbagai indera untuk membentuk memori episodik. Memori jangka panjang disimpan secara distributif di seluruh neokorteks, tetapi hippocampus diperlukan untuk konsolidasi awal. Lobus temporal juga terlibat dalam pengenalan wajah dan objek kompleks.",
    functions: [
      "Memori Jangka Panjang",
      "Pemahaman Bahasa",
      "Pengenalan Wajah",
      "Pemrosesan Auditori",
      "Emosi",
    ],
    clinical:
      "Anterograde amnesia: ketidakmampuan membentuk memori baru (kasus H.M.). Wernicke's aphasia: berbicara lancar tetapi tidak koheren dan tidak memahami ucapan orang lain. Temporal lobe epilepsy dapat menyebabkan pengalaman religius atau deja vu.",
    connections: [
      { region: "Frontal Lobe", type: "Memory-Decision Loop" },
      { region: "Limbic System", type: "Emotional Memory" },
      { region: "Occipital Lobe", type: "Visual Recognition" },
    ],
    neurotransmitters: ["Glutamate", "GABA", "Acetylcholine"],
    activity: 84,
    connections: 156,
    region: "Lateral-Inferior",
    volume: "~22% of Cortex",
  },
  {
    id: "limbic",
    label: "Limbic System",
    emoji: "⚡",
    color: "#f39c12",
    accentColor: "#f7dc6f",
    path: "M290,310 C288,275 295,240 330,225 C360,213 410,218 425,245 C437,268 432,305 420,325 C405,342 295,340 290,310 Z",
    labelX: 355,
    labelY: 280,
    title: "Limbic System",
    subtitle: "Emotional Processing & Memory Formation",
    desc: "Jaringan struktur yang mengatur emosi, motivasi, pembelajaran, dan memori. Amygdala sebagai 'alarm system' emosional, hippocampus sebagai 'recorder' memori, dan cingulate gyrus mengatur konflik dan perhatian emosional.",
    detailedDesc:
      "Sistem limbic merupakan otak 'paleomammalian' yang berkembang pada mamalia awal. Mengatur respons fight-or-flight melalui koneksi ke hypothalamus. Memori emosional lebih kuat karena amygdala memodulasi konsolidasi memori di hippocampus. Juga terlibat dalam reward system melalui nucleus accumbens.",
    functions: [
      "Regulasi Emosi",
      "Formasi Memori",
      "Motivasi",
      "Respons Stress",
      "Reward Processing",
    ],
    clinical:
      "Hiperaktivitas amygdala terkait dengan anxiety disorders, PTSD, dan phobia. Kerusakan hippocampus menyebabkan amnesia. Depression terkait dengan disregulasi sistem limbic-prefrontal circuit. Abnormalitas cingulate cortex pada OCD.",
    connections: [
      { region: "Prefrontal Cortex", type: "Emotion Regulation" },
      { region: "Hypothalamus", type: "Autonomic Response" },
      { region: "All Sensory Areas", type: "Emotional Tagging" },
    ],
    neurotransmitters: ["Serotonin", "Dopamine", "Norepinephrine", "GABA"],
    activity: 91,
    connections: 201,
    region: "Deep-Medial",
    volume: "~5% of Brain Volume",
  },
  {
    id: "thalamus",
    label: "Thalamus",
    emoji: "🔄",
    color: "#1abc9c",
    accentColor: "#76d7c4",
    path: "M320,275 C318,255 325,235 348,228 C368,222 395,228 400,248 C404,265 398,278 388,285 C370,292 322,288 320,275 Z",
    labelX: 358,
    labelY: 258,
    title: "Thalamus",
    subtitle: "Central Relay Station & Consciousness",
    desc: "Stasiun relay utama yang mengarahkan hampir semua informasi sensorik ke korteks yang sesuai. Bertindak sebagai 'gatekeeper' kesadaran dengan mengatur aliran informasi antara brainstem dan cerebral cortex.",
    detailedDesc:
      "Thalamus terdiri dari beberapa nuklei spesifik yang memproses modalitas sensorik berbeda. Selain relay sensorik, thalamus juga terlibat dalam regulasi kesadaran, perhatian, dan siklus tidur-bangun melalui koneksi dengan reticular activating system. Memainkan peran kritis dalam integrasi informasi multimodal.",
    functions: [
      "Sensory Relay",
      "Regulasi Kesadaran",
      "Integrasi Informasi",
      "Regulasi Tidur",
      "Perhatian",
    ],
    clinical:
      "Thalamic stroke dapat menyebabkan thalamic pain syndrome (nyeri sentral hebat), gangguan tidur kronis, atau gangguan memori. Kerusakan intralaminar nuclei dapat mengakibatkan gangguan kesadaran atau koma.",
    connections: [
      { region: "Cerebral Cortex", type: "Bidirectional Relay" },
      { region: "Brainstem", type: "Consciousness Regulation" },
      { region: "Basal Ganglia", type: "Motor Modulation" },
    ],
    neurotransmitters: ["Glutamate", "GABA", "Acetylcholine"],
    activity: 55,
    connections: 342,
    region: "Central-Deep",
    volume: "~2% of Brain Volume",
  },
  {
    id: "hypothalamus",
    label: "Hypothalamus",
    emoji: "🌡️",
    color: "#27ae60",
    accentColor: "#58d68d",
    path: "M325,288 C323,302 328,320 350,328 C370,334 392,330 398,318 C403,306 398,290 390,286 C372,280 327,282 325,288 Z",
    labelX: 360,
    labelY: 310,
    title: "Hypothalamus",
    subtitle: "Homeostasis & Endocrine Control",
    desc: "Pusat kendali homeostasis yang mengatur suhu tubuh, lapar, haus, siklus tidur-bangun, dan respons stres melalui sistem endokrin. Menghubungkan sistem saraf dengan sistem hormonal melalui pituitary gland.",
    detailedDesc:
      "Hypothalamus mengintegrasikan sinyal dari tubuh dan otak untuk mempertahankan keseimbangan internal (homeostasis). Mengandung 'biological clock' (suprachiasmatic nucleus) yang mengatur circadian rhythm. Juga mengontrol respons stres melalui HPA axis (hypothalamic-pituitary-adrenal).",
    functions: [
      "Homeostasis",
      "Regulasi Suhu",
      "Kontrol Endokrin",
      "Ritme Sirkadian",
      "Perilaku Insting",
    ],
    clinical:
      "Lesi dapat menyebabkan diabetes insipidus (haus berlebihan), gangguan makan (hyperphagia atau aphagia), gangguan tidur, atau disregulasi suhu tubuh. Tumor seperti craniopharyngioma dapat menekan hypothalamus.",
    connections: [
      { region: "Pituitary Gland", type: "Endocrine Control" },
      { region: "Limbic System", type: "Emotional Response" },
      { region: "Brainstem", type: "Autonomic Regulation" },
    ],
    neurotransmitters: ["Various Neuropeptides", "Dopamine", "GABA"],
    activity: 67,
    connections: 78,
    region: "Ventral-Deep",
    volume: "<1% of Brain Volume",
  },
  {
    id: "basalGanglia",
    label: "Basal Ganglia",
    emoji: "🔁",
    color: "#e84393",
    accentColor: "#f8c471",
    path: "M260,270 C258,252 264,238 282,232 C298,227 318,233 320,248 C322,262 316,275 306,280 C290,285 262,282 260,270 Z",
    labelX: 290,
    labelY: 258,
    title: "Basal Ganglia",
    subtitle: "Motor Control & Habit Formation",
    desc: "Kelompok nuklei subkortikal yang mengatur gerakan voluntar, pembelajaran kebiasaan, dan sistem reward. Mengintegrasikan informasi dari korteks untuk memilih dan memulai gerakan yang tepat sambil menekan gerakan yang tidak diinginkan.",
    detailedDesc:
      "Basal ganglia beroperasi melalui sirkuit langsung (facilitasi gerakan) dan tidak langsung (inhibisi gerakan). Sistem dopamine dari substantia nigra memodulasi sirkuit ini. Juga terlibat dalam pembelajaran procedural (keterampilan motorik) dan pembentukan kebiasaan otomatis.",
    functions: [
      "Kontrol Motor",
      "Pembelajaran Kebiasaan",
      "Sistem Reward",
      "Seleksi Gerakan",
      "Kognisi Procedural",
    ],
    clinical:
      "Degenerasi sel dopamine di substantia nigra menyebabkan Parkinson's disease (tremor, bradykinesia, rigidity). Huntington's disease melibatkan degenerasi striatum (gerakan tak terkendali). Dyskinesia dapat terjadi sebagai efek samping obat antipsikotik.",
    connections: [
      { region: "Cerebral Cortex", type: "Motor Planning" },
      { region: "Thalamus", type: "Motor Feedback" },
      { region: "Substantia Nigra", type: "Dopamine Modulation" },
    ],
    neurotransmitters: ["Dopamine", "GABA", "Glutamate", "Acetylcholine"],
    activity: 73,
    connections: 109,
    region: "Sub-Cortical",
    volume: "~3% of Brain Volume",
  },
  {
    id: "cerebellum",
    label: "Cerebellum",
    emoji: "🎨",
    color: "#fd79a8",
    accentColor: "#f1948a",
    path: "M500,380 C498,345 505,310 535,295 C560,282 600,288 615,315 C627,340 622,375 612,400 C600,420 505,418 500,380 Z",
    labelX: 558,
    labelY: 350,
    title: "Cerebellum",
    subtitle: "Motor Coordination & Cognitive Timing",
    desc: "Meskipun hanya 10% volume otak, mengandung lebih dari 50% total neuron. Mengatur koordinasi gerakan, keseimbangan, dan timing motorik. Juga terlibat dalam fungsi kognitif seperti bahasa, perhatian, dan pengaturan emosi.",
    detailedDesc:
      "Cerebellum menerima salinan perintah motorik dari cortex dan feedback sensorik untuk membandingkan rencana dengan eksekusi. Melakukan koreksi halus dalam milidetik. Memiliki struktur berulang yang sangat teratur (microcircuits). Recent research menunjukkan peran dalam fungsi kognitif dan emosional.",
    functions: [
      "Koordinasi Motor",
      "Keseimbangan",
      "Timing Presisi",
      "Belajar Motorik",
      "Fungsi Kognitif",
    ],
    clinical:
      "Kerusakan menyebabkan ataxia - gangguan koordinasi, tremor intention, dismetria (kesulitan mengukur jarak), dan gangguan keseimbangan. Cerebellar mutism dapat terjadi setelah operasi. Juga terkait dengan gangguan perkembangan seperti autism.",
    connections: [
      { region: "Cerebral Cortex", type: "Cortico-Cerebellar Loop" },
      { region: "Brainstem", type: "Balance & Posture" },
      { region: "Spinal Cord", type: "Reflex Modulation" },
    ],
    neurotransmitters: ["Glutamate", "GABA"],
    activity: 48,
    connections: 67,
    region: "Posterior-Inferior",
    volume: "~10% of Brain Volume",
  },
  {
    id: "brainstem",
    label: "Brain Stem",
    emoji: "❤️",
    color: "#6c5ce7",
    accentColor: "#a29bfe",
    path: "M380,335 C378,365 375,410 380,460 C383,490 395,510 415,512 C435,510 448,490 450,460 C454,410 450,365 445,335 C440,320 385,318 380,335 Z",
    labelX: 415,
    labelY: 420,
    title: "Brain Stem",
    subtitle: "Vital Functions & Consciousness",
    desc: "Struktur paling kuno dan kritis yang mengatur fungsi vital otomatis: pernapasan, detak jantung, tekanan darah, dan kesadaran. Menghubungkan otak dengan spinal cord dan mengandung nuclei cranial nerves.",
    detailedDesc:
      "Terdiri dari midbrain, pons, dan medulla oblongata. Mengandung reticular formation yang mengatur kesadaran dan siklus tidur-bangun. Juga berperan dalam refleks protektif seperti batuk, bersin, dan menelan. Merupakan jalur utama semua informasi sensorik dan motorik antara otak dan tubuh.",
    functions: [
      "Fungsi Vital",
      "Kesadaran",
      "Refleks Protektif",
      "Autonomic Control",
      "Integrasi Sensorimotor",
    ],
    clinical:
      "Kerusakan brainstem sering fatal. Brainstem stroke dapat menyebabkan locked-in syndrome (sadar tetapi tidak dapat bergerak kecuali mata). Herniasi brainstem adalah komplikasi berbahaya dari tekanan intrakranial meningkat. Cranial nerve palsies sering berasal dari brainstem lesions.",
    connections: [
      { region: "Spinal Cord", type: "Ascending/Descending Tracts" },
      { region: "Cerebral Cortex", type: "Consciousness Pathways" },
      { region: "Cerebellum", type: "Coordination Circuits" },
    ],
    neurotransmitters: [
      "Serotonin",
      "Norepinephrine",
      "Dopamine",
      "Acetylcholine",
    ],
    activity: 99,
    connections: 88,
    region: "Medulla-Pons",
    volume: "~2.5% of Brain Volume",
  },
];

/* ─── SCANNING LINE ─── */
function ScanLine() {
  return (
    <motion.line
      x1="60"
      y1="50"
      x2="640"
      y2="50"
      stroke="rgba(0,200,255,0.25)"
      strokeWidth="2"
      strokeDasharray="8 4"
      animate={{ y1: [50, 550, 50], y2: [50, 550, 50] }}
      transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
    />
  );
}

/* ─── PULSE DOT ─── */
function PulseDot({ x, y, color }) {
  return (
    <g>
      <motion.circle
        cx={x}
        cy={y}
        r="4"
        fill={color}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [1, 0.7, 1],
        }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <motion.circle
        cx={x}
        cy={y}
        r="4"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        animate={{ r: [4, 15], opacity: [0.6, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      />
    </g>
  );
}

/* ─── NEURAL CONNECTION LINES ─── */
function NeuralConnections({ activeRegion }) {
  if (!activeRegion) return null;

  const connectionPoints = {
    frontal: [
      { x: 220, y: 180, target: "parietal", color: "#3498db" },
      { x: 230, y: 200, target: "temporal", color: "#e67e22" },
      { x: 210, y: 220, target: "limbic", color: "#f39c12" },
    ],
    parietal: [
      { x: 420, y: 200, target: "frontal", color: "#e74c3c" },
      { x: 450, y: 190, target: "occipital", color: "#9b59b6" },
      { x: 430, y: 210, target: "thalamus", color: "#1abc9c" },
    ],
    temporal: [
      { x: 520, y: 340, target: "frontal", color: "#e74c3c" },
      { x: 510, y: 360, target: "limbic", color: "#f39c12" },
      { x: 530, y: 320, target: "occipital", color: "#9b59b6" },
    ],
    limbic: [
      { x: 370, y: 270, target: "frontal", color: "#e74c3c" },
      { x: 360, y: 290, target: "hypothalamus", color: "#27ae60" },
      { x: 380, y: 280, target: "all", color: "#ffffff" },
    ],
    thalamus: [
      { x: 370, y: 250, target: "cortex", color: "#ffffff" },
      { x: 360, y: 265, target: "brainstem", color: "#6c5ce7" },
      { x: 375, y: 260, target: "basalGanglia", color: "#e84393" },
    ],
  };

  const points = connectionPoints[activeRegion.id];
  if (!points) return null;

  return (
    <g>
      {points.map((point, i) => (
        <motion.line
          key={i}
          x1={point.x}
          y1={point.y}
          x2={point.x + (Math.random() * 60 - 30)}
          y2={point.y + (Math.random() * 60 - 30)}
          stroke={point.color}
          strokeWidth="1.2"
          strokeDasharray="4 2"
          opacity="0.4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.4 }}
          transition={{ duration: 1.5, delay: i * 0.2 }}
        />
      ))}
    </g>
  );
}

/* ─── ACTIVITY BAR ─── */
function ActivityBar({ value, color, label, showPercentage = true }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 11,
          color: "#666",
          letterSpacing: 1.2,
          marginBottom: 6,
          textTransform: "uppercase",
        }}
      >
        <span>{label}</span>
        {showPercentage && (
          <span
            style={{
              color,
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
            }}
          >
            {value}%
          </span>
        )}
      </div>
      <div
        style={{
          height: 6,
          background: "rgba(255,255,255,0.08)",
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1.6, ease: "easeOut" }}
          style={{
            height: "100%",
            background: `linear-gradient(90deg, ${color}40, ${color})`,
            borderRadius: 4,
            boxShadow: `0 0 8px ${color}40`,
          }}
        />
      </div>
    </div>
  );
}

/* ─── INFO CARD ─── */
function InfoCard({ title, children, color }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.03)",
        borderRadius: 12,
        padding: "16px",
        border: `1px solid ${color}20`,
        marginBottom: 16,
      }}
    >
      <div
        style={{
          fontSize: 10,
          color: color,
          letterSpacing: 1.5,
          marginBottom: 10,
          textTransform: "uppercase",
          fontWeight: 600,
        }}
      >
        {title}
      </div>
      {children}
    </div>
  );
}

/* ─── CORNER BRACKETS ─── */
function CornerBrackets({ color = "rgba(255,255,255,0.15)", size = 16 }) {
  const b = {
    position: "absolute",
    width: size,
    height: size,
    pointerEvents: "none",
  };
  const h = {
    position: "absolute",
    height: 2,
    width: "100%",
    background: color,
  };
  const v = {
    position: "absolute",
    width: 2,
    height: "100%",
    background: color,
  };
  return (
    <>
      <div style={{ ...b, top: 0, left: 0 }}>
        <div style={{ ...h, top: 0 }} />
        <div style={{ ...v, left: 0 }} />
      </div>
      <div style={{ ...b, top: 0, right: 0 }}>
        <div style={{ ...h, top: 0 }} />
        <div style={{ ...v, right: 0 }} />
      </div>
      <div style={{ ...b, bottom: 0, left: 0 }}>
        <div style={{ ...h, bottom: 0 }} />
        <div style={{ ...v, left: 0 }} />
      </div>
      <div style={{ ...b, bottom: 0, right: 0 }}>
        <div style={{ ...h, bottom: 0 }} />
        <div style={{ ...v, right: 0 }} />
      </div>
    </>
  );
}

/* ─── MAIN COMPONENT ─── */
export default function UltimateBrainMap() {
  const [selected, setSelected] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [tick, setTick] = useState(0);
  const [viewMode, setViewMode] = useState("anatomy"); // anatomy, connections, functions
  const active = selected || hovered;

  useEffect(() => {
    const t = setInterval(() => setTick((n) => n + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const minutes = String(Math.floor(tick / 60)).padStart(2, "0");
  const secs = String(tick % 60).padStart(2, "0");

  return (
    <div style={S.root}>
      {/* AMBIENT BACKGROUND */}
      <div style={S.backgroundGradient} />
      <motion.div
        animate={{
          background: active
            ? `radial-gradient(ellipse at center, ${active.color}15 0%, transparent 70%)`
            : "transparent",
        }}
        transition={{ duration: 0.8 }}
        style={S.regionGlow}
      />
      <div style={S.grain} />

      {/* HEADER */}
      <header style={S.header}>
        <div style={S.statusBar}>
          <div style={S.statusIndicator}>
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={S.liveDot}
            />
            <span style={S.liveText}>LIVE SCAN</span>
          </div>
          <div style={S.systemInfo}>
            <span>NEURAL CONNECTOME v3.0</span>
            <span style={S.uptime}>
              UPTIME: {minutes}:{secs}
            </span>
          </div>
        </div>

        <motion.h1
          style={S.title}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span style={S.titleMain}>Neural Connectome</span>
          <span style={S.titleSub}>NEURAL ARCHITECTURE MAP</span>
        </motion.h1>

        <p style={S.subtitle}>
          Interactive Neuroanatomy Visualization • 10 Major Regions • Real-time
          Activity Simulation
        </p>
      </header>

      {/* VIEW MODE SELECTOR */}
      <div style={S.viewSelector}>
        {["anatomy", "connections", "functions"].map((mode) => (
          <button
            key={mode}
            onClick={() => setViewMode(mode)}
            style={{
              ...S.viewButton,
              background:
                viewMode === mode
                  ? active
                    ? `${active.color}20`
                    : "rgba(0,200,255,0.15)"
                  : "transparent",
              borderColor:
                viewMode === mode
                  ? active
                    ? active.color
                    : "#00c8ff"
                  : "rgba(255,255,255,0.1)",
              color: viewMode === mode ? "#fff" : "#888",
            }}
          >
            {mode.toUpperCase()}
          </button>
        ))}
      </div>

      {/* MAIN CONTENT */}
      <div style={S.mainContent}>
        {/* LEFT PANEL - BRAIN VISUALIZATION */}
        <div style={S.visualizationPanel}>
          <CornerBrackets
            color={active ? `${active.color}50` : "rgba(0,200,255,0.25)"}
            size={20}
          />
          <div style={S.panelLabel}>
            <span style={{ color: "#00c8ff" }}>◆</span> SAGITTAL VIEW •
            INTERACTIVE MAP
          </div>

          <div style={S.brainContainer}>
            <svg
              viewBox="60 50 580 500"
              style={{ width: "100%", height: "100%", display: "block" }}
            >
              <defs>
                <filter id="regionGlow">
                  <feGaussianBlur stdDeviation="8" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <filter id="softShadow">
                  <feDropShadow
                    dx="0"
                    dy="4"
                    stdDeviation="6"
                    floodColor="#000"
                    floodOpacity="0.4"
                  />
                </filter>
                <linearGradient
                  id="brainGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="rgba(0,200,255,0.05)" />
                  <stop offset="100%" stopColor="rgba(0,200,255,0.01)" />
                </linearGradient>
              </defs>

              {/* Background grid */}
              <rect
                x="60"
                y="50"
                width="580"
                height="500"
                fill="url(#brainGradient)"
              />

              {/* Subtle grid lines */}
              {[...Array(12)].map((_, i) => (
                <line
                  key={`v${i}`}
                  x1={60 + i * 48}
                  y1="50"
                  x2={60 + i * 48}
                  y2="550"
                  stroke="rgba(0,200,255,0.04)"
                  strokeWidth="0.5"
                />
              ))}
              {[...Array(10)].map((_, i) => (
                <line
                  key={`h${i}`}
                  x1="60"
                  y1={50 + i * 50}
                  x2="640"
                  y2={50 + i * 50}
                  stroke="rgba(0,200,255,0.04)"
                  strokeWidth="0.5"
                />
              ))}

              {/* Skull outline */}
              <ellipse
                cx="380"
                cy="290"
                rx="260"
                ry="230"
                fill="none"
                stroke="rgba(0,200,255,0.1)"
                strokeWidth="1.5"
                strokeDasharray="8 4"
              />

              {/* Scan line */}
              <ScanLine />

              {/* Neural connections for active region */}
              {active && viewMode === "connections" && (
                <NeuralConnections activeRegion={active} />
              )}

              {/* Brain regions */}
              {brainRegions.map((r) => {
                const isActive = active?.id === r.id;
                const isOther = active && active.id !== r.id;

                return (
                  <g
                    key={r.id}
                    style={{ cursor: "pointer" }}
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
                        opacity="0.15"
                        filter="url(#regionGlow)"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.15 }}
                        transition={{ duration: 0.5 }}
                      />
                    )}

                    <motion.path
                      d={r.path}
                      animate={{
                        fill: isActive
                          ? `${r.color}80`
                          : isOther
                            ? "rgba(30,35,50,0.9)"
                            : "rgba(40,45,60,0.9)",
                        stroke: isActive
                          ? r.accentColor
                          : "rgba(100,150,200,0.3)",
                        strokeWidth: isActive ? 2.5 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                      filter="url(#softShadow)"
                    />

                    <text
                      x={r.labelX}
                      y={r.labelY}
                      textAnchor="middle"
                      fill={
                        isActive
                          ? "#fff"
                          : isOther
                            ? "rgba(160,160,160,0.4)"
                            : "rgba(200,210,225,0.9)"
                      }
                      style={{
                        fontSize: 12,
                        fontWeight: isActive ? 700 : 500,
                        pointerEvents: "none",
                        fontFamily: "'Inter', sans-serif",
                        textShadow: isActive ? `0 0 10px ${r.color}` : "none",
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

          {/* Coordinates */}
          <div style={S.coordinates}>
            <span>X: 60-640 • Y: 50-550</span>
            <span>SAGITTAL PLANE</span>
          </div>
        </div>

        {/* RIGHT PANEL - INFORMATION */}
        <div style={S.infoPanel}>
          <CornerBrackets
            color={active ? `${active.color}40` : "rgba(0,200,255,0.2)"}
            size={16}
          />

          <AnimatePresence mode="wait">
            {active ? (
              <motion.div
                key={active.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                style={S.infoContent}
              >
                {/* Region Header */}
                <div style={S.regionHeader}>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 12 }}
                  >
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        background: `${active.color}20`,
                        borderRadius: 10,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 20,
                        border: `2px solid ${active.color}40`,
                      }}
                    >
                      {active.emoji}
                    </div>
                    <div>
                      <h2
                        style={{
                          color: active.color,
                          margin: "0 0 4px",
                          fontSize: 24,
                          fontWeight: 700,
                          letterSpacing: -0.5,
                        }}
                      >
                        {active.title}
                      </h2>
                      <p
                        style={{
                          color: active.accentColor,
                          fontSize: 12,
                          margin: 0,
                          letterSpacing: 1.5,
                          textTransform: "uppercase",
                        }}
                      >
                        {active.subtitle}
                      </p>
                    </div>
                  </div>

                  <motion.div
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    style={{
                      fontSize: 10,
                      color: "#00c8ff",
                      letterSpacing: 1.5,
                      padding: "4px 12px",
                      background: "rgba(0,200,255,0.1)",
                      borderRadius: 20,
                      border: "1px solid rgba(0,200,255,0.3)",
                    }}
                  >
                    ● ACTIVE
                  </motion.div>
                </div>

                {/* Divider */}
                <div
                  style={{
                    height: 1,
                    background: `linear-gradient(90deg, ${active.color}40, transparent)`,
                    margin: "16px 0",
                  }}
                />

                {/* Description */}
                <InfoCard title="OVERVIEW" color={active.color}>
                  <p style={S.description}>{active.desc}</p>
                  <p
                    style={{
                      ...S.description,
                      marginTop: 12,
                      fontSize: 12,
                      opacity: 0.9,
                    }}
                  >
                    {active.detailedDesc}
                  </p>
                </InfoCard>

                {/* Stats */}
                <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
                  <div style={S.statCard}>
                    <div style={S.statLabel}>NEURAL ACTIVITY</div>
                    <div style={{ ...S.statValue, color: active.color }}>
                      {active.activity}%
                    </div>
                  </div>
                  <div style={S.statCard}>
                    <div style={S.statLabel}>CONNECTIONS</div>
                    <div style={{ ...S.statValue, color: active.color }}>
                      {active.connections}
                    </div>
                  </div>
                  <div style={S.statCard}>
                    <div style={S.statLabel}>BRAIN VOLUME</div>
                    <div style={{ ...S.statValue, color: active.color }}>
                      {active.volume}
                    </div>
                  </div>
                </div>

                {/* Activity Bars */}
                <InfoCard title="ACTIVITY METRICS" color={active.color}>
                  <ActivityBar
                    value={active.activity}
                    color={active.color}
                    label="Neural Activity"
                  />
                  <ActivityBar
                    value={Math.min(100, Math.round(active.connections / 3.5))}
                    color={active.color}
                    label="Connectivity Density"
                  />
                </InfoCard>

                {/* Functions */}
                <InfoCard title="PRIMARY FUNCTIONS" color={active.color}>
                  <div style={S.functionsGrid}>
                    {active.functions.map((func, index) => (
                      <motion.div
                        key={func}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        style={{
                          padding: "8px 12px",
                          background: `${active.color}10`,
                          borderRadius: 8,
                          fontSize: 11,
                          color: active.color,
                          border: `1px solid ${active.color}30`,
                          textAlign: "center",
                        }}
                      >
                        {func}
                      </motion.div>
                    ))}
                  </div>
                </InfoCard>

                {/* Neurotransmitters */}
                <InfoCard title="KEY NEUROTRANSMITTERS" color={active.color}>
                  <div style={S.neurotransmitters}>
                    {active.neurotransmitters?.map((nt) => (
                      <span key={nt} style={S.neurotransmitter}>
                        {nt}
                      </span>
                    ))}
                  </div>
                </InfoCard>

                {/* Clinical Note */}
                <InfoCard title="CLINICAL SIGNIFICANCE" color={active.color}>
                  <p
                    style={{
                      fontSize: 12,
                      color: "#aaa",
                      margin: 0,
                      lineHeight: 1.6,
                    }}
                  >
                    {active.clinical}
                  </p>
                </InfoCard>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={S.emptyState}
              >
                <div
                  style={{
                    fontSize: 48,
                    opacity: 0.1,
                    marginBottom: 20,
                  }}
                >
                  🧠
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: "#555",
                    letterSpacing: 2,
                    marginBottom: 8,
                    textTransform: "uppercase",
                  }}
                >
                  SELECT A BRAIN REGION
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "#444",
                    textAlign: "center",
                    maxWidth: 300,
                  }}
                >
                  Hover over or click any region on the brain map to view
                  detailed neuroanatomical information, functions, and clinical
                  significance.
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* LEGEND */}
      <div style={S.legend}>
        {brainRegions.map((r) => {
          const isSelected = selected?.id === r.id;
          return (
            <motion.button
              key={r.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => setHovered(r)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setSelected(isSelected ? null : r)}
              style={{
                ...S.legendItem,
                background: isSelected
                  ? `linear-gradient(135deg, ${r.color}20, ${r.color}10)`
                  : "rgba(255,255,255,0.03)",
                border: `1px solid ${isSelected ? r.color + "50" : "rgba(255,255,255,0.1)"}`,
                color: isSelected ? r.color : "#888",
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${r.color}, ${r.accentColor})`,
                  marginRight: 10,
                }}
              />
              <span
                style={{ fontSize: 11, fontWeight: isSelected ? 600 : 400 }}
              >
                {r.label}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* FOOTER */}
      <div style={S.footer}>
        <div style={S.footerContent}>
          <span>© 2025 NEURAL CONNECTOME PROJECT</span>
          <span>
            REGIONS MAPPED: {brainRegions.length}/10 • 1.2M NEURAL CONNECTIONS
          </span>
          <motion.span
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              color: "#00c8ff",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#00c8ff",
              }}
            />
            SYSTEM NOMINAL
          </motion.span>
        </div>
      </div>
    </div>
  );
}

/* ─── ENHANCED STYLES ─── */
const S = {
  root: {
    minHeight: "100vh",
    width: "100%",
    background: "#0a0a12",
    color: "#fff",
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    padding: "24px 32px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    overflowX: "hidden",
    boxSizing: "border-box",
  },
  backgroundGradient: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(135deg, #0a0a12 0%, #121225 50%, #0a0a18 100%)",
    zIndex: 0,
  },
  regionGlow: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    zIndex: 1,
  },
  grain: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    zIndex: 2,
    opacity: 0.02,
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.15'/%3E%3C/svg%3E")`,
  },
  header: {
    position: "relative",
    zIndex: 10,
    textAlign: "center",
    marginBottom: 24,
    width: "100%",
    maxWidth: 1200,
  },
  statusBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    padding: "12px 24px",
    background: "rgba(255,255,255,0.03)",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.05)",
  },
  statusIndicator: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: "#00c8ff",
    boxShadow: "0 0 10px #00c8ff",
  },
  liveText: {
    fontSize: 11,
    color: "#00c8ff",
    letterSpacing: 1.5,
    fontWeight: 600,
  },
  systemInfo: {
    display: "flex",
    gap: 24,
    fontSize: 11,
    color: "#666",
    letterSpacing: 1.2,
  },
  uptime: {
    fontFamily: "'JetBrains Mono', monospace",
    color: "#888",
  },
  title: {
    fontSize: 42,
    fontWeight: 800,
    letterSpacing: 1,
    margin: "0 0 8px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
  },
  titleMain: {
    background: "linear-gradient(135deg, #fff 0%, #a0a0ff 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  titleSub: {
    fontSize: 14,
    fontWeight: 400,
    color: "#666",
    letterSpacing: 3,
    textTransform: "uppercase",
  },
  subtitle: {
    fontSize: 13,
    color: "#777",
    letterSpacing: 1,
    margin: 0,
    maxWidth: 600,
    margin: "0 auto",
  },
  viewSelector: {
    display: "flex",
    gap: 8,
    marginBottom: 24,
    zIndex: 10,
  },
  viewButton: {
    padding: "8px 20px",
    borderRadius: 20,
    border: "1px solid",
    fontSize: 10,
    fontWeight: 600,
    letterSpacing: 1.2,
    cursor: "pointer",
    transition: "all 0.3s",
    textTransform: "uppercase",
  },
  mainContent: {
    display: "flex",
    gap: 24,
    width: "100%",
    maxWidth: 1400,
    zIndex: 5,
    position: "relative",
    marginBottom: 24,
  },
  visualizationPanel: {
    flex: 1.6,
    position: "relative",
    background: "rgba(15,18,30,0.7)",
    borderRadius: 20,
    border: "1px solid rgba(0,200,255,0.15)",
    padding: "40px 20px 20px",
    backdropFilter: "blur(10px)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
  },
  panelLabel: {
    position: "absolute",
    top: 15,
    left: 20,
    fontSize: 10,
    color: "#666",
    letterSpacing: 2,
    fontWeight: 600,
    textTransform: "uppercase",
  },
  brainContainer: {
    width: "100%",
    height: 500,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  coordinates: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 9,
    color: "#555",
    letterSpacing: 1.2,
    marginTop: 12,
    padding: "0 12px",
  },
  infoPanel: {
    flex: 1,
    position: "relative",
    background: "rgba(15,18,30,0.7)",
    borderRadius: 20,
    border: "1px solid rgba(0,200,255,0.15)",
    padding: 28,
    backdropFilter: "blur(10px)",
    minHeight: 600,
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
    overflowY: "auto",
  },
  infoContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  regionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  description: {
    fontSize: 13,
    color: "#ccc",
    lineHeight: 1.7,
    margin: 0,
  },
  statCard: {
    flex: 1,
    background: "rgba(255,255,255,0.02)",
    borderRadius: 12,
    padding: "12px",
    border: "1px solid rgba(255,255,255,0.05)",
    textAlign: "center",
  },
  statLabel: {
    fontSize: 9,
    color: "#666",
    letterSpacing: 1.2,
    marginBottom: 6,
    textTransform: "uppercase",
  },
  statValue: {
    fontSize: 22,
    fontWeight: 700,
    fontFamily: "'JetBrains Mono', monospace",
  },
  functionsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 8,
  },
  neurotransmitters: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
  },
  neurotransmitter: {
    padding: "6px 12px",
    background: "rgba(255,255,255,0.05)",
    borderRadius: 6,
    fontSize: 11,
    color: "#aaa",
    border: "1px solid rgba(255,255,255,0.1)",
  },
  emptyState: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "40px 20px",
  },
  legend: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "center",
    marginBottom: 20,
    zIndex: 10,
    maxWidth: 1000,
  },
  legendItem: {
    display: "flex",
    alignItems: "center",
    padding: "8px 16px",
    borderRadius: 20,
    fontSize: 12,
    cursor: "pointer",
    transition: "all 0.3s",
    backdropFilter: "blur(4px)",
  },
  footer: {
    width: "100%",
    maxWidth: 1400,
    padding: "16px 0",
    borderTop: "1px solid rgba(255,255,255,0.05)",
    zIndex: 10,
  },
  footerContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 10,
    color: "#555",
    letterSpacing: 1.2,
  },
};
