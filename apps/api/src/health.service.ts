export class HealthService {
  getHealth() {
    return {
      status: 'ok',
      service: 'lead-api',
      timestamp: new Date().toISOString(),
    };
  }
}
