<template>
  <div>
    <slot :data="data" :error="errorMsg" :loading="loading"></slot>
  </div>
</template>

<script>
export default {
  name: "Query",

  inject: ["firebaseApp"],

  data() {
    return {
      data: null,
      errorMsg: null,
      loading: true,
      unsubscribeToListener: null,
      ref: null
    };
  },

  methods: {
    runQuery() {
      this.loading = true;

      if (this.shouldListen) {
        this.unsubscribeToListener = this.query.on(
          "value",
          this.onSuccess,
          this.onError
        );
      } else {
        this.query
          .once("value")
          .then(this.onSuccess)
          .catch(this.onError);
      }
    },

    onSuccess(snapshot) {
      if (snapshot === undefined) {
        this.onError(null);
        return;
      }

      this.data = snapshot.val();
      this.loading = false;
    },

    onError(error) {
      this.errorMsg = error;
      this.loading = false;
    }
  },

  mounted() {
    this.runQuery();
  },

  watch: {
    query(query, oldQuery) {
      if (query.isEqual(oldQuery)) return;

      if (oldQuery) {
        oldQuery.off("value", this.unsubscribeToListener);
      }

      this.runQuery();
    }
  },

  props: {
    path: {
      type: String,
      required: true
    },

    shouldListen: {
      type: Boolean,
      default: true
    },

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
    },

    asObject: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    query() {
      let query = this.firebaseApp.database().ref();

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
