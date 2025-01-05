import { Cache } from "@/lib/cache/cache";
import { ProjectsCacheData } from "@/types/cache";
import projectLoader from "../loaders/projectLoader";

export const projectsCache = new Cache<ProjectsCacheData>({
    maxSize: 100,
    ttl: 1000 * 60 * 60,
    evictionPolicy: 'lru',
    staleWhileRevalidate: true,
    revalidateInterval: 1000 * 60 * 5,
    loader: async () => projectLoader(),
});