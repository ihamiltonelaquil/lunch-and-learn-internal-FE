import MeetingCard from "./MeetingCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import ExpandedMeetingCard from "./ExpandedMeetingCard";
import { DarkBG } from "../styledComponents";

export default function CardSlider() {
  const [cardData, setCardData] = useState<any[]>([]);

  useEffect(() => {
    fetch(`https://localhost:555/api/LunchAndLearn/`)
      .then((res) => res.json())
      .then((data) => {
        setCardData(data);
      });
  }, [cardData]);

  const [expandedCardIsVisible, setExpandedCardIsVisible] = useState(false);

  const [expandedCardData, setExpandedCardData] = useState(cardData[0]);

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
    onLazyLoad: function () {
      return 3;
    },
    afterChange: (current: number) => setExpandedCardData(cardData[current]),
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
      <br></br>
      <Slider {...settings}>
        {cardData.map((data) => {
          {
            return (
              <MeetingCard meetingData={data} toggleCard={toggleExpandedCard} />
            );
          }
        })}
      </Slider>
    </>
  );
}
