import { Post } from "@/types/blog";
import { PostsResponse } from "@/types/cache";
import { Link, Partner, Project } from "@/types/generic";

async function fetchData<T>(endpoint: string): Promise<T> {
    const response = await fetch(endpoint);
    if (!response.ok) {
        throw new Error(`Failed to fetch from ${endpoint}`);
    }
    return response.json();
}

export async function fetchPosts(page: number = 1) {
    return fetchData(`/api/posts?page=${page}`) as Promise<PostsResponse>;
}

export async function fetchPost(slug: string) {
    return fetchData(`/api/posts/${slug}`) as Promise<Post>;
}

export async function fetchProjects() {
    return fetchData('/api/projects') as Promise<Project[]>;
}

export async function fetchProject(slug: string) {
    return fetchData(`/api/projects/${slug}`) as Promise<Project>;
}

export async function fetchLinks() {
    return fetchData('/api/links') as Promise<Link[]>;
}

export async function fetchPartners() {
    return fetchData('/api/partners') as Promise<Partner[]>;
}
