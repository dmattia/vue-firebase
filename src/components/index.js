import authComponents from "./auth";
import databaseComponents from "./database";
import FireProvider from "./FireProvider.vue";

const components = {
  ...authComponents,
  ...databaseComponents,
  FireProvider
};

export default components;
