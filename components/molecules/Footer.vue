<template>
	<footer>
		<div class="container">
			<section class="footer-top">
				<div class="footerLogo">
					Folivora
				</div>
				<nav class="footerNav">
					<ul>
						<li><a href="/privacy">プライバシーポリシー</a></li>
						<li><a href="/terms">利用規約</a></li>
					</ul>
				</nav>
			</section>
			<section class="footerBottom">
				<p>お問い合わせ：<a href="mailto:support@folivora.sukiyaki.party">support@folivora.sukiyaki.party</a></p>
			</section>
			<section class="footerCopyright">
				<p class="copyright">&copy;†TaskDragonKnight†</p>
			</section>
		</div>
	</footer>
</template>

<style lang="scss" scoped>
	footer {
		background-color: #777;
		padding: 10px 0;
		.container {
			width: 1000px;
			margin: auto;
			section {
				display: flex;
				justify-content: space-between;
				align-items: flex-end;
				margin: 5px 0;
				.footerLogo {
					color: $white;
					font-weight: 500;
					font-size: 35px;
				}
				.footerNav {
					ul {
						display: flex;
						list-style: none;
						li {
							padding: 5px 3px;
							a {
								color: $white;
								margin: 3px;
								font-size: 15px;
								@include HoverLine(underline, none);
							}
						}
					}
				}
				&.footerBottom, &.footerCopyright {
					flex-direction: row-reverse;
				}
				p {
					color: $white;
					text-align: right;
					&.copyright {
						font-size: 90%;
						font-weight: 300;
					}
					a {
						@include HoverLine();
						color: $white;
					}
				}
			}
		}
	}
</style>