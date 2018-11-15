<template>
  <div>
    <header class="globalHeader">
        <div class="headerLogo">
            <a href="/" class="homeLink">TaskDriver</a>
        </div>
        <nav class="headerNav">
            <ul>
                <li><a href="#">タスク一覧</a></li>
                <li><a href="#">活動サマリ</a></li>
                <li><a href="#">グループ</a></li>
                <li><a href="#">プロフィール</a></li>
                <li><a href="#">ログアウト</a></li>
            </ul>
        </nav>
    </header>
    <article>
      <div class="container">
        <nuxt/>
      </div>
    </article>
  </div>
</template>

<style lang="scss" scoped>
    .globalHeader {
        background-color: $red;
        padding: 12px 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .homeLink {
            color: $white;
            font-weight: 800;
            font-size: 30px;
            text-decoration: none;
        }
        .headerNav {
            ul {
                display: flex;
                list-style: none;
                li {
                    a {
                        color: $white;
                        text-decoration: none;
                        margin: 3px;
                        font-size: 15px;
                        font-weight: 600;
                    }
                }
            }
        }
    }
    .container {
        width: 1000px;
        margin: auto;
    }
</style>