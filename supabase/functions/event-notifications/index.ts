import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

serve(async (req) => {
  try {
    const { event_id, notification_type } = await req.json()
    
    // Get event details with planning info
    const { data: event, error: eventError } = await supabase
      .from('events')
      .select(`
        *,
        event_planning!inner(
          lead_organizer_id,
          venue_coordinator_id,
          vendor_manager_id,
          model_coordinator_id,
          sponsor_manager_id
        )
      `)
      .eq('id', event_id)
      .single()
    
    if (eventError) throw eventError
    
    // Determine recipients based on notification type
    let userIds: string[] = []
    let message = ''
    
    switch (notification_type) {
      case 'venue_update':
        userIds = [event.event_planning.venue_coordinator_id].filter(Boolean)
        message = 'Venue booking has been updated'
        break
      case 'vendor_update':
        userIds = [event.event_planning.vendor_manager_id].filter(Boolean)
        message = 'Vendor service has been updated'
        break
      case 'model_update':
        userIds = [event.event_planning.model_coordinator_id].filter(Boolean)
        message = 'Model booking has been updated'
        break
      case 'sponsor_update':
        userIds = [event.event_planning.sponsor_manager_id].filter(Boolean)
        message = 'Sponsor information has been updated'
        break
      default:
        userIds = [event.event_planning.lead_organizer_id].filter(Boolean)
        message = 'Event planning update'
    }
    
    // Create notifications for each user
    const notifications = userIds.map(userId => ({
      user_id: userId,
      type: notification_type,
      title: `Update for ${event.title}`,
      message: message,
      event_id: event_id,
      read: false,
      created_at: new Date().toISOString()
    }))
    
    if (notifications.length > 0) {
      const { error: notifError } = await supabase
        .from('notifications')
        .insert(notifications)
      
      if (notifError) throw notifError
    }
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        notifications_sent: notifications.length 
      }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }
})