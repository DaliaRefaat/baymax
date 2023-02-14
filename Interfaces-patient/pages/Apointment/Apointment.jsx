import React, { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";

import CardAvailable from "../../components/CardAvailable/CardAvailable";
import CardAppointment from "../../components/CardAppointment/CardAppointment";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
function Apointment() {
  const [CardsAvailable, setCardsAvailable] = useState([]);
  const [CardsAppointment, setCardsAppointment] = useState([]);

  useEffect(() => {
    fetchCardsAvailable();
    fetchCardsAppointment();
  }, []);
  const fetchCardsAvailable = async () => {
    await axios
      .get("http://127.0.0.1:8000/api/avilable-psychiatrist")
      .then(({ data }) => {
        setCardsAvailable(data);
      });
  };
  const fetchCardsAppointment = async () => {
    await axios
      .get("http://127.0.0.1:8000/api/psychiatristAll")
      .then(({ data }) => {
        setCardsAppointment(data);
      });
  };
  const url = "http://127.0.0.1:8000/files/";
  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <h1>Our psychiatrists are available now:</h1>
      <Swiper
        slidesPerView={5}
        spaceBetween={50}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode]}
        className="mySwiper"
      >
        {CardsAvailable.length > 0 &&
          CardsAvailable.map((row) => (
            <SwiperSlide>
              <CardAvailable
                name={row.name}
                specialty={row.specialization}
                id={row.id}
                img={url+row.img}
              />
            </SwiperSlide>
          ))}
      </Swiper>
      <hr />
      <div className="d-flex justify-content-evenly flex-wrap">
        {CardsAppointment.length > 0 &&
          CardsAppointment.map((row) => (
            <CardAppointment
              id={row.id}
              name={row.name}
              specialty={row.specialization}
              patient={row.patients}
              ex={row.years_experience}
              appoint={row.appointments}
              img={url+row.img}
            />
          ))}
      </div>
    </>
  );
}

export default Apointment;
