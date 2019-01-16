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
		state.isAuthenticated = false
		state.token = null
		state.user = null
	}
}

export const actions = {
	async login (context, user) {
		let token = ''
		let userInfo = {}
		await this.$axios.$post('/sign_in', {
			user: {
				email: 'test@example.com',
				password: 'password'
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
		await this.$axios.$delete('sign_out', {
			headers: {
				'Authorization': 'Bearer ' + context.state.token
			}
		}).then(res => {
			context.commit('logout')
		}).catch(err => {
			return false
		})
	}
}