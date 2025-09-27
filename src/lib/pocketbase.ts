import PocketBase from 'pocketbase';

// Initialize PocketBase client
export const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_URL || 'http://127.0.0.1:8090');

// Collection names
export const Collections = {
  EVENTS: 'events',
  COMPETITIONS: 'competitions',
  TEAMS: 'teams',
  ATHLETES: 'athletes',
  RESULTS: 'results',
  JUDGES: 'judges',
  START_LISTS: 'start_lists',
  DOCUMENTS: 'documents',
  NOTIFICATIONS: 'notifications',
  USERS: 'users',
  TEMPLATES: 'templates',
} as const;

// Auth helpers
export const authHelpers = {
  getCurrentUser: () => pb.authStore.model,
  isAuthenticated: () => pb.authStore.isValid,
  logout: () => pb.authStore.clear(),
  
  login: async (email: string, password: string) => {
    return await pb.collection(Collections.USERS).authWithPassword(email, password);
  },
  
  register: async (userData: {
    email: string;
    password: string;
    passwordConfirm: string;
    firstName: string;
    lastName: string;
    role: string;
    organization?: string;
  }) => {
    return await pb.collection(Collections.USERS).create(userData);
  },
  
  refreshAuth: async () => {
    if (pb.authStore.isValid) {
      try {
        await pb.collection(Collections.USERS).authRefresh();
      } catch (error) {
        pb.authStore.clear();
      }
    }
  }
};

// Real-time subscriptions helpers
export const subscriptionHelpers = {
  subscribeToResults: (eventId: string, callback: (data: any) => void) => {
    return pb.collection(Collections.RESULTS).subscribe('*', callback, {
      filter: `eventId = "${eventId}"`
    });
  },
  
  subscribeToStartLists: (competitionId: string, callback: (data: any) => void) => {
    return pb.collection(Collections.START_LISTS).subscribe('*', callback, {
      filter: `competitionId = "${competitionId}"`
    });
  },
  
  unsubscribe: (subscription: any) => {
    if (subscription) {
      pb.unsubscribe(subscription);
    }
  }
};

// Offline support helpers
export const offlineHelpers = {
  saveOfflineResult: (result: any) => {
    const offlineResults = JSON.parse(localStorage.getItem('offlineResults') || '[]');
    offlineResults.push({
      ...result,
      timestamp: Date.now(),
      synced: false
    });
    localStorage.setItem('offlineResults', JSON.stringify(offlineResults));
  },
  
  getOfflineResults: () => {
    return JSON.parse(localStorage.getItem('offlineResults') || '[]');
  },
  
  syncOfflineResults: async () => {
    const offlineResults = offlineHelpers.getOfflineResults();
    const syncedResults = [];
    
    for (const result of offlineResults) {
      if (!result.synced) {
        try {
          await pb.collection(Collections.RESULTS).create(result);
          result.synced = true;
          syncedResults.push(result);
        } catch (error) {
          console.error('Failed to sync result:', error);
        }
      }
    }
    
    if (syncedResults.length > 0) {
      localStorage.setItem('offlineResults', JSON.stringify(offlineResults));
    }
    
    return syncedResults;
  },
  
  clearSyncedResults: () => {
    const offlineResults = offlineHelpers.getOfflineResults();
    const unsyncedResults = offlineResults.filter((result: any) => !result.synced);
    localStorage.setItem('offlineResults', JSON.stringify(unsyncedResults));
  }
};

export default pb;