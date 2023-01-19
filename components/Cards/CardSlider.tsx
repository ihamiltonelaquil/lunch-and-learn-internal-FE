import MeetingCard from "./MeetingCard";
import Slider from "react-slick";
import { LazyLoadTypes } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import ExpandedMeetingCard from "./ExpandedMeetingCard";
import { DarkBG } from "../styledComponents";
import { useComponentDidMount } from "../../lib/utils";

export default function CardSlider() {
  const [cardData, setCardData] = useState<any[]>([]);
  const [expandedCardIsVisible, setExpandedCardIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedCardData, setExpandedCardData] = useState(cardData[0]);

  useEffect(() => {
    fetch(`https://localhost:555/api/Meeting/`)
      .then((res) => res.json())
      .then((data) => {
        setCardData(data);
      });
    setExpandedCardData(cardData[currentIndex]);
  }, [cardData, currentIndex]);

  useComponentDidMount(() => {
    const slider = document.querySelector(".slick-slider");
    if (slider) {
      setTimeout(() => {
        if (!slider.classList.contains("slider-init"))
          slider.className += " slider-init";
      }, 100);
    }
  });

  var settings = {
    accessibility: true,
    arrows: false,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centermode: true,
    easing: "ease-in",
    initialSlide: 0,
    swipeToSlide: true,
    lazyLoad: "ondemand" as LazyLoadTypes,
    onLazyLoad: function () {
      //for debug purposes
    },
    afterChange: (current: number) => {
      setCurrentIndex(current);
    },
  };

  function toggleExpandedCard() {
    setExpandedCardIsVisible((v) => !v);
  }

  return (
    <>
      {expandedCardIsVisible && (
        <>
          <ExpandedMeetingCard
            meetingData={expandedCardData}
            onClick={toggleExpandedCard}
          />
          <DarkBG
            onClick={() => {
              toggleExpandedCard();
            }}
          ></DarkBG>
        </>
      )}
      <Slider {...settings}>
        {cardData.map((data) => {
          {
            return (
              <>
                <MeetingCard
                  key={data.meetingID}
                  meetingData={data}
                  toggleCard={toggleExpandedCard}
                />
              </>
            );
          }
        })}
      </Slider>
    </>
  );
}
