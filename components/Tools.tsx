
import React from 'react';

const tools = [
    { name: "Pennylane", logo: "https://uploads-ssl.webflow.com/64f0b2713433890538634354/64f0b2713433890538634394_pennylane-logo.svg" },
    { name: "Notion", logo: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png" },
    { name: "ACD", logo: "https://www.acd-groupe.fr/wp-content/uploads/2021/11/logo_acd_groupe_horizontal.svg" }
];

export const Tools: React.FC = () => {
    return (
        <section id="outils" className="container mx-auto px-6 py-20 md:py-28">
            <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-brand-sage-dark">Des outils modernes, 100% digitaux</h2>
                <p className="mt-4 text-lg text-brand-sage-gray">
                    Nous utilisons les meilleures technologies pour une collaboration fluide et efficace, qui vous fait gagner du temps.
                </p>
            </div>
            <div className="mt-16 flex justify-center items-center gap-12 md:gap-20 flex-wrap">
                {tools.map((tool) => (
                    <img key={tool.name} src={tool.logo} alt={tool.name} className="h-10 md:h-12 object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300" />
                ))}
            </div>
        </section>
    );
};
