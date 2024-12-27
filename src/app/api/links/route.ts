import { Link } from "@/types/generic";
import { NextResponse } from "next/server";

let linksCache: Link[] = [];

async function getAllLinks() {
    if (linksCache.length > 0) {
        return linksCache;
    }

    try {
        const links = await import('@/assets/links/links.json');
        linksCache = links.default;
        return linksCache;
    } catch (error) {
        console.error('Error loading links:', error);
        return [];
    }
}

export async function GET() {
    const links = await getAllLinks();
    return NextResponse.json(links);
}
