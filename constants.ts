export interface NavLink {
    href: string;
    label: string;
    submenu?: NavLink[];
}

export const navLinks: NavLink[] = [
    { href: "/services", label: "Mes services" },
    { href: "/parcours", label: "Mon parcours" },
    {
        href: "#",
        label: "Simulateurs",
        submenu: [
            { href: "/simulateurs/entreprise-individuelle", label: "Entreprise Individuelle" },
            { href: "/simulateurs/eurl", label: "EURL" },
            { href: "/simulateurs/sasu", label: "SASU" },
            { href: "/simulateurs/frais-kilometriques", label: "Frais Kilométriques" },
        ]
    },
    { href: "/#faq", label: "FAQ" },
    { href: "/#contact", label: "Contact" },
];
