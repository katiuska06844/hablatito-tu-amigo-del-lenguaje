const AndeanBackground = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden">
    <svg viewBox="0 0 430 932" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="sky" x1="215" y1="0" x2="215" y2="500" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#60C8F0" />
          <stop offset="50%" stopColor="#87DEFA" />
          <stop offset="100%" stopColor="#A8E6CF" />
        </linearGradient>
        <radialGradient id="sun" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#FFF176" />
          <stop offset="60%" stopColor="#FFD54F" />
          <stop offset="100%" stopColor="#FFD54F" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="pathGrad" x1="215" y1="380" x2="215" y2="932" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E8B84B" />
          <stop offset="100%" stopColor="#D4943C" />
        </linearGradient>
        <linearGradient id="meadow" x1="215" y1="380" x2="215" y2="932" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#66D96A" />
          <stop offset="100%" stopColor="#3CB043" />
        </linearGradient>
      </defs>

      {/* Sky */}
      <rect width="430" height="932" fill="url(#sky)" />

      {/* Sun with animated glow */}
      <circle cx="370" cy="65" r="60" fill="url(#sun)" className="animate-pulse" style={{ animationDuration: '4s' }} />
      <circle cx="370" cy="65" r="38" fill="#FFF9C4" opacity="0.7" />
      {/* Sun rays */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
        <line
          key={angle}
          x1={370 + Math.cos((angle * Math.PI) / 180) * 48}
          y1={65 + Math.sin((angle * Math.PI) / 180) * 48}
          x2={370 + Math.cos((angle * Math.PI) / 180) * 70}
          y2={65 + Math.sin((angle * Math.PI) / 180) * 70}
          stroke="#FFD54F"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.6"
        />
      ))}

      {/* Clouds floating */}
      <g opacity="0.95">
        <ellipse cx="90" cy="80" rx="45" ry="20" fill="white" />
        <ellipse cx="65" cy="70" rx="30" ry="15" fill="white" />
        <ellipse cx="120" cy="72" rx="28" ry="14" fill="white" />
      </g>
      <g opacity="0.8">
        <ellipse cx="310" cy="115" rx="38" ry="16" fill="white" />
        <ellipse cx="285" cy="107" rx="24" ry="12" fill="white" />
        <ellipse cx="340" cy="109" rx="22" ry="11" fill="white" />
      </g>
      <g opacity="0.6">
        <ellipse cx="180" cy="55" rx="30" ry="12" fill="white" />
        <ellipse cx="160" cy="49" rx="18" ry="9" fill="white" />
      </g>

      {/* Far mountains - purple/blue tones */}
      <polygon points="0,340 80,140 160,340" fill="#5B8C5A" />
      <polygon points="70,340 170,110 270,340" fill="#4A8B4F" />
      <polygon points="200,340 300,130 400,340" fill="#5B8C5A" />
      <polygon points="310,340 390,155 430,280 430,340" fill="#4A8B4F" />

      {/* Snow caps */}
      <polygon points="80,140 60,190 100,190" fill="white" opacity="0.95" />
      <polygon points="170,110 148,165 192,165" fill="white" opacity="0.95" />
      <polygon points="300,130 278,185 322,185" fill="white" opacity="0.95" />
      <polygon points="390,155 375,190 405,190" fill="white" opacity="0.9" />

      {/* Front mountains - vivid green */}
      <polygon points="-30,400 90,185 210,400" fill="#4FC35A" />
      <polygon points="130,400 240,170 350,400" fill="#42B84D" />
      <polygon points="270,400 380,195 470,400" fill="#4FC35A" />

      {/* Front snow caps */}
      <polygon points="90,185 68,238 112,238" fill="white" opacity="0.95" />
      <polygon points="240,170 216,228 264,228" fill="white" opacity="0.95" />
      <polygon points="380,195 360,245 400,245" fill="white" opacity="0.9" />

      {/* Terrace lines on mountains (Andean terraces) */}
      {[280, 300, 320, 340].map((y, i) => (
        <path
          key={`terrace-${i}`}
          d={`M${40 + i * 10},${y} Q${215},${y - 8 + i * 3} ${390 - i * 10},${y}`}
          stroke="#3DA84A"
          strokeWidth="2"
          fill="none"
          opacity="0.5"
        />
      ))}

      {/* Trees on hillsides */}
      {[
        [50, 345], [120, 355], [310, 350], [390, 360],
        [75, 370], [250, 365], [170, 375], [350, 370]
      ].map(([x, y], i) => (
        <g key={`tree-${i}`}>
          <rect x={x - 2} y={y} width="5" height="15" fill="#6D4C2F" rx="1" />
          <circle cx={x} cy={y - 4} r={9} fill={i % 2 === 0 ? "#2E9E38" : "#3BB547"} />
          <circle cx={x - 4} cy={y - 1} r={6} fill={i % 2 === 0 ? "#3BB547" : "#2E9E38"} />
          <circle cx={x + 4} cy={y - 1} r={6} fill={i % 2 === 0 ? "#34A83E" : "#2E9E38"} />
        </g>
      ))}

      {/* Meadow */}
      <ellipse cx="215" cy="415" rx="300" ry="55" fill="url(#meadow)" />

      {/* Winding path */}
      <path
        d="M215,385 C215,415 170,440 195,490 C220,540 260,555 235,600 C210,645 170,665 195,710 C220,755 260,775 235,820 C210,865 200,895 215,932"
        fill="none"
        stroke="#C4923A"
        strokeWidth="55"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M215,385 C215,415 170,440 195,490 C220,540 260,555 235,600 C210,645 170,665 195,710 C220,755 260,775 235,820 C210,865 200,895 215,932"
        fill="none"
        stroke="url(#pathGrad)"
        strokeWidth="38"
        strokeLinecap="round"
        opacity="0.85"
      />
      {/* Path dots */}
      {[420, 480, 540, 600, 660, 720, 780, 840, 900].map((y, i) => {
        const offsetX = i % 2 === 0 ? -8 : 8;
        return (
          <circle
            key={`dot-${i}`}
            cx={215 + offsetX + Math.sin(i * 0.8) * 15}
            cy={y}
            r="3"
            fill="#A67C2E"
            opacity="0.5"
          />
        );
      })}

      {/* Grass patches on sides */}
      {[20, 80, 140, 290, 350, 400, 40, 170, 330, 60, 380].map((x, i) => (
        <g key={`grass-${i}`} opacity="0.75">
          <line x1={x} y1={435 + i * 42} x2={x - 5} y2={422 + i * 42} stroke="#2E9E38" strokeWidth="2.5" strokeLinecap="round" />
          <line x1={x + 4} y1={435 + i * 42} x2={x + 4} y2={420 + i * 42} stroke="#3BB547" strokeWidth="2.5" strokeLinecap="round" />
          <line x1={x + 9} y1={435 + i * 42} x2={x + 13} y2={423 + i * 42} stroke="#2E9E38" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      ))}

      {/* Small flowers */}
      {[
        [35, 460, "#FF6B8A"], [380, 500, "#FFD54F"], [55, 580, "#AB7DF6"],
        [390, 640, "#FF6B8A"], [30, 720, "#FFD54F"], [395, 780, "#FF8A65"],
        [45, 850, "#AB7DF6"], [370, 880, "#FF6B8A"]
      ].map(([x, y, color], i) => (
        <g key={`flower-${i}`}>
          <circle cx={Number(x)} cy={Number(y)} r="4" fill={String(color)} />
          <circle cx={Number(x)} cy={Number(y)} r="2" fill="#FFF9C4" />
          <line x1={Number(x)} y1={Number(y) + 4} x2={Number(x)} y2={Number(y) + 12} stroke="#3BB547" strokeWidth="1.5" />
        </g>
      ))}

      {/* Tiny houses in the distance */}
      <g opacity="0.7">
        <rect x="25" y="365" width="14" height="12" fill="#E8B84B" rx="1" />
        <polygon points="22,365 32,355 42,365" fill="#D94F33" />
        <rect x="29" y="370" width="4" height="7" fill="#8B5E3C" />
      </g>
      <g opacity="0.7">
        <rect x="380" y="358" width="12" height="10" fill="#E8B84B" rx="1" />
        <polygon points="377,358 386,349 395,358" fill="#D94F33" />
        <rect x="384" y="362" width="3" height="6" fill="#8B5E3C" />
      </g>

      {/* Condor silhouette */}
      <g opacity="0.4">
        <path d="M140,90 Q148,82 156,88 Q160,84 168,90" stroke="#2C3E50" strokeWidth="2" fill="none" />
      </g>
      <g opacity="0.3">
        <path d="M60,130 Q66,124 72,128 Q75,125 81,130" stroke="#2C3E50" strokeWidth="1.5" fill="none" />
      </g>
    </svg>
  </div>
);

export default AndeanBackground;
