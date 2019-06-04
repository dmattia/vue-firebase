<template>
  <div>
    <slot name="loading" v-if="loading"></slot>
    <slot name="error" :msg="errorMsg" v-else-if="errorMsg"></slot>
    <slot name="success" :data="data" v-else-if="data"></slot>
    <slot name="no-data" v-else></slot>
  </div>
</template>

<script>
export default {
  name: "FireQuery",

  inject: ["firebase"],

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
      this.ref = this.firebase.database().ref(this.path);

      if (this.shouldListen) {
        this.unsubscribeToListener = this.ref.on(
          "value",
          this.onSuccess,
          this.onError
        );
      } else {
        this.ref
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
    path() {
      if (this.unsubscribeToListener != null) {
        this.ref.off("value", this.unsubscribeToListener);
      }
      this.unsubscribeToListener = null;

      this.runQuery();
    }
  },

  props: {
    path: String,
    shouldListen: {
      type: Boolean,
      default: true
    }
  }
};
</script>
