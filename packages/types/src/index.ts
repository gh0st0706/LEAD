export interface UserSummary {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface HealthResponse {
  status: string;
  service: string;
  timestamp: string;
}
