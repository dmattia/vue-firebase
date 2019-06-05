<template>
  <div>
    <slot :data="data" :error="errorMsg" :loading="loading"></slot>
  </div>
</template>

<script>
import QueryMixin from "../mixins/Query";

export default {
  name: "FireObject",

  mixins: [QueryMixin],
};
</script>
