import { setupGlobDirectives } from 'src/directives/index';

import { defineBoot } from '#q-app/wrappers';

export default defineBoot(({ app }) => {
  setupGlobDirectives(app);
});
