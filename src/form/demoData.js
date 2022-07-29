let id = 0
export default [
	{
		id: ++id,
		title: '预学习答辩申请',
		description: '完成预学习内容后提交, 答辩通过即可转入下一阶段学习',
		eligible: true,
	},
	{
		id: ++id,
		title: `Demo form ${id}`,
		description: 'This is a demonstration form',
		eligible: true,
	},
	{
		id: ++id,
		title: `Demo form ${id}`,
		description: 'This is a demonstration form',
		eligible: true,
	},
	{
		id: ++id,
		title: `Demo form ${id}`,
		description: 'Demo: submitted and accepted',
		eligible: false,
		// User-action related entries
		submitTime: (new Date('2022-01-01')).getTime(),
		decisionTime: Date.now(),
		decision: 'accepted'
	},
	{
		id: ++id,
		title: `Demo form ${id}`,
		description: 'Demo: submitted and need to be updated',
		eligible: false,
		// User-action related entries
		submitTime: (new Date('2022-01-01')).getTime(),
		decisionTime: Date.now(),
		decision: 'change-requested'
	},
	{
		id: ++id,
		title: '流片答辩申请 - 第X期',
		description: '达到流片指标并完成 SoC 集成后提交, 答辩通过即可纳入本期流片名单',
		eligible: true,
		// User-action related entries
		submitTime: (new Date('2008-09-10')).getTime(),
		decisionTime: Date.now(),
		decision: 'declined'
	},
	{
		id: ++id,
		title: `Demo form ${id}`,
		description: 'Demo: submitted but not eligible',
		eligible: false,
		// User-action related entries
		submitTime: (new Date('2008-09-21')).getTime(),
		decisionTime: Date.now(),
		decision: 'declined'
	}
]