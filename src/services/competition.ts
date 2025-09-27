import { pb, Collections } from '@/lib/pocketbase';
import type { Event, Competition, Team, Athlete, AthleteResult, StartList, Judge } from '@/types/competition';

export class EventService {
  // Event Management
  static async createEvent(eventData: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>): Promise<Event> {
    const record = await pb.collection(Collections.EVENTS).create({
      ...eventData,
      competitions: JSON.stringify(eventData.competitions),
      scoringRules: JSON.stringify(eventData.scoringRules),
      branding: JSON.stringify(eventData.branding)
    });
    
    return this.parseEventRecord(record);
  }
  
  static async getEvent(id: string): Promise<Event> {
    const record = await pb.collection(Collections.EVENTS).getOne(id, {
      expand: 'competitions,teams'
    });
    
    return this.parseEventRecord(record);
  }
  
  static async updateEvent(id: string, eventData: Partial<Event>): Promise<Event> {
    const updateData: any = { ...eventData };
    
    if (eventData.competitions) {
      updateData.competitions = JSON.stringify(eventData.competitions);
    }
    if (eventData.scoringRules) {
      updateData.scoringRules = JSON.stringify(eventData.scoringRules);
    }
    if (eventData.branding) {
      updateData.branding = JSON.stringify(eventData.branding);
    }
    
    const record = await pb.collection(Collections.EVENTS).update(id, updateData);
    return this.parseEventRecord(record);
  }
  
  static async deleteEvent(id: string): Promise<void> {
    await pb.collection(Collections.EVENTS).delete(id);
  }
  
  static async listEvents(page = 1, perPage = 20, filter = ''): Promise<{ events: Event[], totalItems: number }> {
    const result = await pb.collection(Collections.EVENTS).getList(page, perPage, {
      filter,
      sort: '-created'
    });
    
    return {
      events: result.items.map(this.parseEventRecord),
      totalItems: result.totalItems
    };
  }
  
  static async cloneEvent(sourceId: string, newEventData: Partial<Event>): Promise<Event> {
    const sourceEvent = await this.getEvent(sourceId);
    
    const clonedEvent = await this.createEvent({
      ...sourceEvent,
      ...newEventData,
      id: undefined as any,
      status: 'draft',
      createdAt: undefined as any,
      updatedAt: undefined as any
    });
    
    return clonedEvent;
  }
  
  private static parseEventRecord(record: any): Event {
    return {
      ...record,
      competitions: JSON.parse(record.competitions || '[]'),
      scoringRules: JSON.parse(record.scoringRules || '{}'),
      branding: JSON.parse(record.branding || '{}')
    };
  }
}

export class TeamService {
  // Team Registration
  static async registerTeam(teamData: Omit<Team, 'id' | 'registeredAt'>): Promise<Team> {
    const record = await pb.collection(Collections.TEAMS).create({
      ...teamData,
      coach: JSON.stringify(teamData.coach),
      athletes: JSON.stringify(teamData.athletes),
      documents: JSON.stringify(teamData.documents)
    });
    
    return this.parseTeamRecord(record);
  }
  
  static async updateTeam(id: string, teamData: Partial<Team>): Promise<Team> {
    const updateData: any = { ...teamData };
    
    if (teamData.coach) {
      updateData.coach = JSON.stringify(teamData.coach);
    }
    if (teamData.athletes) {
      updateData.athletes = JSON.stringify(teamData.athletes);
    }
    if (teamData.documents) {
      updateData.documents = JSON.stringify(teamData.documents);
    }
    
    const record = await pb.collection(Collections.TEAMS).update(id, updateData);
    return this.parseTeamRecord(record);
  }
  
  static async getTeam(id: string): Promise<Team> {
    const record = await pb.collection(Collections.TEAMS).getOne(id);
    return this.parseTeamRecord(record);
  }
  
  static async getEventTeams(eventId: string): Promise<Team[]> {
    const result = await pb.collection(Collections.TEAMS).getFullList({
      filter: `eventId = "${eventId}"`,
      sort: 'name'
    });
    
    return result.map(this.parseTeamRecord);
  }
  
  static async verifyTeam(id: string, verified: boolean): Promise<Team> {
    const record = await pb.collection(Collections.TEAMS).update(id, {
      registrationStatus: verified ? 'accepted' : 'rejected',
      verifiedAt: verified ? new Date().toISOString() : null
    });
    
    return this.parseTeamRecord(record);
  }
  
