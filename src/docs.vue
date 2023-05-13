<template>
	<container
		style="
			display: flex;
			flex-grow: 1;
			justify-content: center;
			align-items: center;
		"
		w1280
	>
		<div style="display: flex; align-items: left; flex-direction: column">
			<h2>模块暂未开放</h2>
			<h2>将在开发完成后启用</h2>
			<span
				style="
					display: flex;
					flex-direction: row;
					justify-content: flex-start;
					margin: 1em 0;
				"
			>
				<btn style="font-size: 1.2rem" type="gray brand" to="/"
					>← 返回主页</btn
				>
			</span>
		</div>
	</container>
</template>

<style scoped>
* {
	display: block;
	color: var(--ct-gray-light);
}
h1 {
	font-size: 8rem;
}
h2 {
	font-size: 2rem;
}
</style>