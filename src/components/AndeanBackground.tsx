const AndeanBackground = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden">
    <svg viewBox="0 0 430 932" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      {/* Sky gradient */}
      <defs>
        <linearGradient id="sky" x1="215" y1="0" x2="215" y2="500" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7EC8E3" />
          <stop offset="100%" stopColor="#B5E6D8" />
        </linearGradient>
        <radialGradient id="sun" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#FFE066" />
          <stop offset="70%" stopColor="#FFD93D" />
          <stop offset="100%" stopColor="#FFD93D" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Sky */}
      <rect width="430" height="932" fill="url(#sky)" />

      {/* Sun */}
      <circle cx="370" cy="60" r="55" fill="url(#sun)" />
      {/* Sun rays */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <line
          key={angle}
          x1={370 + Math.cos((angle * Math.PI) / 180) * 50}
          y1={60 + Math.sin((angle * Math.PI) / 180) * 50}
          x2={370 + Math.cos((angle * Math.PI) / 180) * 72}
          y2={60 + Math.sin((angle * Math.PI) / 180) * 72}
          stroke="#FFD93D"
          strokeWidth="4"
          strokeLinecap="round"
        />
      ))}

      {/* Clouds */}
      <g opacity="0.9">
        <ellipse cx="80" cy="80" rx="40" ry="18" fill="white" />
        <ellipse cx="60" cy="72" rx="28" ry="14" fill="white" />
        <ellipse cx="105" cy="74" rx="25" ry="12" fill="white" />
      </g>
      <g opacity="0.7">
        <ellipse cx="300" cy="130" rx="35" ry="14" fill="white" />
        <ellipse cx="275" cy="124" rx="22" ry="10" fill="white" />
        <ellipse cx="320" cy="125" rx="20" ry="9" fill="white" />
      </g>

      {/* Back mountains (darker) */}
      <polygon points="0,350 70,160 140,350" fill="#2D7A3A" />
      <polygon points="60,350 150,130 240,350" fill="#258A35" />
      <polygon points="180,350 270,150 360,350" fill="#2D7A3A" />
      <polygon points="280,350 370,170 430,300 430,350" fill="#258A35" />

      {/* Snow caps back */}
      <polygon points="70,160 55,200 85,200" fill="white" opacity="0.9" />
      <polygon points="150,130 132,175 168,175" fill="white" opacity="0.9" />
      <polygon points="270,150 252,195 288,195" fill="white" opacity="0.9" />
      <polygon points="370,170 358,200 382,200" fill="white" opacity="0.85" />

      {/* Front mountains (brighter green) */}
      <polygon points="-30,420 80,200 190,420" fill="#3DA84A" />
      <polygon points="120,420 220,190 320,420" fill="#34A542" />
      <polygon points="260,420 360,210 460,420" fill="#3DA84A" />

      {/* Snow caps front */}
      <polygon points="80,200 62,248 98,248" fill="white" opacity="0.95" />
      <polygon points="220,190 200,240 240,240" fill="white" opacity="0.95" />
      <polygon points="360,210 344,255 376,255" fill="white" opacity="0.9" />

      {/* Small trees on mountains */}
      {[45, 155, 290, 380, 100, 340].map((x, i) => (
        <g key={`tree-${i}`}>
          <rect x={x - 2} y={350 + (i % 3) * 15} width="4" height="18" fill="#5C3D2E" rx="1" />
          <polygon points={`${x},${330 + (i % 3) * 15} ${x - 10},${352 + (i % 3) * 15} ${x + 10},${352 + (i % 3) * 15}`} fill="#1E6B2E" />
        </g>
      ))}

      {/* Green meadow transition */}
      <ellipse cx="215" cy="430" rx="280" ry="50" fill="#4CAF50" />

      {/* Dirt path (winding) */}
      <path
        d="M215,400 C215,430 180,460 200,500 C220,540 250,560 230,600 C210,640 180,670 200,710 C220,750 250,780 230,820 C210,860 200,890 215,932"
        fill="none"
        stroke="#D4A853"
        strokeWidth="50"
        strokeLinecap="round"
        opacity="0.8"
      />
      <path
        d="M215,400 C215,430 180,460 200,500 C220,540 250,560 230,600 C210,640 180,670 200,710 C220,750 250,780 230,820 C210,860 200,890 215,932"
        fill="none"
        stroke="#E8C36A"
        strokeWidth="30"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* Bottom earth */}
      <rect y="880" width="430" height="52" fill="#C89B3C" opacity="0.5" />

      {/* Grass patches */}
      {[30, 90, 150, 280, 350, 400, 50, 180, 320].map((x, i) => (
        <g key={`grass-${i}`} opacity="0.7">
          <line x1={x} y1={440 + i * 50} x2={x - 4} y2={430 + i * 50} stroke="#2E7D32" strokeWidth="2" strokeLinecap="round" />
          <line x1={x + 3} y1={440 + i * 50} x2={x + 3} y2={428 + i * 50} stroke="#388E3C" strokeWidth="2" strokeLinecap="round" />
          <line x1={x + 7} y1={440 + i * 50} x2={x + 10} y2={430 + i * 50} stroke="#2E7D32" strokeWidth="2" strokeLinecap="round" />
        </g>
      ))}
    </svg>
  </div>
);

export default AndeanBackground;
