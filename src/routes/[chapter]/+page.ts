import { error } from '@sveltejs/kit';
import { chapters } from '$lib/roadmap';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const chapter = chapters.find((c) => c.id === params.chapter);
	if (!chapter) error(404, 'Not found');
	return { chapter };
};
