import React, { useState, useEffect, useRef } from "react";
import BIRDS from "vanta/dist/vanta.fog.min";
import Navbar from "./Navbar";
import ResonanceMainLogo from "../assets/ResonanceMainLogo.png"
import ResonanceSecond from "../assets/ResonanceSecond.png"
import { NavLink, Link } from "react-router-dom";
// Make sure window.THREE is defined, e.g. by including three.min.js in the document head using a <script> tag

const MyComponent = (props) => {
	const [vantaEffect, setVantaEffect] = useState(null);
	const myRef = useRef(null);
	useEffect(() => {
		if (!vantaEffect) {
			setVantaEffect(
				BIRDS({
					el: myRef.current,
					mouseControls: true,
					touchControls: true,
					gyroControls: false,
					minHeight: 200.0,
					minWidth: 200.0,
					highlightColor: 0x70707,
					midtoneColor: 0x000000,
					lowlightColor: 0x19e80c,
					baseColor: 0x0,
					blurFactor: 0.84,
					speed: 5,
				})
			);
		}
		return () => {
			if (vantaEffect) vantaEffect.destroy();
		};
	}, [vantaEffect]);
	return (
		<div ref={myRef} className="main-logo-bg">
			<Navbar className="z-20" />
			<div className="container main-logo z-20">
				<div style={{ textAlign: "center" }}>
					<h1 className="mainlogo-h1-school">
						GG INTERNATIONAL SCHOOL
					</h1>
					<p className="text-light">Presents</p>
				</div>
				<img src={ResonanceSecond} className="img-fluid logo-img" />
				<img src={ResonanceSecond} className="img-fluid logo-img-m" />
				<div style={{ textAlign: "center" }}>
					<h1 className="mainlogo-h1-inter mt-4">
						An Interschool Competition
					</h1>
				</div>
				<div style={{ marginTop: '5%' }}></div>
				<NavLink to="/events" className="nav-link ">
					<button className="button-64">
						<span className="text">Explore Events </span>
					</button>
				</NavLink>

			</div>
		</div>
	);
};

export default MyComponent;