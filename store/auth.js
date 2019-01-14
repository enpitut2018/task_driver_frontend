export const state = () => ({
	isAuthenticated: false,
	token: null,
	user: null,
})

export const getters = {
	isAuthenticated: (state) => state.isAuthenticated,
	user: (state) => state.user,
}

export const mutations = {
	setToken (state, token) {
		state.token = token
	},
	setUser (state, user) {
		state.user = user
		state.isAuthenticated = true
	},
	logout (state) {
		state.token = null
		state.user = null
		state.isAuthenticated = false
	}
}

export const actions = {
	async login (context, user) {
		let token = ''
		let userInfo = {}
		await this.$axios.$post('/sign_in', {
			user: {
				email: user.email,
				password: user.password
			}
		}).then(res => {
			token = res.token
			context.commit('setToken', token)
		}).catch(err => {
			return false
		})
		await this.$axios.$get('/user', {
			headers: {
				'Authorization': 'Bearer ' + token 
			}
		}).then(res => {
			userInfo = res.user
			context.commit('setUser', userInfo)
		}).catch(err => {
			return false
		})
	},

	async logout (context) {
		await this.$axois.$delete('sign_out', {
			headers: {
				'Authorization': 'Bearer ' + token.token
			}
		}).then(res => {
			context.commit('logout')
		}).catch(err => {
			return false
		})
	},

	async sign_up (context, user) {
		let token = ''
		let userInfo = {}
		
		await this.$axios.$post('/sign_up', {
			user: {
				email: user.email,
				password: user.password
			}
		}).then(res => {

		}).catch(err => {
			return false
		})
	},

	async confirm (context, confirmation) {
		let token = ''
		let userInfo = {}
		
		await this.$axios.$post('/confirm', {
			confirmation: {
				confirmation_token: confirmation.confirmation_token,
				username: confirmation.username
			}
		}).then(res => {
			
		}).catch(err => {
			return false
		})
	},
	async sendresetmail (context, user) {
		let token = ''
		let userInfo = {}

		await this.$axios.$post('/password', {
			user: {
				email: user.email,
			}
		}).then(res => {

		}).catch(err => {
			return false
		})
	},
	async reset (context, user) {
		let token = ''
		let userInfo = {}

		await this.$axios.$post('/reset', {
			user: {
				password: user.password,
				reset_password_token: user.reset_password_token
			}
		}).then(res => {

		}).catch(err => {
			return false
		})
	}
}