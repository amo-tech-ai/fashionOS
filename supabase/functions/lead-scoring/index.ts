import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

const scoreWeights = {
  demographic: {
    title_executive: 20,
    title_manager: 15,
    title_director: 18,
    department_marketing: 10,
    department_sales: 8
  },
  firmographic: {
    company_size_enterprise: 25,
    company_size_mid: 15,
    revenue_high: 20,
    industry_match: 15
  },
  behavioral: {
    email_open: 5,
    email_click: 10,
    website_visit: 8,
    content_download: 15,
    event_attendance: 25,
    meeting_scheduled: 30
  },
  engagement: {
    response_time_fast: 10,
    interaction_frequency_high: 15,
    sentiment_positive: 20
  }
}
serve(async (req) => {
  try {
    const { contact_id } = await req.json()
    
    // Get contact details with account and interactions
    const { data: contact, error: contactError } = await supabase
      .from('contacts')
      .select(`
        *,
        accounts!account_id(*),
        interactions(*)
      `)
      .eq('id', contact_id)
      .single()
    
    if (contactError) throw contactError
    
    let totalScore = 0
    let scoringFactors = {
      demographic: 0,
      firmographic: 0,
      behavioral: 0,
      engagement: 0
    }
    
    // Calculate demographic score
    if (contact.title?.toLowerCase().includes('executive')) {
      scoringFactors.demographic += scoreWeights.demographic.title_executive
    } else if (contact.title?.toLowerCase().includes('director')) {
      scoringFactors.demographic += scoreWeights.demographic.title_director
    } else if (contact.title?.toLowerCase().includes('manager')) {
      scoringFactors.demographic += scoreWeights.demographic.title_manager
    }    
    if (contact.department?.toLowerCase() === 'marketing') {
      scoringFactors.demographic += scoreWeights.demographic.department_marketing
    } else if (contact.department?.toLowerCase() === 'sales') {
      scoringFactors.demographic += scoreWeights.demographic.department_sales
    }
    
    // Calculate firmographic score
    if (contact.accounts) {
      const account = contact.accounts
      if (account.company_size === '201-500' || account.company_size === '501-1000' || account.company_size === '1000+') {
        scoringFactors.firmographic += scoreWeights.firmographic.company_size_enterprise
      } else if (account.company_size === '51-200') {
        scoringFactors.firmographic += scoreWeights.firmographic.company_size_mid
      }
      
      if (account.industry?.toLowerCase().includes('fashion') || account.industry?.toLowerCase().includes('luxury')) {
        scoringFactors.firmographic += scoreWeights.firmographic.industry_match
      }
    }
    
    // Calculate behavioral score based on recent interactions
    if (contact.interactions && Array.isArray(contact.interactions)) {
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      const recentInteractions = contact.interactions.filter(
        (i: any) => new Date(i.interaction_date) > thirtyDaysAgo
      )
      
      recentInteractions.forEach((interaction: any) => {
        switch (interaction.interaction_type) {
          case 'meeting':
            scoringFactors.behavioral += scoreWeights.behavioral.meeting_scheduled
            break
          case 'event':
            scoringFactors.behavioral += scoreWeights.behavioral.event_attendance
            break
          case 'email':
            if (interaction.direction === 'inbound') {
              scoringFactors.behavioral += scoreWeights.behavioral.email_open
            }
            break
          default:
            scoringFactors.behavioral += 3
        }
      })
    }    
    // Calculate engagement score
    if (contact.interactions && Array.isArray(contact.interactions)) {
      const positiveInteractions = contact.interactions.filter(
        (i: any) => i.sentiment === 'positive'
      ).length
      
      const totalInteractions = contact.interactions.length
      
      if (positiveInteractions > 3) {
        scoringFactors.engagement += scoreWeights.engagement.sentiment_positive
      }
      
      if (totalInteractions > 5) {
        scoringFactors.engagement += scoreWeights.engagement.interaction_frequency_high
      }
    }
    
    // Calculate total score
    totalScore = Object.values(scoringFactors).reduce((a, b) => a + b, 0)
    
    // Update contact score
    const { error: updateError } = await supabase
      .from('contacts')
      .update({ 
        lead_score: totalScore,
        engagement_score: scoringFactors.engagement
      })
      .eq('id', contact_id)
    
    if (updateError) throw updateError
    
    // Log score history
    const { error: historyError } = await supabase
      .from('lead_scoring_history')
      .insert({
        contact_id,
        score: totalScore,
        previous_score: contact.lead_score || 0,
        score_change: totalScore - (contact.lead_score || 0),
        demographic_score: scoringFactors.demographic,
        firmographic_score: scoringFactors.firmographic,
        behavioral_score: scoringFactors.behavioral,
        engagement_score: scoringFactors.engagement,
        scoring_factors: scoringFactors,
        score_reason: `Automated scoring based on ${contact.interactions?.length || 0} interactions`
      })
    
    if (historyError) throw historyError
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        score: totalScore,
        factors: scoringFactors,
        previous_score: contact.lead_score || 0
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