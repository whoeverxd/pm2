import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

type LeadPayload = {
  name?: string;
  phone?: string;
  message?: string;
  source?: string;
  website?: string;
};

const json = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
    },
  });

const normalizeText = (value: string | undefined, maxLength: number) =>
  (value || '').trim().replace(/\s+/g, ' ').slice(0, maxLength);

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (request.method !== 'POST') {
    return json({ ok: false, error: 'Method not allowed' }, 405);
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

  if (!supabaseUrl || !serviceRoleKey) {
    return json({ ok: false, error: 'Missing Supabase server credentials' }, 500);
  }

  let payload: LeadPayload;

  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, error: 'Invalid JSON body' }, 400);
  }

  const honeypot = normalizeText(payload.website, 120);
  if (honeypot) {
    return json({ ok: false, error: 'Rejected' }, 400);
  }

  const name = normalizeText(payload.name, 120);
  const phone = normalizeText(payload.phone, 60);
  const message = normalizeText(payload.message, 1500);
  const source = normalizeText(payload.source, 80) || 'whatsapp_drawer';

  if (!name || !phone || !message) {
    return json({ ok: false, error: 'Missing required fields' }, 400);
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });

  const userAgent = request.headers.get('user-agent') || null;
  const forwardedFor = request.headers.get('x-forwarded-for') || '';
  const ip = forwardedFor.split(',')[0]?.trim() || null;

  const { data, error } = await supabase
    .from('leads')
    .insert({
      name,
      phone,
      message,
      source,
      user_agent: userAgent,
      ip,
    })
    .select('id')
    .single();

  if (error) {
    return json({ ok: false, error: 'Lead insert failed' }, 500);
  }

  return json({ ok: true, leadId: data.id });
});