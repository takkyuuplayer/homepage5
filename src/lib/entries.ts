export type ListEntry = {
	title: string;
	url?: string;
	publishedAt: Date;
};

export function sortByPublishedAt<T extends { publishedAt: Date }>(
	entries: readonly T[],
): T[] {
	return [...entries].sort(
		(a, b) => b.publishedAt.getTime() - a.publishedAt.getTime(),
	);
}
