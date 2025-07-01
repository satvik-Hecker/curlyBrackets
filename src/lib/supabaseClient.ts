import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://buwgpubilefposmqprgr.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1d2dwdWJpbGVmcG9zbXFwcmdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzMzM4MDEsImV4cCI6MjA2NjkwOTgwMX0.ltoC7TwmUDbEr_10NhushdoMhNkEA4jxVpVUY1gHRI0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
