// Mock Supabase client for offline development
import type { Database } from './types';

// Mock query builder class
class MockQueryBuilder {
  private data: any;
  
  constructor(data: any = []) {
    this.data = data;
  }
  
  eq(column: string, value: any) {
    return new MockQueryBuilder(this.data);
  }
  
  select(columns?: string) {
    return new MockQueryBuilder(this.data);
  }
  
  single() {
    return Promise.resolve({ data: null, error: null });
  }
  
  order(column: string, options?: any) {
    return new MockQueryBuilder(this.data);
  }
  
  then(onResolve: any, onReject?: any) {
    return Promise.resolve({ data: this.data, error: null }).then(onResolve, onReject);
  }
}

// Mock auth object
const mockAuth = {
  getSession: () => Promise.resolve({ data: { session: null }, error: null }),
  getUser: () => Promise.resolve({ data: { user: null }, error: null }),
  signInWithOtp: (credentials: any) => Promise.resolve({ data: {}, error: null }),
  signOut: () => Promise.resolve({ error: null }),
  onAuthStateChange: (callback: any) => {
    // Return a mock subscription
    return { data: { subscription: { unsubscribe: () => {} } } };
  }
};

// Mock database operations
const mockFrom = (table: string) => ({
  select: (columns?: string) => new MockQueryBuilder([]),
  insert: (data: any) => Promise.resolve({ data: null, error: null }),
  update: (data: any) => new MockQueryBuilder([]),
  delete: () => new MockQueryBuilder([]),
  upsert: (data: any) => Promise.resolve({ data: null, error: null })
});

// Mock Supabase client
export const supabase = {
  auth: mockAuth,
  from: mockFrom,
  functions: {
    invoke: (functionName: string, options?: any) => Promise.resolve({ data: null, error: null })
  }
};