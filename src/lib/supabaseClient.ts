import { createClient } from '@supabase/supabase-js';

    const supabaseUrl = 'https://ixwnerclijeyrcasqygt.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4d25lcmNsaWpleXJjYXNxeWd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY4NzkyMTMsImV4cCI6MjA1MjQ1NTIxM30.JyvJRO78dN3s_2Tf3q7P3lenbNgVMeSssZTZ0T_G-FM';

    export const supabase = createClient(supabaseUrl, supabaseKey);
