import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://iyywnrcsacwhnpktekvd.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5eXducmNzYWN3aG5wa3Rla3ZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2NjQ3NzQsImV4cCI6MjA5MTI0MDc3NH0.TADVV6MvcJ2QQo4-gFrl-ATGRFXP00I7IgD1CqkevVs'
)