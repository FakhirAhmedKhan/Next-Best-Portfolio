import { motion } from "framer-motion";
export const OrbitParticle = ({
    radius,
    duration,
    delay,
    color,
    size = 2,
    blur = 1,
}) => {
    return (
        <motion.div
            className="absolute left-1/2 top-1/2"
            style={{ width: `${size}px`, height: `${size}px` }}
            animate={{ rotate: 360 }}
            transition={{ duration, repeat: Infinity, ease: "linear", delay }}
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
        </motion.div>
    );
};
