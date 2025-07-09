import { http, HttpResponse } from 'msw';

export const handlers = [
  // Mock user account endpoint
  http.get('/api/account', () => {
    return HttpResponse.json({
      id: 1,
      email: 'demo@bytechef.io',
      name: 'Demo User',
      authorities: ['ROLE_USER'],
      authenticated: true
    });
  }),

  // Mock application info
  http.get('/actuator/info', () => {
    return HttpResponse.json({
      app: {
        name: 'ByteChef',
        version: '1.0.0',
        environment: 'development'
      },
      ai: {
        copilot: {
          enabled: true
        }
      }
    });
  }),

  // Mock feature flags
  http.get('/api/feature-flags', () => {
    return HttpResponse.json({
      'ff-1023': true,
      'ff-1779': true,
      'ff-2445': true
    });
  }),

  // Mock health check
  http.get('/actuator/health', () => {
    return HttpResponse.json({
      status: 'UP'
    });
  })
];
