<script setup>
import Container from '@CC/Container.vue'
</script>

<template>
	<container flex flex-column flex-center flex-grow>
		<h2>欢迎加入「一生一芯」</h2>
		<container next-level>
			<h4>我是学生</h4>
			<p>
				在开始学习之前，建议先阅读
				<router-link
					to="/redirect/to/docs.ysyx.org/about/enroll/student.html"
				>[官方文档] 参与学习</router-link>
				了解学习流程，以便更好地利用我们提供的资源。
			</p>
		</container>
		<container next-level>
			<h4>我是老师</h4>
			<p></p>
		</container>
		<container next-level>
			<h4>我想报名助教</h4>
			<p></p>
		</container>
	</container>
</template>