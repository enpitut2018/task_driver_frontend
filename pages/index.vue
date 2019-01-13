<template>
	<section class="intro">
		<div class="container">
			<div class="copy">
				<h1>Folivora</h1>
				<h2>続かない人のためのTODOアプリ</h2>
			</div>
			<ul>
				<li><a href="login"><button>ログイン</button></a></li>
				<li><a href="signup"><button>ユーザー登録</button></a></li>
			</ul>
		</div>
	</section>
</template>

<style lang="scss" scoped>
	.intro {
		background-image: url('/images/top_background.jpg');
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
        position: relative;
        z-index: 0;
        background-color: #666;
        min-height: 90vh;
        display: flex;
        align-items: center;
        &:before{
            content: '';
            background: inherit;
            -webkit-filter: blur(2px);
            -moz-filter: blur(2px);
            -o-filter: blur(2px);
            -ms-filter: blur(2px);
            filter: blur(2px);
            position: absolute;
            background-blend-mode: darken;
            /*ブラー効果で画像の端がボヤけた分だけ位置を調整*/
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            z-index: -1;/*重なり順序を一番下にしておく*/
        }
        .container {
        	width: 40vw;
        	margin: auto;
        	.copy {
        		margin: 0 0 60px 0;
        		h1, h2 {
	        		color: $white;
	        		text-align: center;
	        	}
	        	h1 {
	        		font-size: 60px;
	        		font-weight: 700;
	        		margin: 0 0 10px 0;
	        	}
	        	h2 {
	        		font-size: 28px;
	        		font-weight: 500;
	        	}
        	}
        	ul {
        		list-style: none;
        		display: flex;
        		justify-content: center;
        		width: 100%;
        		padding: 0;
        		li {
        			a {
        				text-decoration: none;
        				button {
        					font-weight: 500;
        					font-size: 16px;
        					letter-spacing: .1em;
        					padding: 10px 25px;
        					margin: 0 15px;
        					border-radius: 6px;
        					border: $white 1px solid;
        					color: $white;
        					background-color: rgba(0, 0, 0, 0);
        					&:hover {
        						background-color: $white;
        						color: #000;
        					}
        				}
        			}
        		}
        	}
        }
	}
</style>

<script>
export default {
    layout: 'unauthenticated'
}
</script>