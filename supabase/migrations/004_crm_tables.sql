-- Migration: Create CRM Tables
-- Description: Complete CRM infrastructure

-- 1. Contacts table (individuals at companies)
CREATE TABLE IF NOT EXISTS contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Personal information
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    title VARCHAR(100),
    department VARCHAR(100),
    
    -- Contact details
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    mobile VARCHAR(50),
    linkedin_url TEXT,
    
    -- Company association
    account_id UUID, -- Will reference accounts table
    is_primary_contact BOOLEAN DEFAULT false,
    
    -- Relationship details
    contact_type VARCHAR(50) CHECK (contact_type IN 
        ('sponsor', 'vendor', 'media', 'designer', 'influencer', 'partner')),
    influence_level VARCHAR(20) CHECK (influence_level IN 
        ('decision_maker', 'influencer', 'user', 'gatekeeper')),
    
    -- Engagement tracking
    last_interaction_date DATE,
    interaction_count INTEGER DEFAULT 0,
    engagement_score INTEGER DEFAULT 50,    
    -- Preferences
    communication_preference VARCHAR(20) CHECK (communication_preference IN 
        ('email', 'phone', 'whatsapp', 'linkedin')),
    preferred_language VARCHAR(10) DEFAULT 'en',
    timezone VARCHAR(50) DEFAULT 'America/Toronto',
    
    -- Lead information
    lead_source VARCHAR(100),
    lead_status VARCHAR(50) DEFAULT 'new' CHECK (lead_status IN 
        ('new', 'contacted', 'qualified', 'unqualified', 'customer', 'lost')),
    lead_score INTEGER DEFAULT 0,
    
    -- Metadata
    tags TEXT[],
    notes TEXT,
    created_by UUID REFERENCES users(id),
    assigned_to UUID REFERENCES users(id),
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_contacts_account ON contacts(account_id);
CREATE INDEX idx_contacts_email ON contacts(email);
CREATE INDEX idx_contacts_status ON contacts(lead_status);
CREATE INDEX idx_contacts_assigned ON contacts(assigned_to);
-- 2. Accounts table (companies/organizations)
CREATE TABLE IF NOT EXISTS accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Company information
    company_name VARCHAR(255) NOT NULL,
    legal_name VARCHAR(255),
    website VARCHAR(255),
    
    -- Classification
    account_type VARCHAR(50) CHECK (account_type IN 
        ('sponsor', 'vendor', 'venue', 'agency', 'brand', 'media')),
    industry VARCHAR(100),
    sub_industry VARCHAR(100),
    
    -- Size and revenue
    company_size VARCHAR(50) CHECK (company_size IN 
        ('1-10', '11-50', '51-200', '201-500', '501-1000', '1000+')),
    annual_revenue_range VARCHAR(50),
    
    -- Location
    headquarters_address TEXT,
    headquarters_city VARCHAR(100),
    headquarters_country VARCHAR(100),
    operating_regions TEXT[],
    
    -- Relationship status
    account_status VARCHAR(50) DEFAULT 'prospect' CHECK (account_status IN 
        ('prospect', 'active', 'inactive', 'churned')),    account_tier VARCHAR(20) CHECK (account_tier IN 
        ('strategic', 'enterprise', 'mid-market', 'small')),
    health_score INTEGER DEFAULT 50,
    
    -- Financial
    total_revenue_generated DECIMAL(12,2) DEFAULT 0,
    outstanding_balance DECIMAL(12,2) DEFAULT 0,
    credit_limit DECIMAL(12,2),
    payment_terms VARCHAR(50),
    
    -- Ownership
    account_owner_id UUID REFERENCES users(id),
    account_team UUID[], -- Array of user IDs
    
    -- Important dates
    first_contact_date DATE,
    became_customer_date DATE,
    renewal_date DATE,
    churn_date DATE,
    
    -- Metadata
    tags TEXT[],
    notes TEXT,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_accounts_name ON accounts(company_name);
CREATE INDEX idx_accounts_type ON accounts(account_type);
CREATE INDEX idx_accounts_status ON accounts(account_status);
CREATE INDEX idx_accounts_owner ON accounts(account_owner_id);
-- Update contacts foreign key now that accounts table exists
ALTER TABLE contacts ADD CONSTRAINT contacts_account_id_fkey 
    FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE SET NULL;

-- 3. Opportunities table (sales pipeline)
CREATE TABLE IF NOT EXISTS opportunities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Basic information
    opportunity_name VARCHAR(255) NOT NULL,
    account_id UUID REFERENCES accounts(id),
    primary_contact_id UUID REFERENCES contacts(id),
    
    -- Opportunity details
    opportunity_type VARCHAR(50) CHECK (opportunity_type IN 
        ('sponsorship', 'venue_rental', 'vendor_service', 'partnership', 'advertising')),
    description TEXT,
    
    -- Pipeline stage
    stage VARCHAR(50) DEFAULT 'prospecting' CHECK (stage IN 
        ('prospecting', 'qualification', 'proposal', 'negotiation', 'closed_won', 'closed_lost')),
    probability_to_close INTEGER DEFAULT 10,
    
    -- Value and timeline
    amount DECIMAL(12,2),
    expected_close_date DATE,
    fiscal_period VARCHAR(20),    
    -- Competition
    competitors TEXT[],
    competitive_situation TEXT,
    
    -- Win/loss analysis
    closed_date DATE,
    win_loss_reason VARCHAR(100),
    win_loss_notes TEXT,
    
    -- Ownership
    owner_id UUID REFERENCES users(id),
    created_by UUID REFERENCES users(id),
    
    -- Source and campaign
    lead_source VARCHAR(100),
    campaign_id UUID,
    
    -- Next steps
    next_step TEXT,
    next_step_date DATE,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_opportunities_account ON opportunities(account_id);
CREATE INDEX idx_opportunities_contact ON opportunities(primary_contact_id);
CREATE INDEX idx_opportunities_stage ON opportunities(stage);
CREATE INDEX idx_opportunities_owner ON opportunities(owner_id);
CREATE INDEX idx_opportunities_close_date ON opportunities(expected_close_date);