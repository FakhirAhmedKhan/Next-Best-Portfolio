import Link from "next/link";

const CTAButtons = ({ HomeData }) => {
  return (
    <div
      className="flex flex-wrap justify-center gap-4 pt-4 opacity-0 animate-fadeUp"
      style={{ animationDelay: "0.9s" }}
    >
      <Link
        href="/ProjectPage"
        className="group relative px-6 py-3 sm:px-8 sm:py-4 rounded-full text-sm sm:text-base font-semibold text-white overflow-hidden shadow-xl"
      >
        <div className="absolute inset-0 bg-linear-to-r from-fuchsia-600 via-pink-600 to-violet-600" />
        <div className="absolute inset-0 bg-linear-to-r from-violet-600 via-pink-600 to-fuchsia-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <span className="relative flex items-center gap-2">
          {HomeData.part7}
        </span>
      </Link>
    </div>
  );
};
export default CTAButtons;
