import {useEffect, useState} from "react";
import Particles, {initParticlesEngine} from "@tsparticles/react";
import {type ISourceOptions,} from "@tsparticles/engine";
import {loadSlim} from "@tsparticles/slim";


//@ts-ignore

export const options: ISourceOptions = {
    background: {
        color: {
            value: "#000000",
        },
    },
    fpsLimit: 60,
    detectRetina: true,
    interactivity: {
        events: {
            onClick: {
                enable: false,
                mode: "push",
            },
            onHover: {
                enable: false,
                mode: "repulse",
            },
            resize: true,
        },
        modes: {
            push: {
                quantity: 4,
            },
            repulse: {
                distance: 200,
                duration: 0.4,
            },
        },
    },
    particles: {
        color: {
            value: ["#38bdf8", "#60a5fa", "#3b82f6"],
        },
        links: {
            enable: false,
        },
        move: {
            direction: "none",
            enable: true,
            outModes: {
                default: "bounce",
            },
            random: true,
            speed: 2,
            straight: false,
        },
        number: {
            density: {
                enable: true,
                area: 1200,
            },
            value: 60,
        },
        opacity: {
            value: 0.4,
        },
        shape: {
            type: "circle",
        },
        size: {
            value: {
                min: 1,
                max: 4,
            },
        },
    },
};


export function Background() {
    const [engineReady, setEngineReady] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setEngineReady(true);
        });
    }, []);

    if (!engineReady) return null;

    return <Particles id="particles" options={options}/>;
}
