<template>
  <li>
    <slot></slot>
  </li>
</template>
<script>
  export default {
    name: 'my-li',
    data() {
      return {

      }
    }
  }
</script>

<style scoped>
 li{
    width: 33.3333%;
    float: left;
    height:20%;
    line-height: 218px;   
    text-align: center;
    position: relative;
  }
</style>
