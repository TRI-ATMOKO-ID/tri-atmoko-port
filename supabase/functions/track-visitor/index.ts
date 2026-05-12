import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    const { ip_address, device_name, location } = await req.json()

    // Insert visitor
    await supabase.from('visitors').insert({
      ip_address: ip_address || 'Unknown',
      device_name: device_name || 'Unknown',
      location: location || 'Unknown',
    })

    // Increment view counter
    const { data: counter } = await supabase
      .from('view_counter')
      .select('id, count')
      .limit(1)
      .single()

    if (counter) {
      await supabase
        .from('view_counter')
        .update({ count: counter.count + 1 })
        .eq('id', counter.id)
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
