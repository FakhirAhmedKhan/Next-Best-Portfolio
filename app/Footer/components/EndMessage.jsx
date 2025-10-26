import { motion } from "framer-motion";

export const EndMessage = () => (
  <motion.p
    className="mt-20 text-center text-gray-400 text-lg"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 1 }}
  >
    Built with 💖 using <span className="text-fuchsia-500 font-semibold">React</span> &{' '}
    <span className="text-pink-500 font-semibold">Tailwind CSS</span>
  </motion.p>
);