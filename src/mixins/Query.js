export default {
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

  created() {
    if (!this.firebase) {
      console.err(
        "No FireProvider component was found in the component tree. ",
        "Please ensure you wrap any <Fire.*> components inside a <FireProvider>"
      );
    }
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
      if (query.isEqual(oldQuery)) {
        return;
      }

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
    }
  },

  computed: {
    query() {
      var query = this.firebase.database().ref();

      if (this.path.length) {
        query = query.child(this.path);
      }

      return query;
    }
  }
};
