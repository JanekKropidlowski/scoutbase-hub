export type UserRole = 'team' | 'judge' | 'office' | 'admin' | 'superadmin';

export type CompetitionType = 'shooting' | 'grenade_throw' | 'cross_country';

export type CompetitionStatus = 'draft' | 'open' | 'closed' | 'in_progress' | 'completed';

export type RegistrationStatus = 'draft' | 'submitted' | 'accepted' | 'rejected';

export type AthleteCategory = 'junior' | 'senior';

export type Gender = 'male' | 'female';

// Core Event Structure
export interface Event {
  id: string;
  name: string;
  description: string;
  organizer: string;
  location: string;
  startDate: string;
  endDate: string;
  registrationDeadline: string;
  maxTeams?: number;
  status: CompetitionStatus;
  competitions: Competition[];
  scoringRules: ScoringRules;
  branding?: EventBranding;
  createdAt: string;
  updatedAt: string;
}

export interface Competition {
  id: string;
  eventId: string;
  name: string;
  type: CompetitionType;
  description: string;
  rules: string;
  maxParticipants?: number;
  categories: AthleteCategory[];
  genders: Gender[];
  scoringType: 'points' | 'time' | 'distance';
  scoringRules: CompetitionScoringRules;
  status: CompetitionStatus;
  startTime?: string;
  judgeId?: string;
}

// Team and Athlete Management
export interface Team {
  id: string;
  eventId: string;
  name: string;
  organization: string; // szkoła, województwo, koło, klub
  region?: string;
  coach: TeamCoach;
  athletes: Athlete[];
  registrationStatus: RegistrationStatus;
  documents: TeamDocument[];
  registeredAt: string;
  verifiedAt?: string;
  startNumber?: number;
}

export interface Athlete {
  id: string;
  teamId: string;
  firstName: string;
  lastName: string;
  birthYear: number;
  category: AthleteCategory;
  gender: Gender;
  competitionIds: string[];
  startNumber?: number;
  results: AthleteResult[];
}

export interface TeamCoach {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface TeamDocument {
  id: string;
  type: 'rodo_consent' | 'health_declaration' | 'other';
  fileName: string;
  fileUrl: string;
  uploadedAt: string;
  verified: boolean;
}

// Scoring and Results
export interface ScoringRules {
  teamPointsDistribution: number[]; // [15, 13, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1...]
  tieBreakingRules: TieBreakingRule[];
}

export interface CompetitionScoringRules {
  pointsSystem?: PointsSystem;
  timeSystem?: TimeSystem;
  distanceSystem?: DistanceSystem;
}

export interface PointsSystem {
  maxPoints: number;
  zones?: ScoringZone[]; // for grenade throw
}

export interface ScoringZone {
  name: string;
  points: number;
  description?: string;
}

export interface TimeSystem {
  format: 'mm:ss' | 'mm:ss.SSS';
  ascending: boolean; // true for fastest wins
}

export interface DistanceSystem {
  unit: 'meters' | 'centimeters';
  ascending: boolean; // true for furthest wins
}

export interface TieBreakingRule {
  priority: number;
  criteria: 'best_result_in_competition' | 'manual_measurement' | 'draw';
  competitionId?: string;
}

export interface AthleteResult {
  id: string;
  athleteId: string;
  competitionId: string;
  judgeId?: string;
  value: number | string; // points, time in seconds, distance in meters, etc.
  position?: number;
  teamPoints?: number;
  status: 'active' | 'dns' | 'dq' | 'dnf'; // DNS = Did Not Start, DQ = Disqualified, DNF = Did Not Finish
  penalties?: Penalty[];
  notes?: string;
  recordedAt: string;
  verifiedAt?: string;
}

export interface Penalty {
  type: string;
  points: number;
  description: string;
}

// Classifications
export interface IndividualClassification {
  position: number;
  athleteId: string;
  athlete: Athlete;
  team: Team;
  totalPoints: number;
  results: AthleteResult[];
}

export interface TeamClassification {
  position: number;
  teamId: string;
  team: Team;
  totalPoints: number;
  athleteResults: Array<{
    athlete: Athlete;
    results: AthleteResult[];
    points: number;
  }>;
}

// Judge and Office Management
export interface Judge {
  id: string;
  userId: string;
  eventId: string;
  competitionIds: string[];
  firstName: string;
  lastName: string;
  email: string;
  assignedAt: string;
}

export interface StartList {
  id: string;
  competitionId: string;
  athletes: StartListEntry[];
  generatedAt: string;
  published: boolean;
}

export interface StartListEntry {
  startNumber: number;
  athleteId: string;
  athlete: Athlete;
  team: Team;
  lane?: number;
  startTime?: string;
  present: boolean;
}

// System Configuration
export interface EventBranding {
  logo?: string;
  primaryColor: string;
  secondaryColor: string;
  headerImage?: string;
}

// Document Templates
export interface DocumentTemplate {
  id: string;
  name: string;
  type: 'start_list' | 'results_protocol' | 'diploma' | 'certificate';
  template: string; // HTML template
  variables: string[]; // Available template variables
}

// Public View Models
export interface PublicEventInfo {
  id: string;
  name: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  competitions: Array<{
    id: string;
    name: string;
    type: CompetitionType;
    status: CompetitionStatus;
    startTime?: string;
  }>;
  schedule: EventSchedule[];
  regulations?: string;
  branding?: EventBranding;
}

export interface EventSchedule {
  time: string;
  competition: string;
  location: string;
  description?: string;
}

// Notification System
export interface Notification {
  id: string;
  eventId?: string;
  recipientType: 'all' | 'teams' | 'judges' | 'office';
  recipientIds?: string[];
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  channels: ('email' | 'sms' | 'push')[];
  scheduledAt?: string;
  sentAt?: string;
}