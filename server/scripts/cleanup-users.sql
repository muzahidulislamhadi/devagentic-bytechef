-- Cleanup script for fresh deployment
-- This script removes all existing users to ensure admin@devagentic.io becomes the first admin

-- Delete user authorities (foreign key constraint)
DELETE FROM user_authority;

-- Delete all existing users
DELETE FROM "user";

-- Reset the user ID sequence (if using PostgreSQL)
ALTER SEQUENCE user_id_seq RESTART WITH 1050;

-- Optional: Clean up related data
DELETE FROM persistent_audit_event;
DELETE FROM persistent_audit_event_data;

-- Reset audit sequence
ALTER SEQUENCE persistent_audit_event_id_seq RESTART WITH 1;

COMMIT;
