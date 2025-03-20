// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import * as Sentry from "@sentry/node"

Sentry.init({
  dsn: "https://e48d975fa837dcb78b4d2aa06823c7eb@o4508999296548864.ingest.us.sentry.io/4508999301922816",
//   integrations : [
//     Sentry.mongooseIntegration()
//   ]
});