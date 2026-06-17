import { useEffect, useRef } from 'react';
import createGlobe from 'cobe';

export default function Globe() {
    const canvasRef = useRef(null);

    useEffect(() => {
        let phi = 0;
        let width = 0;

        const onResize = () => {
            if (canvasRef.current) {
                width = canvasRef.current.offsetWidth;
            }
        };
        window.addEventListener('resize', onResize);
        onResize();

        const globe = createGlobe(canvasRef.current, {
            devicePixelRatio: 2,
            width: width * 2,
            height: width * 2,
            phi: 0,
            theta: 0.25,
            dark: 1,
            diffuse: 1.4,
            mapSamples: 20000,
            mapBrightness: 5,
            baseColor: [0.18, 0.12, 0.32],
            markerColor: [0.65, 0.45, 1],
            glowColor: [0.48, 0.22, 0.86],
            markers: [
                { location: [20.5937, 78.9629], size: 0.06 },
            ],
            onRender(state) {
                state.phi = phi;
                state.width = width * 2;
                state.height = width * 2;
                phi += 0.0025;
            },
        });

        return () => {
            globe.destroy();
            window.removeEventListener('resize', onResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                width: '100%',
                height: '100%',
                aspectRatio: '1',
                display: 'block',
            }}
        />
    );
}
