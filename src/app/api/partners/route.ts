import { NextResponse } from "next/server";
import type { Partner } from "@/types/generic";

let partnersCache: Partner[] = [];

async function getAllPartners() {
    if (partnersCache.length > 0) {
        return partnersCache;
    }

    try {
        const partners = await import('@/assets/partners/partners.json');
        partnersCache = partners.default;
        return partnersCache;
    } catch (error) {
        console.error('Error loading partners:', error);
        return [];
    }
}

export async function GET() {
    const partners = await getAllPartners();
    return NextResponse.json(partners);
}
