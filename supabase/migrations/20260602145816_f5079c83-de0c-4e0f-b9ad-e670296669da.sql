
-- Restrict has_role execution to authenticated users + service_role
REVOKE EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) TO authenticated, service_role;

-- Replace overly-permissive insert policies with basic validation
DROP POLICY "Anyone can submit an application" ON public.apply_submissions;
CREATE POLICY "Anyone can submit an application"
  ON public.apply_submissions FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(name) BETWEEN 1 AND 200
    AND length(email) BETWEEN 3 AND 320
    AND length(company) BETWEEN 1 AND 200
    AND length(challenge) BETWEEN 1 AND 5000
  );

DROP POLICY "Anyone can send a contact message" ON public.contact_submissions;
CREATE POLICY "Anyone can send a contact message"
  ON public.contact_submissions FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(name) BETWEEN 1 AND 200
    AND length(email) BETWEEN 3 AND 320
    AND length(company) BETWEEN 1 AND 200
  );
