export interface NavLink {
    href: string;
    label: string;
    submenu?: NavLink[];
}

export const navLinks: NavLink[] = [
    { href: "#services", label: "Services" },
    { href: "#parcours", label: "Parcours" },
    {
        href: "#",
        label: "Simulateurs",
        submenu: [
            { href: "/simulateurs/auto-entrepreneur", label: "Auto-Entrepreneur" },
            { href: "/simulateurs/eurl", label: "EURL" },
            { href: "/simulateurs/sasu", label: "SASU" },
        ]
    },
    { href: "#faq", label: "FAQ" },
    { href: "#contact", label: "Contact" },
];
