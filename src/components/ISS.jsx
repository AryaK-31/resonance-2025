import React, { Suspense, useState } from "react";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { IssCss } from "../styles";

function Model() {
    const [scrolls, setScroll] = useState(0);

    window.addEventListener("scroll", handleScroll);

    function handleScroll() {
        setScroll(window.scrollY);
    }

    const vh = Math.max(
        document.documentElement.clientHeight || 0,
        window.innerHeight || 0
    );

    const vw = Math.max(
        document.documentElement.clientHeight || 0,
        window.innerWidth || 0
    );

    var currScale = ((vw - 375) / (1920 - 375)) * (0.0015 - 0.001) + 0.001;

    const { scene } = useGLTF("ISS_compressed.glb");
    return (
        <primitive
            object={scene}
            scale={currScale}
            rotation={[(scrolls - vh) * -0.005, 0, (scrolls - vh) * -0.001]}
        />
    );
}

export default function ShowDonut(props) {
    // window.addEventListener("mousemove", handleMouseMove);
    // const [mouseX, setMouseX] = useState(10);
    // const [mouseY, setMouseY] = useState(10);

    // function handleMouseMove(event) {
    //     setMouseX(event.clientX);
    //     setMouseY(event.clientY);
    // }
    return (
        <div className="threeD">
            <Canvas camera={{ position: [10, 18, 23], fov: 0.5 }}>
                <pointLight position={[200, 200, 200]} intensity={1} />
                {/* <pointLight position={[-220, 0, 0]} intensity={1.5} /> */}
                {/* <pointLight position={[0, 220, 0]} intensity={1.5} /> */}
                {/* <pointLight position={[0, -220, 0]} intensity={1.5} /> */}
                {/* <pointLight position={[0, 0, 220]} intensity={1.5} /> */}
                {/* <pointLight position={[-200, -200, -200]} intensity={3} /> */}
                <Suspense fallback={null}>
                    <Model />
                </Suspense>
                {/* <OrbitControls /> */}
            </Canvas>
        </div>
    );
}
