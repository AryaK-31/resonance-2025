import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const Design = () => {
	const particlesInit = useCallback(async (engine) => {
		// console.log(engine);
		// you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
		// this loads the tsparticles package bundle, it's the easiest method for getting everything ready
		// starting from v2 you can add only the features you need reducing the bundle size
		await loadFull(engine);
	}, []);

	const particlesLoaded = useCallback(async (container) => {
		// await console.log(container);
	}, []);

	return (
		<Particles
			id="tsparticles"
			init={particlesInit}
			loaded={particlesLoaded}
			options={{
				background: {
					// color: {
					//   value: "#0d47a1",
					// },
				},
				fpsLimit: 60,
				interactivity: {
					events: {
						onClick: {
							enable: false,
							mode: "push",
						},
						onHover: {
							enable: true,
							mode: "repulse",
						},
						resize: true,
					},
					modes: {
						push: {
							quantity: 0,
						},
						repulse: {
							distance: 150,
							duration: 0.4,
						},
					},
				},
				particles: {
					color: {
						value: "#FFD700",
					},
					links: {
						color: "#51ff00",
						distance: 150,
						enable: true,
						opacity: 0.6,
						width: 1,
					},
					collisions: {
						enable: false,
					},
					move: {
						directions: "down",
						enable: true,
						outModes: {
							default: "bounce",
						},
						random: true,
						speed: 2,
						straight: true,
					},
					number: {
						density: {
							enable: true,
							area: 800,
						},
						value: 70,
					},
					opacity: {
						value: 0.7,
						animation: {
							enable: true,
							minimumValue: 0,
							speed: 3,
							startValue: "max",
							repulse: "min",
						},
					},
					shape: {
						type: "star",
					},
					size: {
						value: { min: 3, max: 4 },
					},
				},
				detectRetina: true,
			}}
		/>
	);
};

export default Design;
