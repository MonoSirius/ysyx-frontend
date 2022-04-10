<template>
	<div frame-content ref="frame">
		<div style="position: relative">
			<avatar-editor
				avatar-editor
				:width="size"
				:height="size"
				:rotation="rot"
				:borderRadius="size / 2"
				:scale="scale"
				ref="editor"
				@vue-avatar-editor:image-ready="
					scale = 1;
					rotation = 0;
					ready = true;
				"
				:style="{
					backgroundColor: 'var(--cf-gray-dark)',
					opacity: ready ? 1 : 0,
				}"
			/>
			<div
				style="
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					pointer-events: none;
					font-size: 1.2rem;
					font-weight: bold;
					color: var(--ct-gray-light);
					padding: 1em;
					border-radius: 1em;
					border: 3px dashed var(--ct-gray-light);
				"
				v-if="!ready"
			>
				点此选择图片<br />或拖拽到此处
			</div>
		</div>
		<container type="alert" v-if="errMsg">{{ errMsg }}</container>
		<container>
			<v-form>
				<label> Zoom : {{ scale }}x </label>
				<input
					type="range"
					min="1"
					max="3"
					step="0.02"
					v-model.number="scale"
					:disabled="!ready"
				/>
				<label> Rotation : {{ rot }}° </label>
				<input
					type="range"
					min="-180"
					max="180"
					step="1"
					v-model.number="rotation"
					:disabled="!ready"
				/>
			</v-form>
		</container>
	</div>
	<div btn-group>
		<btn
			:type="['solid', 'green', ready ? '' : 'disabled'].join(' ')"
			@click="upload"
			>上传头像</btn
		>
		<btn type="solid red" @click="remove">移除头像</btn>
	</div>
</template>

<script>
import createApi from '@CL/api'
import { defineComponent, ref, computed } from 'vue'
import { VueAvatar as AvatarEditor } from 'vue-avatar-editor-improved'
import { router } from '@/router'
const api = {
	uploadAvatar: createApi({
		path: '/avatar',
		domain: ['upload', location.host].join('.'),
		method: 'PUT',
		headers: {},
		credentials: 'include',
		processor: _ => _
	})
}
export default defineComponent({
	components: { AvatarEditor },
	setup(userID) {
		const
			errMsg = ref(''),
			scale = ref(1),
			rotation = ref(0),
			editor = ref(null),
			size = ref(300),
			ready = ref(false),
			rot = computed(() => Math.abs(rotation.value) > 2 ? rotation.value : 0)
		return { errMsg, userID, scale, rotation, editor, size, ready, rot }
	},
	mounted() {
		this.size = this.$refs.frame.offsetWidth - 50
	},
	methods: {
		upload() {
			if (!this.ready) return
			this.LOAD(async () => {
				const data = this.editor.getImageScaled(), max_size = 2048 * 1024
				let blob, quality = 1
				while ((
					blob = await new Promise(r => data.toBlob(r, 'image/png', quality))
				).size > max_size) quality *= 0.9
				const res = await api.uploadAvatar(blob)
				if (res.ok) this.RETURN(
					setTimeout(
						() => router.go(router.resolve(`/redirect/${location.pathname}`)),
						100
					)
				)
				else this.errMsg = await res.text()
			})
		},
		remove() {}
	}
})
</script>