<template>
  <div class="fireList">
    <slot :data="data" :error="errorMsg" :loading="loading"></slot>
  </div>
</template>

<script>
import QueryMixin from "../mixins/Query";

export default {
  name: "FireList",

  mixins: [QueryMixin],

  props: {
    endAt: {
      type: [Boolean, Number, String],
      default: null
    },
    startAt: {
      type: [Boolean, Number, String],
      default: null
    },
    equalTo: {
      type: [Boolean, Number, String],
      default: null
    },
    limitToFirst: {
      type: Number,
      default: null
    },
    limitToLast: {
      type: Number,
      default: null
    },
    orderByChild: {
      type: String,
      default: null
    },
    orderByKey: {
      type: Boolean,
      default: false
    },
    orderByValue: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    query() {
      let query = this.firebase.database().ref();

      if (this.path) {
        query = query.child(this.path);
      }

      if (this.orderByKey) {
        query = query.orderByKey();
      }

      if (this.orderByValue) {
        query = query.orderByValue();
      }

      if (this.orderByChild !== null) {
        query = query.orderByChild(this.orderByChild);
      }

      if (this.equalTo !== null) {
        query = query.equalTo(this.equalTo);
      }

      if (this.limitToFirst !== null) {
        query = query.limitToFirst(this.limitToFirst);
      }

      if (this.limitToLast !== null) {
        query = query.limitToLast(this.limitToLast);
      }

      if (this.startAt !== null) {
        query = query.startAt(this.startAt);
      }

      if (this.endAt !== null) {
        query = query.endAt(this.startAt);
      }

      return query;
    }
  }
};
</script>
