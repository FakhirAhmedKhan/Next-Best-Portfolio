export const OrbitParticle = ({
    radius,
    duration = 10,
    delay = 0,
    color,
    size = 2,
    blur = 1,
}) => {
    return (
        <div
            className="absolute left-1/2 top-1/2"
            style={{
                width: `${size}px`,
                height: `${size}px`,
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
            }}
        >
            <div
                className="animate-orbit"
                style={{ "--duration": `${duration}s` }}
            >
                <div
                    className={`absolute rounded-full ${color}`}
                    style={{
                        width: `${size}px`,
                        height: `${size}px`,
                        left: `${radius}px`,
                        filter: `blur(${blur}px)`,
                        boxShadow: `0 0 ${size * 6}px ${size * 2}px currentColor`,
                    }}
                />
            </div>
        </div>
    );
};
