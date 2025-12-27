import { getPageData } from "@/lib/data";
import CertificationsContent from "./CertificationsContent";

export default async function CertificationsPage() {
  const [certificationsData, certificationsSection, pageNameData] = await Promise.all([
    getPageData('en', 'certifications'),
    getPageData('en', 'sectionTitles'),
    getPageData('en', 'pageName')
  ]);

  const certificatesSectionData = certificationsSection?.certificationsSection ?? {};
  const certificateBadge = pageNameData?.certificateBade ?? "";

  return (
    <CertificationsContent
      certificationsData={certificationsData}
      certificationsSection={certificatesSectionData}
      certificateBadge={certificateBadge}
      language="en"
    />
  );
}
