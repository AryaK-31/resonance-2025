import { Navbar } from "../components";
import "../styles/timeline.css";

const Calender = () => {
  // Timeline Data Arrays

  const timelineDay11 = [
    { title: "Registration of Event", date: "8:30 AM" },
    { title: "Break & Settling time", date: "9:00 AM" },
    { title: "Young Innovators Expo", date: "9:30 AM" },
    { title: "Block Coding with AI", date: "9:30 AM" },
    { title: "Closing and Dispersal", date: "2:30 PM" },
  ];

  const timelineDay12 = [
    { title: "Registration of Event", date: "8:30 AM" },
    { title: "Break & Settling time", date: "9:00 AM" },
    { title: "Poetry Slam", date: "9:30 AM" },
    { title: "Canvas of Creativity", date: "10:00 AM" },
    { title: "Debate", date: "11:00 AM" },
    { title: "Stage Kaleidoscope", date: "12:30 AM" },
    { title: "Closing and Dispersal", date: "2:30 PM" },
  ];

  const timelineDay13 = [
    { title: "Registration of Event", date: "8:30 AM" },
    { title: "Break & Settling time", date: "9:00 AM" },
    { title: "Geet ka Saar", date: "9:30 AM" },
    { title: "Just A Minute(JAM)", date: "10:00 AM" },
    { title: "Festival Collage Making", date: "12:00 PM" },
    { title: "World Quest Quiz", date: "12:30 PM" },
    { title: "Closing and Dispersal", date: "1:30 PM" },
  ];


  const timelineDay18 = [
    { title: "Opening Ceremony", date: "10:00 AM" },
    { title: "Class 8 CP", date: "10:45 AM" },
    { title: "Long Service Awards", date: "11:30 AM" },
    { title: "Theatre-O-Mania", date: "12:15 PM" },
    { title: "Story Spin-Off", date: "1:45 PM" },
    { title: "Sell It Smart", date: "3:15 PM" },
    { title: "National Anthem", date: "4:30 PM" },
    { title: "Dispersal", date: "4:40 PM" },
  ];

  const timelineDay19 = [
    { title: "स्वास्थ्यभोजनं सुखाय", date: "10:10 AM" },
    { title: "Rythem Warriors", date: "11:30 AM" },
    { title: "CP Closing", date: "12:40 PM" },
    { title: "Resonance Winner & Trophy", date: "2:00 PM" },
    { title: "School & National Anthem", date: "3:00 PM" },
    { title: "Vote of Thanks", date: "3:45 PM" },
    { title: "Conclusion of Event & Dispersal", date: "4:30 PM" },
  ];

  const allTimelines = [
    { date: "11th August - GGIS Pimpri", data: timelineDay11 },
    { date: "12th August - GGIS Bavdhan", data: timelineDay12 },
    { date: "12th August - GGIS Tathawade", data: timelineDay13 },
    { date: "18th August - GGIS Pimpri", data: timelineDay18 },
    { date: "19th August - GGIS Pimpri", data: timelineDay19 },
  ];

  return (
    <>
      <Navbar />
      <div className="d-flex flex-column" id="calendar-page">
        <h1 className="text-fluid text-center calendar-heading">CALENDAR</h1>
        <h2 className="timeline-heading text-center">
          These are tentative timelines and may change.
        </h2>

        <div className="timeline-grid">
          {allTimelines.map((timeline, idx) => (
            <div className="timeline-box" key={idx}>
              <h2 className="text-fluid text-center day">{timeline.date}</h2>
              <div className="scrollable-timeline">
                <ul className="timeline">
                  {timeline.data.map((item, index) => (
                    <li className="timeline-item" key={index}>
                      <div className="timeline-dot"></div>
                      <h5 className="timeline-title text-light">{item.title}</h5>
                      <p className="timeline-date text-warning">{item.date}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Calender;
