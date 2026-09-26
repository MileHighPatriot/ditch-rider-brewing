const paths: Record<string, React.ReactNode> = {
  arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
  "arrow-left": <path d="M19 12H5m6-6-6 6 6 6" />,
  chevron: <path d="m9 6 6 6-6 6" />,
  "chevron-down": <path d="m6 9 6 6 6-6" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-6.5-6.2-6.5-11a6.5 6.5 0 0 1 13 0c0 4.8-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.3" />
    </>
  ),
  play: <path d="M8 5.5v13l10.5-6.5L8 5.5Z" />,
  pause: <path d="M8 5v14M16 5v14" />,
  live: (
    <>
      <circle cx="12" cy="12" r="2.2" />
      <path d="M7.8 7.8a6 6 0 0 0 0 8.4m8.4-8.4a6 6 0 0 1 0 8.4M5 5a10 10 0 0 0 0 14M19 5a10 10 0 0 1 0 14" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8.5" r="3.2" />
      <path d="M3 19.5c.6-3.3 3-5.2 6-5.2s5.4 1.9 6 5.2" />
      <path d="M15.5 5.6a3.1 3.1 0 0 1 0 5.9M17.8 14.6c1.7.7 2.8 2.4 3.2 4.9" />
    </>
  ),
  child: (
    <>
      <circle cx="12" cy="6" r="2.6" />
      <path d="M7 11.5 12 10l5 1.5M12 10v5m-3 6 3-6 3 6" />
    </>
  ),
  heart: <path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.3a4.3 4.3 0 0 1 7.5 2.5C19.5 15.4 12 20 12 20Z" />,
  gift: (
    <>
      <rect x="4" y="9" width="16" height="11" rx="1.5" />
      <path d="M3 9h18M12 9v11M12 9c-2.5 0-5-1-5-3a2 2 0 0 1 4-.5L12 9Zm0 0c2.5 0 5-1 5-3a2 2 0 0 0-4-.5L12 9Z" />
    </>
  ),
  phone: <path d="M6.6 3.5h2.8l1.5 4.2-2 1.3a11 11 0 0 0 6.1 6.1l1.3-2 4.2 1.5v2.8a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2Z" />,
  mail: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  check: <path d="m5 12.5 4.2 4.2L19 7" />,
  download: <path d="M12 4v11m-5-5 5 5 5-5M5 20h14" />,
  snow: <path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9M9.5 4.5 12 7l2.5-2.5M9.5 19.5 12 17l2.5 2.5" />,
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6" />
    </>
  ),
  train: (
    <>
      <rect x="6" y="3" width="12" height="14" rx="3" />
      <path d="M6 10h12M9 20.5l1.5-3.5m5 3.5-1.5-3.5" />
      <circle cx="9.5" cy="13.5" r=".6" fill="currentColor" />
      <circle cx="14.5" cy="13.5" r=".6" fill="currentColor" />
    </>
  ),
  car: (
    <>
      <path d="M4 16.5V12l2-5h12l2 5v4.5M4 12h16" />
      <path d="M4 16.5h16M6 16.5V19M18 16.5V19" />
      <circle cx="7.5" cy="14" r=".7" fill="currentColor" />
      <circle cx="16.5" cy="14" r=".7" fill="currentColor" />
    </>
  ),
  access: (
    <>
      <circle cx="12" cy="4.5" r="1.8" />
      <path d="M5 8.5h14M12 8.5v5l-3.5 7M12 13.5l3.5 7" />
    </>
  ),
  coffee: (
    <>
      <path d="M4 9h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V9Z" />
      <path d="M17 11h1.5a2.5 2.5 0 0 1 0 5H17M8 3.5c-.8 1 .8 2 0 3M12 3.5c-.8 1 .8 2 0 3" />
    </>
  ),
  music: (
    <>
      <path d="M9 18V6l11-2v12" />
      <circle cx="6.5" cy="18" r="2.5" />
      <circle cx="17.5" cy="16" r="2.5" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </>
  ),
  shield: <path d="M12 3.5 5 6v5.5c0 4.3 3 7.6 7 9 4-1.4 7-4.7 7-9V6l-7-2.5Z" />,
  flame: <path d="M12 3c3.6 4.1 5.5 7.3 5.5 10.2a5.5 5.5 0 0 1-11 0C6.5 10.3 8.4 7.1 12 3Z" />,
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.5 2.6 3.5 5.4 3.5 8.5s-1 5.9-3.5 8.5c-2.5-2.6-3.5-5.4-3.5-8.5s1-5.9 3.5-8.5Z" />
    </>
  ),
  beer: (
    <>
      <path d="M6 5h10v14a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 6 19V5Z" />
      <path d="M16 8.5h1.8a1.7 1.7 0 0 1 1.7 1.7v3.6a1.7 1.7 0 0 1-1.7 1.7H16M9.5 9v7.5M12.5 9v7.5" />
    </>
  ),
  hop: (
    <>
      <path d="M12 3.5c-3.3 2-4.8 4.8-4.8 8.3 0 4.3 2.2 7.5 4.8 8.7 2.6-1.2 4.8-4.4 4.8-8.7 0-3.5-1.5-6.3-4.8-8.3Z" />
      <path d="M8.3 9.5c1.3 1 2.5 1.3 3.7 1.3s2.4-.3 3.7-1.3M7.5 13.6c1.4 1 2.9 1.4 4.5 1.4s3.1-.4 4.5-1.4M9 17.4c1 .6 2 .9 3 .9s2-.3 3-.9" />
    </>
  ),
  dog: (
    <>
      <path d="M8 6.5 5.2 5 4 9.5l2.6 1M16 6.5l2.8-1.5L20 9.5l-2.6 1" />
      <path d="M7 8.5c0-2.2 2.2-3.5 5-3.5s5 1.3 5 3.5V14a5 5 0 0 1-10 0V8.5Z" />
      <path d="M10 11h.01M14 11h.01M10.8 15.2c.7.6 1.7.6 2.4 0" />
    </>
  ),
  bike: (
    <>
      <circle cx="6" cy="16" r="3.5" />
      <circle cx="18" cy="16" r="3.5" />
      <path d="M6 16 9.5 9h6L18 16M9.5 9 12 16h-6M14 6.5h2.5" />
    </>
  ),
  wind: <path d="M3.5 9h11a2.5 2.5 0 1 0-2.5-2.5M3.5 13h15a2.5 2.5 0 1 1-2.5 2.5M3.5 17h7" />,
  thermo: (
    <>
      <path d="M10 14.2V5a2 2 0 1 1 4 0v9.2a3.8 3.8 0 1 1-4 0Z" />
      <path d="M12 9v7" />
    </>
  ),
  sunset: <path d="M4 18h16M7 14.5a5 5 0 0 1 10 0M12 4v4m-5.5.5 1.8 1.8M17.5 8.5l-1.8 1.8M9.5 6.5 12 4l2.5 2.5M3 21h18" />,
  bag: (
    <>
      <path d="M5.5 8h13l-1 12h-11l-1-12Z" />
      <path d="M9 10V6.5a3 3 0 0 1 6 0V10" />
    </>
  ),
  leaf: <path d="M5 19c0-8 5-13.5 14-14-.5 9-6 14-14 14Zm0 0 7.5-7.5" />,
  wheat: <path d="M12 21V8M12 12c-2.2 0-3.5-1.6-3.5-3.5C10.7 8.5 12 10 12 12Zm0 0c2.2 0 3.5-1.6 3.5-3.5-2.2 0-3.5 1.5-3.5 3.5Zm0 4c-2.2 0-3.5-1.6-3.5-3.5 2.2 0 3.5 1.5 3.5 3.5Zm0 0c2.2 0 3.5-1.6 3.5-3.5-2.2 0-3.5 1.5-3.5 3.5ZM12 8c-.9-.8-1.3-1.9-1-3.5 1.2.7 1.6 2 1 3.5Zm0 0c.9-.8 1.3-1.9 1-3.5-1.2.7-1.6 2-1 3.5Z" />,
  star: <path d="m12 4 2.4 5 5.3.6-4 3.6 1.2 5.3L12 15.8l-4.9 2.7 1.2-5.3-4-3.6 5.3-.6L12 4Z" />,
  ticket: <path d="M4 7.5h16v3a1.8 1.8 0 0 0 0 3.5v3H4v-3a1.8 1.8 0 0 0 0-3.5v-3ZM14 7.5v10" />,
  filter: <path d="M4 6h16M7 12h10M10 18h4" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  info: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 11v5M12 8h.01" />
    </>
  ),
  drop: <path d="M12 3.5c3.5 4.2 5.5 7.4 5.5 10.2a5.5 5.5 0 0 1-11 0c0-2.8 2-6 5.5-10.2Z" />,
  expand: <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />,
  cup: (
    <>
      <path d="M6 4.5h12l-1.4 14.2A1.5 1.5 0 0 1 15.1 20H8.9a1.5 1.5 0 0 1-1.5-1.3L6 4.5Z" />
      <path d="M6.5 9h11" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3.5" y="7" width="17" height="12.5" rx="2" />
      <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M3.5 12.5h17" />
    </>
  ),
  share: <path d="M12 15V4m-4.5 4.5L12 4l4.5 4.5M5 13v6h14v-6" />,
};

export type IconName = keyof typeof paths;

export default function Icon({ name, className = "h-5 w-5" }: { name: string; className?: string }) {
  const filled = name === "play";
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={filled ? 0 : 1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}
