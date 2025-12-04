// config/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wjvdmiiyyyknwlfwrdmw.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNudW5zcm96dGxpdHdxdHJrYm11Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ1OTY3NDgsImV4cCI6MjA4MDE3Mjc0OH0.cZQJ6FpPyNRSzcqpl373w3oqFvwdmB2zJeJ06ipfpgI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
