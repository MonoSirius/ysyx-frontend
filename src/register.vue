<script setup>
import Container from "@CC/Container.vue";
import Spinner from "@CC/Spinner.vue";
import SendMail from "./register/send-mail.vue";
import MailSent from "./register/mail-sent.vue";
import TokenInvalid from "./register/token-invalid.vue";
import CreateAccount from "./register/create-account.vue";
import Welcome from "./register/welcome.vue";
import { markRaw, onActivated, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { router } from "@/router.js";
const route = useRoute(),
	loading = ref(true),
	display = ref(null),
	registerStore = useRegisterStore();
let _next;
function next(next = _next) {
	if (next) {
		display.value = markRaw(next);
		if (next === SendMail) _next = MailSent;
		else if (next === CreateAccount) _next = Welcome;
		else if (next === TokenInvalid) _next = SendMail;
		else _next = undefined;
	} else {
		router.push("/status/500");
	}
	loading.value = false;
}
onMounted(async () => {
	let { mail, token } = route.query;
	if (mail || token) {
		try {
			mail = window.atob(mail);
			registerStore.$patch({ mail, token });
			await callRegisterApi({
				action: "VALIDATE",
				mail,
				token,
			}).then((res) => {
				if (res.status === 200) {
					next(CreateAccount);
				} else {
					throw new Error();
				}
			});
		} catch (e) {
			console.log(e);
			next(TokenInvalid);
		}
	} else {
		next(SendMail);
	}
});
</script>

<template>
	<transition-group name="frame">
		<component v-if="!loading" @next="next" :is="display" />
	</transition-group>
	<transition name="fade">
		<div
			v-if="loading"
			style="
				position: absolute;
				top: calc(50% - 50px);
				left: calc(50% - 50px);
				width: 100px;
				height: 100px;
				font-size: 100px;
			"
		>
			<Spinner style="opacity: 0.3" />
		</div>
	</transition>
</template>

<script>
// Api caller
import createApi from "@CL/api.js";
import { defineStore } from "pinia";
export const callRegisterApi = createApi();
// Pinia Store
export const useRegisterStore = defineStore("register", {
	state() {
		return {
			// Step 1: Validate Email
			mail: "",
			allowAd: false,
			// Step 2: Create Account
			userID: "",
			password: "",
		};
	},
	getters: {
		/**
		 * @returns {Boolean}
		 */
		mailValid(store) {
			return /^\w+(\w+|\.|-)*\w+@([\w\-_]+\.)+[a-zA-Z]{1,3}$/i.test(
				store.mail
			);
		},
		userIDValid(store) {
			return /^[a-z][a-z0-9\-_]{4,15}$/gi.test(
				store.userID
			);
		},
		passwordValid(store) {
			return store.password && store.password.length >= 5;
		},
	},
});
</script>

<style lang="scss" scoped>
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
	transition: 0.5s linear;
}
.fade-leave-active {
	transition-delay: 0.3s;
}

.frame-enter-from {
	transform: translateY(200px);
	opacity: 0;
}
.frame-leave-to {
	transform: scale(50%);
	opacity: 0;
}
.frame-enter-from,
.frame-leave-to {
	opacity: 0;
}
.frame-enter-active,
.frame-leave-active {
	transition: 1s cubic-bezier(0.19, 1, 0.22, 1);
}
.frame-enter-active {
	transition-delay: 0.2s;
}
</style>