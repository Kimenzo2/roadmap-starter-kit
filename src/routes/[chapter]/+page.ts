import { error } from '@sveltejs/kit';
import { getChapter } from '$lib/config/roadmap';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const chapter = getChapter(params.chapter);
	if (!chapter) error(404, 'Not found');
	return { chapter };
};
