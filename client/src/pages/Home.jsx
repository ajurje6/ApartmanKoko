import React from "react";
import { Helmet } from "react-helmet-async";
import About from "../components/About";
import Footer from "../components/Footer";
import Review from "../components/Review";
import { t } from "i18next";

const Home = () => {
  return (
    <div>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Home - Apartment Koko</title>
        <meta
          name="description"
          content="Welcome to Apartment Koko. Enjoy a luxurious stay with breathtaking views and top amenities."
        />
        <meta name="robots" content="index, follow" />

        {/* Open Graph for Social Media */}
        <meta property="og:title" content={t("home_title")} />
        <meta
          property="og:description"
          content={t("home_description")}
        />
      </Helmet>

      {/* Page Content */}
      <About />
      <Review />
      <Footer />
    </div>
  );
};

export default Home;
