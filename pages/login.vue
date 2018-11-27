<template>
  <div>
    <h1>Hello World</h1>
    <button @click="authenticate">Login</button>
  </div>
</template>

<script>
export default {
  methods: {
  	async authenticate () {
  		try {
  			await this.$auth.loginWith('local', {
  				data: {
  					user: {
  						email: 's1611442@u.tsukuba.ac.jp',
  						password: 'password'
  					}
  				}
  			})
  			this.$router.push('/login')
  		} catch (e) {
  			this.error = true
  		}
  	}
  },
};
</script>