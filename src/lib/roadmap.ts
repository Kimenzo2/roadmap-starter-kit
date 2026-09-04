export type Item = {
	stage: string;
	title: string;
	outcome: string;
	themes: string[];
	confidence: string;
	live?: boolean;
};

export type Chapter = {
	id: string;
	label: string;
	hint: string;
	items: Item[];
};

export const chapters: Chapter[] = [
	{
		id: 'now',
		label: 'Now',
		hint: 'In active build',
		items: [
			{
				stage: 'Building',
				title: 'Faster deploys',
				outcome: 'Ship updates in one click, no waiting on builds.',
				themes: ['Deploy'],
				confidence: 'High — in active build',
				live: true
			},
			{
				stage: 'Testing',
				title: 'Usage overview',
				outcome: 'See what each tenant uses at a glance.',
				themes: ['Dashboard'],
				confidence: 'High — in active build',
				live: true
			}
		]
	},
	{
		id: 'next',
		label: 'Next',
		hint: 'Planned, order may shift',
		items: [
			{
				stage: 'Designed',
				title: 'Custom domains',
				outcome: 'Point your own domain at any tenant.',
				themes: ['Domains'],
				confidence: 'Medium — planned, order may shift'
			},
			{
				stage: 'Planned',
				title: 'Team invites',
				outcome: 'Bring teammates in with roles that make sense.',
				themes: ['Teams'],
				confidence: 'Medium — planned, order may shift'
			}
		]
	},
	{
		id: 'later',
		label: 'Later',
		hint: 'Directions we like, not committed',
		items: [
			{
				stage: 'Idea',
				title: 'Usage limits',
				outcome: 'Set fair caps per tenant before overages surprise you.',
				themes: ['Limits'],
				confidence: 'Directional — an idea we like'
			},
			{
				stage: 'Exploring',
				title: 'Audit log',
				outcome: 'See who changed what, when.',
				themes: ['Security'],
				confidence: 'Directional — an idea we like'
			}
		]
	}
];
