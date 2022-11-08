<template>
  <div>
    <h1>Search</h1>
    <p>{{ $route.params.keyword }}</p>
  </div>
</template>

<script>
export default {
  name: 'my-search'
}
</script>

<style lang="less" scoped></style>
