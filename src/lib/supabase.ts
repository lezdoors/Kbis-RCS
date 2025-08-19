import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bkmodcwaxxdhkjplnhue.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJrbW9kY3dheHhkaGtqcGxuaHVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1NjAyNjYsImV4cCI6MjA3MTEzNjI2Nn0.gxXUhc6ew36mYTTA047VneBiEO0ckbJ_5jQpCBiZnp0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);