-- Follow-up to 20260423000000_profiles.sql, which was never applied to the
-- live project. Idempotent: safe to run whether or not that one ran.

-- 1. Profiles table (same shape as 20260423000000_profiles.sql)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    avatar_url TEXT,
    wellness_goals TEXT[],
    dietary_restrictions TEXT[],
    onboarding_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT TO authenticated USING ((select auth.uid()) = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE TO authenticated
    USING ((select auth.uid()) = id)
    WITH CHECK ((select auth.uid()) = id);

-- 2. Auto-create a profile on signup. Pinned search_path so the
-- SECURITY DEFINER function can't be hijacked via a shadowing schema.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, avatar_url)
    VALUES (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url')
    ON CONFLICT (id) DO NOTHING;
    RETURN new;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 3. Backfill profiles for users who signed up before the trigger existed
-- (updateProfile() only UPDATEs, so they'd otherwise be stuck in onboarding).
INSERT INTO public.profiles (id, full_name, avatar_url)
SELECT u.id, u.raw_user_meta_data->>'full_name', u.raw_user_meta_data->>'avatar_url'
FROM auth.users u
ON CONFLICT (id) DO NOTHING;

-- 4. NutriSnap: untracked, unused, empty table whose policies let any
-- signed-in user read/insert/update/delete every row. Remove the policies;
-- RLS stays enabled, so the table becomes deny-all without dropping it.
DROP POLICY IF EXISTS "NutriSnap select" ON public."NutriSnap";
DROP POLICY IF EXISTS "NutriSnap insert" ON public."NutriSnap";
DROP POLICY IF EXISTS "NutriSnap update" ON public."NutriSnap";
DROP POLICY IF EXISTS "NutriSnap delete" ON public."NutriSnap";
