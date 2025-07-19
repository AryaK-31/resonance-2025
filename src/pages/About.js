import Navbar from "../components/Navbar";
import "../styles/About.css";
import Data from "../API/card-data";
import { useParams, NavLink } from "react-router-dom";

const About = () => {
  const { eventName } = useParams();

  const eventData = Data.find((item) => item.path === `/${eventName}`);

  if (!eventData) {
    return (
      <>
        <Navbar />
        <div style={{ textAlign: "center", marginTop: "5rem" }}>
          <h2>Event not found</h2>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div
        className="row about-page"
        style={{
          margin: "5% 3%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div className="bg-1-gradient"></div>
        <div className="card col-lg-4">
          <img className="postercard" src={eventData.image} alt="Event poster" />
        </div>
        <div className="col-lg-8 events-details-container">
          <div style={{ textAlign: "center" }}>
            <h1>{eventData.event_name}</h1>
          </div>

          <div style={{ margin: "5%" }}>
            <h2>Description</h2>
          </div>

          <div className="event-details-description">
            <p className="description-para-tag">
              {eventData.detailed_description}
            </p>
          </div>

          <div className="event-details-description">
            <div className="row description-para-tag">
              <div className="col-lg-4">
                <h2>Type</h2>
                <p>{eventData.Type}</p>
              </div>
              <div className="col-lg-4">
                <div>
                  <h2>Venue</h2>
                  <p>{eventData.venue}</p>
                </div>
                <div>
                  <h2>Event Time</h2>
                  <p>{eventData.time}</p>
                   <h2>Event Date</h2>
                  <p>{eventData.date}</p>
                </div>
              </div>
              <div className="col-lg-4">
                <h2>Rubrics</h2>
                <p>{eventData.rubrics}</p>
                <h4>Event Incharge</h4>
                <p>
                  {eventData.studn1}: {eventData.scontact1}
                  <br />
                  {eventData.scontact2
                    ? `${eventData.studn2}: ${eventData.scontact2}`
                    : ""}
                </p>
              </div>
            </div>

            <div className="row description-para-tag">
              <div className="col-lg-8">
                <h2>Rules:</h2>
                <ul>
                  <li>
                    Detailed rules can be viewed here:{" "}
                    <a
                      className="rules"
                      target="_blank"
                      rel="noopener noreferrer"
                      href={eventData.rulelink}
                    >
                      Rules
                    </a>
                  </li>
                  {eventData.rules.map((rule, index) => (
                    <li className="mt-2" key={index}>
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {eventData.isOpen ? (
            <NavLink to={`${eventData.path}/register`} className="nav-link">
              <span className="navitem">
                <button className="offset">Register</button>
              </span>
            </NavLink>
          ) : (
            <span className="reg-closed">Registrations closed</span>
          )}
        </div>
      </div>
    </>
  );
};

export default About;
