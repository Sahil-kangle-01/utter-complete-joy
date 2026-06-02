# Plan: Forms backend + email + admin + legal pages

## 1. Enable Lovable Cloud
Provisions database, auth, and server runtime needed for everything below.

## 2. Database
Two tables (with RLS):
- `apply_submissions` — all fields from the Apply form (name, role, company, website, city, industry, team_size, revenue, systems[], challenge, source, phone, email, created_at)
- `contact_submissions` — fields from the Contact form (name, company, city, phone, email, system_interest, message, created_at)

Plus a `user_roles` table + `has_role()` security-definer function so only admins can read submissions. Anyone (anon) can INSERT; only admins can SELECT.

## 3. Email via Resend
Store `RESEND_API_KEY` as a secret. Create one server function `notifyLead` that:
- Inserts the row in the matching table
- Sends a formatted email to `sahil@induxtron.com` via Resend (from `onboarding@resend.dev` until you verify a domain — note below)

Wire Apply + Contact forms to call this. Keep the existing "success" UI.

> **Note on Resend sender domain:** Resend requires a verified domain to send from your own address. Until `induxtron.com` is verified in Resend, emails will arrive from `onboarding@resend.dev`. Easy to swap later.

## 4. Admin view at `/admin/leads`
- Behind auth (gated under `_authenticated` layout, then a `has_role('admin')` check)
- Tabs: Applications | Contact messages
- Tables with newest first, click row to expand details
- Simple `/auth` page for sign-in (email/password)
- You'll need to sign up once, then I'll show you the one SQL line to grant yourself the `admin` role

## 5. Legal pages
- Create `/privacy` and `/terms` routes with sensible default copy tailored to Induxtron (you can edit the text anytime)
- Update Footer to link them (replace the inert `<span>` elements)

## Files to add/modify
- `src/integrations/...` (auto-generated when Cloud is enabled)
- migration: tables, RLS, user_roles, has_role
- `src/lib/leads.functions.ts` (server functions: submitApply, submitContact, listLeads)
- `src/lib/email/resend.server.ts`
- `src/routes/privacy.tsx`, `src/routes/terms.tsx`
- `src/routes/auth.tsx`
- `src/routes/_authenticated/route.tsx` (gate) + `src/routes/_authenticated/admin.leads.tsx`
- Edit `src/routes/apply.tsx`, `src/routes/contact.tsx`, `src/components/site/Footer.tsx`

Shall I proceed?