export const createParticle = (id, type) => {
    const settings = {
        small: {
            size: 2 + Math.random() * 2,
            color: "bg-pink-400/50",
            blur: 0.8,
        },
        medium: {
            size: 4 + Math.random() * 4,
            color: "bg-fuchsia-400/60",
            blur: 1.2,
        },
        large: {
            size: 8 + Math.random() * 8,
            color: "bg-gradient-to-br from-pink-400 to-purple-500",
            blur: 1.8,
        },
    };
    const cfg = settings[type];
    const startX = Math.random() * 100;
    const startY = Math.random() * 100;
    const endX = (Math.random() - 0.5) * 120;
    const endY = (Math.random() - 0.5) * 120;
    const duration = 8 + Math.random() * 10;
    const delay = Math.random() * 5;

    return {
        id,
        className: `absolute rounded-full ${cfg.color}`,
        style: {
            left: `${startX}%`,
            top: `${startY}%`,
            width: `${cfg.size}px`,
            height: `${cfg.size}px`,
            "--tx": `${endX}vw`,
            "--ty": `${endY}vh`,
            animation: `float-diagonal ${duration}s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s infinite`,
            filter: `blur(${cfg.blur}px)`,
            boxShadow: "0 0 12px 3px rgba(236, 72, 153, 0.5)",
        },
    };
};
