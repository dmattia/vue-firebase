import Vue from "vue";

import components from "./components";

// TODO(dmattia): Do not auto load all components, but export a function to
Object.keys(components).forEach(name => {
  Vue.component(name, components[name]);
});

export default components;
