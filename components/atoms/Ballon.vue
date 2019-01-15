<template>
    <!-- <div>
        <p class="card">
            <br>
        </p>
    </div> -->
    <div class="card">
        <div class="cardHeader">
            <h3>
                <nuxt-link :to="{ name: 'userid-groupid', params: { userid: group.userId, groupid: group.id }}" class="cardLink">{{group.name}}</nuxt-link>
            </h3>
        </div>

        <div class="cardBody">
            <p>{{group.note}}</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
body {
  background: #efefef;
}
.input-balloon {
//   position: relative;
  position: absolute;
  padding: 20px;
  background: #fff;
  z-index: 99;
  width: 20vw;
}

.backdrop {
  opacity: 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

.card {
    position: absolute;
    margin: 16px 12px;
    padding: 12px 30px 18px 30px;
    border-radius: 3px;
    border: 1px solid $borderColor;
    background-color: $cardBackgroundColor;
    .cardHeader {
        font-size: 18px;
        margin: 8px 0;
        .cardLink {
            color: $textColor;
            @include HoverLine();
        }
        .stars {
            font-size: 60%;
            margin-left: 5px;
            color: $starColor;
        }
    }
    .tags {
        width: 100%;
        margin: 8px 0;
        display: inline-flex;
        justify-content: flex-end;
    }
}
</style>

<script>
    export default {
        props:['group']
    }
</script>