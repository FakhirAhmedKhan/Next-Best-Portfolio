"use client";
import { ExternalLink, Filter } from "lucide-react";
import { BsFillAwardFill } from "react-icons/bs";
import useCertifications from "@/hooks/useCertifications";
import SectionHeading from "@/UI/SectionHeading";
import Badge from "@/UI/Badge";

export default function CertificationsContent({ certificationsData, certificationsSection, certificateBadge, language }) {
    const {
        issuers,
        selectedFilter,
        setSelectedFilter,
        filteredCerts,
        iconMap,
    } = useCertifications({ certificationsData, certificationsSection, certificateBadge, language });

    return (
        <div className="">
            <div className="max-w-7xl mx-auto">
                <SectionHeading
                    title={certificationsSection?.title ?? ""}
                    subtitle={certificationsSection?.paragraph ?? ""}
                />

                <div className="flex justify-center items-center mb-2">
                    <Badge
                        Icon={BsFillAwardFill}
                        BageName={certificateBadge}
                        className="px-4 py-2 text-sm"
                    />
                </div>

                {/* Filter Buttons */}
                <div className="flex items-center justify-center gap-3 mb-12 flex-wrap">
                    <Filter className="w-5 h-5 text-slate-400" />
                    {issuers.map((issuer) => (
                        <button
                            key={issuer}
                            onClick={() => setSelectedFilter(issuer)}
                            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${selectedFilter === issuer
                                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50"
                                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                                }`}
                        >
                            {issuer === "all"
                                ? language === "ar"
                                    ? "جميع الشهادات"
                                    : "All Certifications"
                                : issuer}
                        </button>
                    ))}
                </div>

                {/* Certifications Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCerts.map((cert, index) => {
                        // ✅ safe icon lookup
                        const iconKey = typeof cert?.icon === "string" ? cert.icon : "";
                        const IconComponent = iconMap[iconKey];

                        // ✅ safe skills array
                        const skills = Array.isArray(cert?.skills) ? cert.skills : [];

                        // ✅ safe url
                        const credentialUrl =
                            typeof cert?.credentialUrl === "string" && cert.credentialUrl.trim()
                                ? cert.credentialUrl
                                : null;

                        return (
                            <div
                                key={`${cert?.title ?? "cert"}-${index}`}
                                className="group bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 hover:border-slate-600 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-1"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div
                                        className={`w-14 h-14 rounded-xl bg-gradient-to-br ${cert?.color ?? "from-slate-600 to-slate-700"
                                            } flex items-center justify-center shadow-lg`}
                                    >
                                        {IconComponent ? (
                                            <IconComponent className="w-7 h-7 text-white" />
                                        ) : null}
                                    </div>

                                    {!!cert?.logo && (
                                        <img
                                            src={cert.logo}
                                            alt={cert?.issuer ?? "issuer"}
                                            className="w-12 h-12 rounded-lg object-contain bg-white/10 p-1"
                                            onError={(e) => {
                                                e.currentTarget.style.display = "none";
                                            }}
                                        />
                                    )}
                                </div>

                                <div className="mb-3">
                                    <span className="inline-block px-3 py-1 bg-slate-700/50 text-slate-300 text-xs font-semibold rounded-full mb-2">
                                        {cert?.year ?? ""}
                                    </span>

                                    <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                                        {language === "ar" ? cert?.titleAr || cert?.title : cert?.title}
                                    </h3>

                                    <p className="text-slate-400 text-sm font-medium">
                                        {cert?.issuer ?? ""}
                                    </p>
                                </div>

                                <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                                    {language === "ar"
                                        ? cert?.descriptionAr || cert?.description
                                        : cert?.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {skills.map((skill, idx) => (
                                        <span
                                            key={`${cert?.title ?? "cert"}-skill-${idx}`}
                                            className="px-3 py-1 bg-slate-700/70 text-slate-200 text-xs font-medium rounded-lg"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>

                                {/* ✅ only render link if url exists */}
                                {credentialUrl ? (
                                    <a
                                        href={credentialUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r ${cert?.color ?? "from-slate-600 to-slate-700"
                                            } text-white font-semibold hover:shadow-lg transition-all duration-300 group-hover:scale-105`}
                                    >
                                        {language === "ar" ? "عرض الشهادة" : "View Certificate"}
                                        <ExternalLink className="w-4 h-4" />
                                    </a>
                                ) : null}
                            </div>
                        );
                    })}
                </div>

                {/* Stats Footer */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 text-center">
                        <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
                            {certificationsData.length}
                        </div>
                        <div className="text-slate-400 font-medium">
                            {language === "ar" ? "إجمالي الشهادات" : "Total Certifications"}
                        </div>
                    </div>

                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 text-center">
                        <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-2">
                            {new Set(
                                certificationsData.flatMap((c) =>
                                    Array.isArray(c?.skills) ? c.skills : []
                                )
                            ).size}
                        </div>
                        <div className="text-slate-400 font-medium">
                            {language === "ar" ? "المهارات المغطاة" : "Skills Covered"}
                        </div>
                    </div>

                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 text-center">
                        <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 mb-2">
                            {new Set(
                                certificationsData
                                    .map((c) => (c?.issuer ?? "").trim())
                                    .filter(Boolean)
                            ).size}
                        </div>
                        <div className="text-slate-400 font-medium">
                            {language === "ar" ? "شركاء المنصات" : "Platform Partners"}
                        </div>
                    </div>
                </div>

                {!certificationsData.length && (
                    <div className="mt-10 text-center text-slate-400">
                        {language === "ar"
                            ? "لا توجد شهادات متاحة حالياً."
                            : "No certifications available yet."}
                    </div>
                )}
            </div>
        </div>
    );
}
