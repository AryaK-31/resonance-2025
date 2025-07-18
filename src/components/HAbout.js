
const HAbout = () => {
    return (
        <>
            <div className="about-outer-div">
                <div className="container about-main-div">
                    <div className="row rounded-4 d-flex justify-content-between">
                        <h1 className="about-heading rounded-4">RESONANCE</h1>
                    </div>
                    <div className="row rounded-4 d-flex justify-content-center">
                        <p className="about-desc rounded-4">
                            Resonance is a technology and innovation event
                            organized by the GG International School group of schools.
                            <br />
                            <br />
                            With over 14 different technical and non-technical
                            events, participants can showcase their skills and
                            knowledge in a competitive yet friendly environment.
                            Resonance is designed to test participant's technical
                            expertise, creativity, and critical thinking skills,
                            pushing them to their limits and beyond. <br />
                            <br />
                            There are prizes, but even those who don't win can
                            benefit from the experience. If you're a
                            student with a passion for art, technology, sports
                            and innovation, don't miss out on Resonance. Check out
                            the brochure and get ready to create,
                            innovate, and show off your talents!
                        </p>
                    </div>
                    <div className="container d-flex justify-content-center">
                        <a
                            target={"_blank"}
                            className="anchor-tag "
                            href="https://drive.google.com/file/d/1mklSsk1VBQeCt4rBK5rClJPa5X_iWCbT/view"
                        >
                            <button className="button-64">
                                <span className="text">DOWNLOAD BROCHURE </span>
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HAbout;
