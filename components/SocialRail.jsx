const ITEMS = [
  {
    label: "Email us",
    href: "#contact",
    path: "M3 6.5h18v11H3zM3 7l9 6 9-6",
  },
  {
    label: "Call us",
    href: "#contact",
    path: "M6 3.5h3l1.5 4-2 1.5a12 12 0 0 0 6.5 6.5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4 5.7 2 2 0 0 1 6 3.5Z",
  },
  {
    label: "Chat with us",
    href: "#contact",
    path: "M4 5h16v10H9l-5 4V5Z",
  },
  {
    label: "Share this page",
    href: "#top",
    path: "M15 6a2.5 2.5 0 1 0 0-.1M15 18a2.5 2.5 0 1 0 0-.1M6.5 12a2.5 2.5 0 1 0 0-.1M9 11l4-2.5M9 13l4 2.5",
  },
];

export default function SocialRail() {
  return (
    <div className="fixed right-0 top-1/2 z-30 hidden -translate-y-1/2 flex-col overflow-hidden rounded-l-lg border border-line bg-white shadow-raised md:flex">
      {ITEMS.map((it) => (
        <a
          key={it.label}
          href={it.href}
          aria-label={it.label}
          title={it.label}
          className="grid h-10 w-10 place-items-center border-b border-line text-inkSoft transition last:border-0 hover:bg-brandTint hover:text-brand"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d={it.path}
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      ))}
    </div>
  );
}
