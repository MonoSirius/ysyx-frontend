<script setup>
import SponsorBox from "./SponsorBox.vue";
// Individual logos
import UCAS from "./sponsors/UCAS.vue";
import ICT from "./sponsors/ICT.vue";
import PCL from "./sponsors/PCL.vue";
import BOSC from "./sponsors/BOSC.vue";
import SHIC from "./sponsors/SHIC.vue";
import ByteDance from "./sponsors/ByteDance.vue";
import Youdao from "./sponsors/Youdao.vue";
import CRVA from "./sponsors/CRVA.vue";
import BAAI from "./sponsors/BAAI.vue";
</script>


<template>
	<div
		style="display: flex; flex-wrap: wrap; justify-content: center"
		:ref="(_) => (div = _)"
	>
		<SponsorBox :scale="0.8" alt="中国科学院大学" :el="UCAS" />
		<SponsorBox :scale="1.1" alt="中科院计算所" :el="ICT" />
		<SponsorBox :scale="0.8" alt="鹏城实验室" :el="PCL" />
		<SponsorBox :scale="0.9" alt="北京开源芯片研究院" :el="BOSC" />
		<SponsorBox :scale="1.0" alt="上海处理器技术创新中心" :el="SHIC" />
		<SponsorBox :scale="0.6" alt="字节跳动" :el="ByteDance" />
		<SponsorBox :scale="0.6" alt="有道 youdao.com" :el="Youdao" />
		<SponsorBox :scale="1.0" alt="中国开放指令生态联盟" :el="CRVA" />
		<SponsorBox :scale="0.6" alt="北京智源" :el="BAAI" />
	</div>
</template>