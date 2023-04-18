import MeetingCard from "./MeetingCard";
import Slider from "react-slick";
import { LazyLoadTypes } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useRef, useState } from "react";
import ExpandedMeetingCard from "./ExpandedMeetingCard";
import { DarkBG } from "../StyleComponents/styledComponents";
import { useComponentDidMount } from "../../lib/utils";

interface cardSliderProps {
  didChange: boolean;
}

interface MeetingData {
  authID: string;
  meetingID: string;
  topic: string;
  meetingStart: string;
  meetingEnd: string;
  creatorName: string;
  description: string;
}

const CardSlider: React.FC<cardSliderProps> = (props: cardSliderProps) => {
  const [cardData, setCardData] = useState<MeetingData[]>([]);
  const [expandedCardIsVisible, setExpandedCardIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedCardData, setExpandedCardData] = useState(cardData[0]);
  const didChange = props.didChange;
  const [didUpdate, setDidUpdate] = useState(false);
  const sliderRef = useRef<Slider>(null);
  let [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_ROUTE + `/api/Meeting/`)
      .then((res) => res.json())
      .then((data) => {
        setCardData(data);
        if (firstLoad) {
          setTimeout(() => {
            const nextMeetingIndex = findNextMeetingIndex(data)
            sliderRef.current?.slickGoTo(nextMeetingIndex, true);
            setExpandedCardData(data[nextMeetingIndex]);
          }, 1);
          setFirstLoad(false);
        }
      });
  }, [currentIndex, didChange, didUpdate]);

  useEffect(() => {
    if (cardData.length > 0) {
      setExpandedCardData(cardData[currentIndex]);
    }
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

  const toggleUpdate = () => {
    setTimeout(() => {
      setDidUpdate(!didUpdate);
    }, 1000);
  };

  function findNextMeetingIndex(meetings: MeetingData[]): number {
    const now = new Date();

    for (let i = 0; i < meetings.length; i++) {
      const meetingEnd = new Date(meetings[i].meetingEnd);

      if (meetingEnd > now) {
        return i;
      }
    }

    // If no upcoming meetings were found, return tail
    return meetings.length - 1;
  }

  var settings = {
    accessibility: true,
    arrows: false,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centermode: true,
    // centerPadding: "50px",
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
      <Slider {...settings} ref={sliderRef}>
        {cardData.map((data) => {
          {
            return (
              <>
                <MeetingCard
                  key={data.meetingID}
                  meetingData={data}
                  toggleCard={toggleExpandedCard}
                  toggleUpdate={toggleUpdate}
                />
              </>
            );
          }
        })}
      </Slider>
    </>
  );
};
export default CardSlider;
