<template>
    <div class="container">
        <div class="card">
            <h1>Twitter連携</h1>
            <p>Twitterと連携すると、<br>あなたのタスクを応援してもらえます。</p>
            <button @click="redirectTwitter" class="loginButton" type="submit">連携する</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>

.container {
    width: 1000px;
    margin: auto;
    h1 {
        margin: 25px 0;
    }
	.card {
		width: 30vw;
		margin: 90px auto;
		padding: 50px 60px;
		border-radius: 3px;
		border: 1px solid $borderColor;
		background-color: $cardBackgroundColor;
		h1 {
			width: 100%;
			letter-spacing: .1em;
			text-align: center;
		}
    }
    .loginButton {
        background-color: $startButtonColor;
        width: 70%;
        height: 40px;
        margin: auto;
        border-radius: 5px;
        font-size: 15px;
        font-weight: 600;
        letter-spacing: .2em;
        color: $white;
        padding: 5px 0;
        display: block;
        @include buttonReflect($startButtonColor, $white);
    }
}

</style>

<script>
export default {
        data() {
            return {
                
            }
        },
        components: {

        },

        methods: {
            redirectTwitter(){
                window.location.href = "/oauth/redirect"
            }
        },
        computed: {

        },
        mounted: function() {
            if (this.$store.state.auth.isAuthenticated == false) {
                this.$router.push('/home')
            }
		}
}
</script>