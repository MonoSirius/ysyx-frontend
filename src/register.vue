<script setup>
import Container from '@CC/Container.vue'
import ChasingCircle from '@CC/spinners/ChasingCircle.vue'
import SendMail from './register/send-mail.vue'
import MailSent from './register/mail-sent.vue'
import TokenInvalid from './register/token-invalid.vue'
import CreateAccount from './register/create-account.vue'
import Welcome from './register/welcome.vue'
import { markRaw, onActivated, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { router } from '@/router'
const route = useRoute(),
	loading = ref(true),
	display = ref(null),
	store = useRegisterStore()
let _next
function next(next = _next) {
	if (next) {
		display.value = markRaw(next)
		if (next === SendMail) _next = MailSent
		else if (next === CreateAccount) _next = Welcome
		else if (next === TokenInvalid) _next = SendMail
		else _next = undefined
	} else {
		router.push('/status/500')
	}
	loading.value = false
}
onMounted(() => {
	if (store.parseQuery(route)) {
		store.validateToken().then((res) => {
			if (res.status === 200) {
				next(CreateAccount)
			} else {
				next(TokenInvalid)
			}
		})
	} else if ('token' in route.query || 'mail' in route.query) {
		next(TokenInvalid)
	} else {
		next(SendMail)
	}
})
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
			<chasing-circle style="opacity: 0.3" />
		</div>
	</transition>
</template>

<script>
// Api caller
import createApi from '@CL/api'
import sha256 from '@CL/sha256'
import Rx from '@CL/Rx'
import { defineStore } from 'pinia'
import useUserStore from '@CS/user'
export const callRegisterApi = createApi({ url: '/register' })
// Cached result list for validated ID list
const checkedIdList = {}, user = useUserStore()
// Pinia Store
export const useRegisterStore = defineStore('register', {
	state() {
		return {
			// Step 1: Validate Email
			mail: '',
			allowAd: false,
			// Step 2: Create Account
			userID: '',
			userName: '',
			password: '',
			checkResult: '',
		}
	},
	getters: {
		/**
		 * @returns {Boolean}
		 */
		mailValid(store) {
			return Rx.mail.test(store.mail)
		},
		/**
		 * @returns {Boolean}
		 */
		userIDValid(store) {
			return Rx.ID.test(store.userID)
		},
		/**
		 * @returns {Boolean}
		 */
		passwordValid(store) {
			return store.password && store.password.length >= 5
		},
	},
	actions: {
		/**
		 * @param {import('vue-router').RouteLocationNormalized} route
		 * @returns {Boolean} Indicates whether the search query is valid
		 */
		parseQuery(route) {
			let { mail, token } = route?.query || {}
			// Check if both mail and token are valid strings
			if (
				![mail, token]
					.map((_) => _ && typeof _ === 'string')
					.reduce((a, b) => a && b)
			)
				return false
			try {
				mail = window.atob(mail)
				this.mail = mail
				this.token = token
				return true
			} catch (e) {
				this.$reset()
				return false
			}
		},
		/**
		 * @returns {Promise<Response>}
		 */
		async sendMail() {
			const { mail, allowAd } = this
			return await callRegisterApi({
				action: 'SEND_MAIL',
				mail,
				allowAd,
			})
		},
		/**
		 * @returns {Promise<Response>}
		 */
		async validateToken() {
			const { mail, token } = this
			return await callRegisterApi({
				action: 'VALIDATE',
				mail,
				token,
			})
		},
		/**
		 * @returns {Promise<Response>}
		 */
		async checkUserID() {
			const { mail, token, userID } = this
			if (!this.userIDValid) return false
			if (!(userID in checkedIdList)) {
				// Store a promise in corresponding cache list entry
				checkedIdList[userID] = callRegisterApi({
					action: 'VALIDATE',
					mail,
					token,
					userID,
				}).then(async (res) => {
					if (res.ok) {
						return true
					} else {
						this.checkResult = await res.text()
						return false
					}
				})
			}
			return await checkedIdList[userID]
		},
		/**
		 * @returns {Promise<Boolean>}
		 */
		async register(onFail = () => {}) {
			const { mail, token, userID, password, userName } = this
			const registerResult = await callRegisterApi({
				action: 'CREATE_ACCOUNT',
				mail,
				token,
				userID,
				name: userName,
				password: sha256(password),
			}).then(async (res) => {
				if (res.ok) {
					return true
				} else {
					onFail(await res.text())
					return false
				}
			})
			if (!registerResult) return false
			let loginSuccessful = false,
				retryCount = 3
			while (!loginSuccessful && retryCount) {
				loginSuccessful = await user.login(userID, password, onFail)
				// loginSuccessful = await login();
				retryCount -= 1
			}
			if (!loginSuccessful) {
				onFail('[X] Failed to login to your new account')
			}
			return loginSuccessful
		},
	},
})
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