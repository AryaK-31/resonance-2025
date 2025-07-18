import React from "react";
import { HAbout } from "../components";
import MainLogo from "../components/MainLogo";

const Home = () => {
    return (
        <div>
         
            <MainLogo />
            <div>
                <section id="about">
                    <HAbout />
                </section>
            </div>
            
        </div>
    );
};

export default Home;
