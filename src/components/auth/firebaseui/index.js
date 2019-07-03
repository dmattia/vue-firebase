import providerComponents from "./providers";
import AuthUi from "./AuthUi.vue";
import OAuthParam from "./OAuthParam.vue";
import Scope from "./Scope.vue";

const components = {
  ...providerComponents,
  AuthUi,
  OAuthParam,
  Scope
};

export default components;
