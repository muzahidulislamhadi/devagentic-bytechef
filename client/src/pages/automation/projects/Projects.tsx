import PageLoader from '@/components/PageLoader';
import { Button } from '@/components/ui/button';
import { useGetWorkspaceProjectGitConfigurationsQuery } from '@/ee/queries/projectGit.queries';
import ProjectsFilterTitle from '@/pages/automation/projects/components/ProjectsFilterTitle';
import ProjectsLeftSidebarNav from '@/pages/automation/projects/components/ProjectsLeftSidebarNav';
import { useWorkspaceStore } from '@/pages/automation/stores/useWorkspaceStore';
import Header from '@/shared/layout/Header';
import LayoutContainer from '@/shared/layout/LayoutContainer';
import { useGetProjectCategoriesQuery } from '@/shared/queries/automation/projectCategories.queries';
import { useGetProjectTagsQuery } from '@/shared/queries/automation/projectTags.queries';
import { useGetWorkspaceProjectsQuery } from '@/shared/queries/automation/projects.queries';
import { useApplicationInfoStore } from '@/shared/stores/useApplicationInfoStore';
import { useFeatureFlagsStore } from '@/shared/stores/useFeatureFlagsStore';
import { FolderIcon } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import FancyProjectsEmptyState from './components/FancyProjectsEmptyState';

import ProjectDialog from './components/ProjectDialog';
import ProjectList from './components/project-list/ProjectList';

export enum Type {
    Category,
    Tag,
}

const Projects = () => {
    const { application } = useApplicationInfoStore();
    const { currentWorkspaceId } = useWorkspaceStore();

    const [searchParams] = useSearchParams();

    const ff_1039 = useFeatureFlagsStore()('ff-1039');

    const categoryId = searchParams.get('categoryId');
    const tagId = searchParams.get('tagId');

    const filterData = {
        id: categoryId ? parseInt(categoryId) : tagId ? parseInt(tagId) : undefined,
        type: tagId ? Type.Tag : Type.Category,
    };

    const { data: categories, error: categoriesError, isLoading: categoriesIsLoading } = useGetProjectCategoriesQuery();

    const {
        data: projectGitConfigurations,
        error: projectGitConfigurationsError,
        isLoading: projectGitConfigurationsIsLoading,
    } = useGetWorkspaceProjectGitConfigurationsQuery(currentWorkspaceId!, ff_1039 && application?.edition === 'EE');

    const {
        data: projects,
        error: projectsError,
        isLoading: projectsIsLoading,
    } = useGetWorkspaceProjectsQuery({
        categoryId: searchParams.get('categoryId') ? parseInt(searchParams.get('categoryId')!) : undefined,
        id: currentWorkspaceId!,
        tagId: searchParams.get('tagId') ? parseInt(searchParams.get('tagId')!) : undefined,
    });

    const { data: tags, error: tagsError, isLoading: tagsIsLoading } = useGetProjectTagsQuery();

    return (
        <LayoutContainer
            header={
                projects &&
                projects.length > 0 && (
                    <Header
                        centerTitle={true}
                        position="main"
                        right={
                            <ProjectDialog
                                project={undefined}
                                triggerNode={
                                    <Button
                                        className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                                    >
                                        <FolderIcon className="mr-2 h-4 w-4" />
                                        New Project
                                    </Button>
                                }
                            />
                        }
                        title={<ProjectsFilterTitle categories={categories} filterData={filterData} tags={tags} />}
                    />
                )
            }
            leftSidebarBody={<ProjectsLeftSidebarNav categories={categories} filterData={filterData} tags={tags} />}
            leftSidebarHeader={<Header position="sidebar" title="Projects" />}
            leftSidebarWidth="64"
        >
            <PageLoader
                errors={[categoriesError, projectGitConfigurationsError, projectsError, tagsError]}
                loading={categoriesIsLoading || projectGitConfigurationsIsLoading || projectsIsLoading || tagsIsLoading}
            >
                {projects && projects?.length > 0 && tags ? (
                    <ProjectList
                        projectGitConfigurations={projectGitConfigurations ?? []}
                        projects={projects}
                        tags={tags}
                    />
                ) : (
                    <FancyProjectsEmptyState
                        createProjectButton={
                            <ProjectDialog
                                project={undefined}
                                triggerNode={
                                    <Button
                                        size="lg"
                                        className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                                    >
                                        <FolderIcon className="mr-2 h-5 w-5" />
                                        Create Your First Project
                                    </Button>
                                }
                            />
                        }
                    />
                )}
            </PageLoader>
        </LayoutContainer>
    );
};

export default Projects;
