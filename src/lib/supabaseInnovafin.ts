import { createClient } from '@supabase/supabase-js'

// Llaves de tu proyecto "Innovafin-Web" en Supabase
const supabaseUrl = 'https://otofmgziupyxcbroouku.supabase.co'
const supabaseAnonKey = 'sb_publishable_-M4oAyZOV5dxp-XNEy9QIA_LFWi2p4H'

export const supabaseInnovafin = createClient(supabaseUrl, supabaseAnonKey)