import { createRegistrationHandler } from './registration-handler.mjs';

export function registrationApi(env) {
  const handler = createRegistrationHandler({ env });
  return {
    name: 'registration-api',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url?.split('?')[0] !== '/api/registrations') return next();
        void handler(req, res);
      });
    },
  };
}

