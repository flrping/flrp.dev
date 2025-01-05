export interface Project {
    name: string;
    tags: string[];
    stack: string[];
    links: ProjectLink[];
    description: string;
}

export interface ProjectLink {
    name: string;
    url: string;
}