import { motion } from "framer-motion";

export const LoadingState = ({ loading, error }) => {
    return (
        <>
            {loading && (
                <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-20 sm:py-32 flex flex-col items-center justify-center"
                >
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="relative"
                    >
                        <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-emerald-400/30 border-t-emerald-500 rounded-full"></div>
                        <motion.div
                            className="absolute inset-0 w-12 h-12 sm:w-16 sm:h-16 border-4 border-teal-400/20 border-b-teal-500 rounded-full"
                            animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        ></motion.div>
                    </motion.div>
                    <p className="text-gray-500 dark:text-gray-400 mt-6 sm:mt-8 text-base sm:text-lg font-medium">
                        Fetching contributions...
                    </p>
                </motion.div>
            )}

            {/* Error State */}
            {
                error && !loading && (
                    <motion.div
                        key="error"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="py-12 sm:py-16"
                    >
                        <div className="mx-auto max-w-md backdrop-blur-xl bg-red-50/80 dark:bg-red-950/20 border-2 border-red-200 dark:border-red-500/30 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl">
                            <div className="text-5xl sm:text-6xl mb-4">⚠️</div>
                            <div className="text-red-600 dark:text-red-400 text-base sm:text-lg font-medium mb-2">
                                Unable to load contributions
                            </div>
                            <div className="text-red-500/70 dark:text-red-400/70 text-sm">
                                {error}
                            </div>
                        </div>
                    </motion.div>
                )
            }
        </>
    )
}
