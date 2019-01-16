<template>
	<div class="card">
  	<h1>Twitterへリダイレクトしています</h1>
	</div>
</template>

<style lang="scss" scoped>
	.card {
		width: 40vw;
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
		form {
			padding: 15px 0 45px 0;
			border-bottom: 1px solid #bbb;
			.formContent {
				margin: 20px auto;
				width: 85%;
				span {
					font-weight: 400;
					font-size: 80%;
				}
				input {
					width: 100%;
					box-sizing: border-box;
					height: 40px;
					margin: 10px 0;
					font-size: 16px;
					border: none;
					border: 1px solid #bbb;
					border-radius: 3px;
					padding: 4px 8px;
					display: block;
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
		.passwordResetLink {
			margin: 30px 0 0 0;
			text-align: center;
			a {
				@include HoverLine();
				color: #777;
			}
		}
	}
</style>

<script>
    import gql from 'graphql-tag'
    // import moment from '~/plugins/moment'

    const getURLmutation = gql`
      mutation{
        createRedirecturlMutation{
          url
        }
      }`

    export default {
        data: () => ({
            params: {}
        }),
        mounted: function(){
          this.$apollo.mutate({
              mutation: getURLmutation
          }).then(res => {
              this.params = res.data;              
              console.log(this.params);
              window.location.href = this.params.createRedirecturlMutation.url
          }).catch(err => {
              console.log(err);
          });
        }
    }
</script>