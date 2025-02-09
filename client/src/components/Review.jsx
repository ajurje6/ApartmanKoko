import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

// Import reviews directly from JSON files
import enReviews from "../locales/en.json";
import hrReviews from "../locales/hr.json";
import deReviews from "../locales/de.json";
import plReviews from "../locales/pl.json";
import ruReviews from "../locales/ru.json";
import huReviews from "../locales/hu.json";

const Reviews = () => {
  const { t, i18n } = useTranslation();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Determine which language's reviews to display
    let reviewsData;
    switch (i18n.language) {
      case "en":
        reviewsData = enReviews.reviews;
        break;
      case "hr":
        reviewsData = hrReviews.reviews;
        break;
      case "de":
        reviewsData = deReviews.reviews;
        break;
      case "pl":
        reviewsData = plReviews.reviews;
        break;
      case "ru":
        reviewsData = ruReviews.reviews;
        break;
      case "hu":
        reviewsData = huReviews.reviews;
        break;
      default:
        reviewsData = enReviews.reviews; // Fallback to English reviews
    }
    setReviews(reviewsData);
  }, [i18n.language]);

  return (
    <div className="reviews-container">
      <h2 className="reviews-title">{t("guest_reviews")}</h2>

      {reviews.length > 0 ? (
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="w-full"
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index} className="swiper-slide">
              <div className="flex justify-center">
                <img
                  src={review.photo || "/images/default-profile.jpg"} // Default profile image if none provided
                  alt={`${review.name}'s photo`}
                  className="review-photo"
                />
              </div>
              <h3 className="review-name">{review.name}</h3>
              <p className="review-rating">⭐ {review.rating}/10</p>
              <p className="review-date">{review.date}</p>
              <p className="review-comment">{review.comment}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-gray-400">{t("no_reviews_available")}</p>
      )}
    </div>
  );
};

export default Reviews;
