import { getPageData } from "@/lib/data";
import ProjectContent from "./ProjectContent";

export default async function Page() {
    const [sectionTitles, pageNameData, projects] = await Promise.all([
        getPageData('en', 'sectionTitles'),
        getPageData('en', 'pageName'),
        getPageData('en', 'projects')
    ]);

    const ProjectData = sectionTitles?.project ?? {};
    const ProjectBadgeText = pageNameData?.ProjectBade ?? "";

    return <ProjectContent ProjectData={ProjectData} ProjectBadgeText={ProjectBadgeText} projects={projects} />
}