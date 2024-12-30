'use server';

import { Post } from "@/types/blog";
import path from "path";
import fs from 'fs/promises';

const postLoader = async () => {
    const blogDir = path.join(process.cwd(), 'src/assets/blog');
    const directories = await fs.readdir(blogDir);

    directories.sort((a: string, b: string) => {
        const dateA = parseDirectoryDate(a);
        const dateB = parseDirectoryDate(b);
        return dateB.getTime() - dateA.getTime();
    });

    const posts = (
        await Promise.all(
            directories.map(async (dir) => {
                try {
                const detailsPath = path.join(blogDir, dir, 'details.json');
                const contentPath = path.join(blogDir, dir, 'content.md');
                const bannerPath = path.join(blogDir, dir, 'images', 'banner.webp');

                const [detailsContent, content, bannerExists] = await Promise.all([
                    fs.readFile(detailsPath, 'utf-8'),
                    fs.readFile(contentPath, 'utf-8'),
                    fs
                        .access(bannerPath)
                        .then(() => true)
                        .catch(() => false),
                ]);

                const details = JSON.parse(detailsContent);
                const date = parseDirectoryDate(dir);

                return {
                    slug: details.slug,
                    title: details.title,
                    tags: details.tags,
                    date,
                    content,
                    banner: bannerExists,
                };
            } catch (error) {
                console.warn(`Skipping post ${dir} due to missing files:`, error);
                return null;
            }
        }),
        )
    ).filter((post): post is Post => post !== null);

    return {
        posts,
        postsById: new Map(posts.map((post) => [post.slug, post])),
        lastUpdated: new Date(),
    };
};

function parseDirectoryDate(dir: string) {
    const [datePart, timePart] = dir.split('_');
    const [year, month, day] = datePart.split('-');
    const [hour, minute] = timePart.split('-');

    const date = new Date();
    date.setFullYear(Number(year), Number(month) - 1, Number(day));
    date.setHours(Number(hour), Number(minute), 0, 0);

    return date;
}

export default postLoader;
