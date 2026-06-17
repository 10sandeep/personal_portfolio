export default function BorderBeam({ duration = 6, delay = 0, colorFrom = '#a78bfa', colorTo = '#c4b5fd', thickness = 1.5 }) {
    return (
        <span
            className="bbeam"
            style={{
                '--bd': `${duration}s`,
                '--bdelay': `${delay}s`,
                '--bf': colorFrom,
                '--bt': colorTo,
                '--bs': `${thickness}px`,
            }}
        />
    );
}
