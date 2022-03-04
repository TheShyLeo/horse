<template>
  <el-container class="home">
    <el-aside width="200px" class="Aside">Aside</el-aside>
    <el-main>Main</el-main>
  </el-container>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home'
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
.home {
  -webkit-app-region: drag;
  height: 100%;
  width: 100%;
  position: absolute;
  background: url("../assets/016.png");
}
.Aside {
  background: #EBEEF5;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
</style>
