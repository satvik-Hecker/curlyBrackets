import { createClient } from '@supabase/supabase-js'
import { createBrowserClient } from '@supabase/ssr'


const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey, {

    global: {
    headers: {
      'Accept': 'application/json',
    },
  },
  
    auth:{
        autoRefreshToken: true,
        persistSession:true,
        detectSessionInUrl:true
    }
})
