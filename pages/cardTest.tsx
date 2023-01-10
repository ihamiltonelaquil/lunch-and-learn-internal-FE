import MeetingCard from "../components/Cards/MeetingCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";
import ExpandedMeetingCard from "../components/Cards/ExpandedMeetingCard";
import { DarkBG } from "../components/styledComponents";

export default function CardTest(){

    const data = 
        [
            {
                meetingID: 1,
                topic: "TailWind CSS",
                meetingStart: "2022-12-14T09:00:00",
                meetingEnd: "2022-12-14T09:30:00",
                creatorName: "Parthey Bhatt",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            },
            {
                meetingID: 2,
                topic: "Test Meeting",
                meetingStart: "2022-12-19T09:00:00",
                meetingEnd: "2022-12-19T09:30:00",
                creatorName: "Malachi Habib",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            },
            {
                meetingID: 3,
                topic: "Test Meeting 2",
                meetingStart: "2022-12-19T09:00:00",
                meetingEnd: "2022-12-19T09:30:00",
                creatorName: "Test User",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            },
            {
                meetingID: 4,
                topic: "Cool Topic",
                meetingStart: "2022-12-19T09:00:00",
                meetingEnd: "2022-12-19T09:30:00",
                creatorName: "Test User 2",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            },
        ]

        
        const [expandedCardIsVisible, setExpandedCardIsVisible] = useState(false);
        
        const [expandedCardData, setExpandedCardData] = useState(data[0]);
        
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
            lazyLoad: "ondemand",
            swipeToSlide: true,
            onLazyLoad: function(){
                console.log("Lazy Load")
            },
            afterChange: (current: number) => setExpandedCardData(data[current]),
        };

        function toggleExpandedCard(){
        setExpandedCardIsVisible(v => !v)
    }
    
    return(
        <>
                    {expandedCardIsVisible &&
                <>
                    <ExpandedMeetingCard meetingData={expandedCardData} onClick={toggleExpandedCard} />
                    <DarkBG onClick={() => {
                        toggleExpandedCard();
                    }}>
                    </DarkBG>
                </>
            }
            <br></br>
            <Slider {...settings}>
                <div>
                    <MeetingCard meetingData={data[0]} toggleCard={toggleExpandedCard}/>
                </div>
                <div>
                    <MeetingCard meetingData={data[1]} toggleCard={toggleExpandedCard}/>
                </div>
                <div>
                    <MeetingCard meetingData={data[2]} toggleCard={toggleExpandedCard}/>
                </div>
                <div>
                    <MeetingCard meetingData={data[3]} toggleCard={toggleExpandedCard}/>
                </div>
            </Slider>
        </>
    )
}
