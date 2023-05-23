import { oak } from '@deps';

/**
 * Sleeps in a specific milliseconds.
 * @param ms the sleeping time in milliseconds.
 */
export function sleep(ms: number): Promise<void> {
    return new Promise((resolve, _) => setTimeout(resolve, ms));
}

export function repeat<T>(arr: T[], t: number) {
    if (t < 0) {
        throw new Error('illegal argument: t must not be negative');
    }
    const rep = [] as T[];
    for (let i = 0; i < t; i++) {
        rep.push(...arr);
    }
    return rep;
}

export function escapeLikeWildcards(text: string, escape = '') {
    if (escape.length > 1) {
        throw new Error('illegal argument: escape must be a character');
    }
    if (escape === '%') {
        throw new Error('illegal argument: escape must not be %');
    }
    return text.replaceAll(escape, `${escape}${escape}`).replaceAll(
        '%',
        `${escape}%`,
    ).replaceAll('_', `${escape}_`).replaceAll('[', `${escape}[`);
}

export function getPageableRequest(context: oak.Context) {
    const page = Number(context.request.url.searchParams.get('page')) || 0;
    const size = Number(context.request.url.searchParams.get('size')) || 20;
    return {
        page,
        size,
    };
}

export function createPageableResponse<T>(
    data: T[],
    page: number,
    size: number,
    total?: number,
) {
    return {
        data,
        page,
        size,
        total,
    };
}
