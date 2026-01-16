-- Contact Inquiries Table
CREATE TABLE IF NOT EXISTS contact_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Contact Information
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  
  -- Company Information
  company_name VARCHAR(255) NOT NULL,
  company_size VARCHAR(50),
  industry VARCHAR(100),
  website VARCHAR(255),
  job_title VARCHAR(100),
  
  -- Inquiry Details
  inquiry_type VARCHAR(50) NOT NULL DEFAULT 'demo',
  subject VARCHAR(255),
  message TEXT NOT NULL,
  preferred_contact_method VARCHAR(50),
  preferred_time VARCHAR(100),
  
  -- Metadata
  status VARCHAR(50) DEFAULT 'new',
  priority VARCHAR(20) DEFAULT 'medium',
  assigned_to VARCHAR(255),
  
  -- Tracking
  source VARCHAR(100) DEFAULT 'website',
  utm_source VARCHAR(100),
  utm_medium VARCHAR(100),
  utm_campaign VARCHAR(100),
  ip_address INET,
  user_agent TEXT,
  referrer TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  contacted_at TIMESTAMP WITH TIME ZONE,
  
  -- Constraints
  CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  CONSTRAINT valid_status CHECK (status IN ('new', 'contacted', 'qualified', 'closed', 'spam')),
  CONSTRAINT valid_priority CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  CONSTRAINT valid_inquiry_type CHECK (inquiry_type IN ('demo', 'sales', 'support', 'partnership', 'other'))
);

-- Activity Log Table
CREATE TABLE IF NOT EXISTS inquiry_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  inquiry_id UUID NOT NULL REFERENCES contact_inquiries(id) ON DELETE CASCADE,
  
  activity_type VARCHAR(50) NOT NULL,
  description TEXT,
  performed_by VARCHAR(255),
  metadata JSONB,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT valid_activity_type CHECK (activity_type IN ('email_sent', 'call_made', 'note_added', 'status_changed', 'meeting_scheduled'))
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_inquiries_email ON contact_inquiries(email);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON contact_inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON contact_inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_inquiries_company ON contact_inquiries(company_name);
CREATE INDEX IF NOT EXISTS idx_inquiries_type ON contact_inquiries(inquiry_type);
CREATE INDEX IF NOT EXISTS idx_activities_inquiry ON inquiry_activities(inquiry_id);
CREATE INDEX IF NOT EXISTS idx_activities_created_at ON inquiry_activities(created_at DESC);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_contact_inquiries_updated_at BEFORE UPDATE
    ON contact_inquiries FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Comments for documentation
COMMENT ON TABLE contact_inquiries IS 'Stores all contact form submissions and demo requests';
COMMENT ON TABLE inquiry_activities IS 'Tracks all activities related to contact inquiries';
COMMENT ON COLUMN contact_inquiries.status IS 'Current status: new, contacted, qualified, closed, spam';
COMMENT ON COLUMN contact_inquiries.priority IS 'Priority level: low, medium, high, urgent';
