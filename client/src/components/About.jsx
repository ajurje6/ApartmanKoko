import React from 'react';
import { useTranslation } from "react-i18next";

const About = () => {
    const { t } = useTranslation();
    return (
        <section id="about">
            <div id="about-image">
                <img src="/images/about.jpg" alt="About_image" />
            </div>
            <div id="about-text-box">
                <div>
                    <h1>{t("Welcome-message")}</h1>
                    <p>{t("about-p1")}</p>
                    <p>{t("about-p2")}</p>
                    <p>{t("about-p3")}</p>
                    <p>{t("about-p4")}</p>
                </div>
            </div>
        </section>
    );
};

export default About;

