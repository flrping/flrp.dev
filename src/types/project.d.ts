export interface Project {
    name: string;
    tags: string[];
    stack: string[];
    links: ProjectLink[];
    description: string;
    year?: number;
    month?: number;
}

export interface ProjectLink {
    name: string;
    url: string;
}