  private static parseTeamRecord(record: any): Team {
    return {
      ...record,
      coach: JSON.parse(record.coach || '{}'),
      athletes: JSON.parse(record.athletes || '[]'),
      documents: JSON.parse(record.documents || '[]')
    };
  }
}

export class ResultService {
  // Result Management
  static async recordResult(resultData: Omit<AthleteResult, 'id' | 'recordedAt'>): Promise<AthleteResult> {
    const record = await pb.collection(Collections.RESULTS).create({
      ...resultData,
      penalties: JSON.stringify(resultData.penalties || [])
    });
    
    return this.parseResultRecord(record);
  }
  
  static async updateResult(id: string, resultData: Partial<AthleteResult>): Promise<AthleteResult> {
    const updateData: any = { ...resultData };
    
    if (resultData.penalties) {
      updateData.penalties = JSON.stringify(resultData.penalties);
    }
    
    const record = await pb.collection(Collections.RESULTS).update(id, updateData);
    return this.parseResultRecord(record);
  }
  
  static async getCompetitionResults(competitionId: string): Promise<AthleteResult[]> {
    const result = await pb.collection(Collections.RESULTS).getFullList({
      filter: `competitionId = "${competitionId}"`,
      sort: 'recordedAt',
      expand: 'athleteId,judgeId'
    });
    
    return result.map(this.parseResultRecord);
  }
  
  static async getAthleteResults(athleteId: string): Promise<AthleteResult[]> {
    const result = await pb.collection(Collections.RESULTS).getFullList({
      filter: `athleteId = "${athleteId}"`,
      sort: 'recordedAt'
    });
    
    return result.map(this.parseResultRecord);
  }
  
  static async calculateClassifications(eventId: string) {
    // This would be implemented with complex calculation logic
    // For now, returning placeholder
    return {
      individualClassifications: [],
      teamClassifications: []
    };
  }
  
  private static parseResultRecord(record: any): AthleteResult {
    return {
      ...record,
      penalties: JSON.parse(record.penalties || '[]')
    };
  }
}

export class JudgeService {
  // Judge Management
  static async assignJudge(judgeData: Omit<Judge, 'id' | 'assignedAt'>): Promise<Judge> {
    const record = await pb.collection(Collections.JUDGES).create({
      ...judgeData,
      competitionIds: JSON.stringify(judgeData.competitionIds)
    });
    
    return this.parseJudgeRecord(record);
  }
  
  static async getEventJudges(eventId: string): Promise<Judge[]> {
    const result = await pb.collection(Collections.JUDGES).getFullList({
      filter: `eventId = "${eventId}"`,
      sort: 'lastName,firstName'
    });
    
    return result.map(this.parseJudgeRecord);
  }
  
  static async getJudgeCompetitions(judgeId: string): Promise<Competition[]> {
    const judge = await pb.collection(Collections.JUDGES).getOne(judgeId);
    const competitionIds = JSON.parse(judge.competitionIds || '[]');
    
    if (competitionIds.length === 0) return [];
    
    const result = await pb.collection(Collections.COMPETITIONS).getFullList({
      filter: competitionIds.map((id: string) => `id = "${id}"`).join(' || ')
    });
    
    return result;
  }
  
  private static parseJudgeRecord(record: any): Judge {
    return {
      ...record,
      competitionIds: JSON.parse(record.competitionIds || '[]')
    };
  }
}

export class StartListService {
  // Start List Management
  static async generateStartList(competitionId: string, athletes: Athlete[]): Promise<StartList> {
    const startListEntries = athletes.map((athlete, index) => ({
      startNumber: index + 1,
      athleteId: athlete.id,
      athlete,
      team: {} as Team, // Would be populated from relation
      present: false
    }));
    
    const record = await pb.collection(Collections.START_LISTS).create({
      competitionId,
      athletes: JSON.stringify(startListEntries),
      published: false
    });
    
    return this.parseStartListRecord(record);
  }
  
  static async publishStartList(id: string): Promise<StartList> {
    const record = await pb.collection(Collections.START_LISTS).update(id, {
      published: true
    });
    
    return this.parseStartListRecord(record);
  }
  
  static async getCompetitionStartList(competitionId: string): Promise<StartList | null> {
    try {
      const record = await pb.collection(Collections.START_LISTS).getFirstListItem(`competitionId = "${competitionId}"`);
      return this.parseStartListRecord(record);
    } catch {
      return null;
    }
  }
  
  private static parseStartListRecord(record: any): StartList {
    return {
      ...record,
      athletes: JSON.parse(record.athletes || '[]')
    };
  }
}