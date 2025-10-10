# Supabase Social Authentication Setup

This guide will help you set up GitHub and Google authentication with Supabase.

## Prerequisites

1. A Supabase account (sign up at https://supabase.com)
2. A GitHub account (for GitHub OAuth)
3. A Google Cloud account (for Google OAuth)

## Step 1: Create a Supabase Project

1. Go to https://supabase.com/dashboard
2. Click "New Project"
3. Fill in your project details
4. Wait for the project to be created

## Step 2: Get Your Supabase Credentials

1. In your Supabase project dashboard, go to **Settings** > **API**
2. Copy the following values:
   - **Project URL** (looks like `https://xxxxx.supabase.co`)
   - **anon/public** key

3. Update your `.env.local` file:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

## Step 3: Create a GitHub OAuth App

1. Go to https://github.com/settings/developers
2. Click **"New OAuth App"** or **"New GitHub App"**
3. Fill in the application details:
   - **Application name**: PixelForge (or your preferred name)
   - **Homepage URL**: `http://localhost:3000` (for development)
   - **Authorization callback URL**: `https://your-project.supabase.co/auth/v1/callback`
     - Replace `your-project` with your actual Supabase project reference ID
     - You can find this in your Supabase project URL

4. Click **"Register application"**
5. Copy the **Client ID**
6. Generate a new **Client Secret** and copy it

## Step 4: Configure GitHub OAuth in Supabase

1. In your Supabase project, go to **Authentication** > **Providers**
2. Find **GitHub** in the list and click to expand it
3. Enable the GitHub provider
4. Enter your GitHub OAuth credentials:
   - **Client ID**: Paste the Client ID from GitHub
   - **Client Secret**: Paste the Client Secret from GitHub
5. Click **Save**

## Step 5: Create a Google OAuth App

1. Go to https://console.cloud.google.com/
2. Create a new project or select an existing one
3. Go to **APIs & Services** > **Credentials**
4. Click **"Create Credentials"** > **"OAuth client ID"**
5. If prompted, configure the OAuth consent screen first:
   - **User Type**: External (for public access)
   - **App name**: PixelForge (or your preferred name)
   - **User support email**: Your email
   - **Developer contact information**: Your email
   - Click **"Save and Continue"**
   - **Scopes**: Add the following scopes:
     - `openid`
     - `https://www.googleapis.com/auth/userinfo.email`
     - `https://www.googleapis.com/auth/userinfo.profile`
   - Click **"Save and Continue"**
   - **Test users**: Add your email for testing (optional)
   - Click **"Save and Continue"**

6. Return to **Credentials** and create OAuth client ID:
   - **Application type**: Web application
   - **Name**: PixelForge Web Client (or your preferred name)
   - **Authorized JavaScript origins**:
     - `http://localhost:3000` (for development)
   - **Authorized redirect URIs**:
     - `https://your-project.supabase.co/auth/v1/callback`
     - Replace `your-project` with your actual Supabase project reference ID
   - Click **"Create"**

7. Copy the **Client ID** and **Client Secret**

## Step 6: Configure Google OAuth in Supabase

1. In your Supabase project, go to **Authentication** > **Providers**
2. Find **Google** in the list and click to expand it
3. Enable the Google provider
4. Enter your Google OAuth credentials:
   - **Client ID**: Paste the Client ID from Google Cloud Console
   - **Client Secret**: Paste the Client Secret from Google Cloud Console
5. Click **Save**

## Step 7: Update Callback URL for Production

When deploying to production:

1. Update your GitHub OAuth App settings:
   - **Homepage URL**: `https://your-production-domain.com`
   - **Authorization callback URL**: `https://your-project.supabase.co/auth/v1/callback`

2. Update your Google OAuth App settings:
   - **Authorized JavaScript origins**: Add `https://your-production-domain.com`
   - **Authorized redirect URIs**: Keep `https://your-project.supabase.co/auth/v1/callback`

3. Update your `.env.local` (or production environment variables):
   ```env
   NEXT_PUBLIC_SITE_URL=https://your-production-domain.com
   ```

## Step 8: Test the Authentication

1. Start your development server: `npm run dev`
2. Navigate to `http://localhost:3000/login`
3. Try **Sign in with GitHub**:
   - Click the GitHub button
   - Authorize the application
   - You should be redirected back to your app and logged in!
4. Try **Sign in with Google**:
   - Click the Google button
   - Select your Google account
   - Grant permissions
   - You should be redirected back to your app and logged in!

## Troubleshooting

### Callback URL Mismatch
- Make sure the callback URL in GitHub matches: `https://your-project.supabase.co/auth/v1/callback`
- Make sure the callback URL in Google Cloud Console matches: `https://your-project.supabase.co/auth/v1/callback`
- Check that there are no trailing slashes

### Google OAuth Errors
- **"Access blocked: This app's request is invalid"**: Make sure you've added the required OAuth scopes (openid, email, profile)
- **"Error 400: redirect_uri_mismatch"**: Verify the redirect URI in Google Cloud Console exactly matches your Supabase callback URL
- **"OAuth consent screen"**: If your app is in testing mode, you can only sign in with test users added in the OAuth consent screen

### Environment Variables Not Loading
- Restart your development server after changing `.env.local`
- Make sure the file is named exactly `.env.local` (not `.env.local.txt`)

### User Not Persisting
- Check that middleware.ts is properly configured
- Verify that cookies are being set correctly

## Security Notes

- Never commit `.env.local` to version control
- Rotate your secrets regularly
- Use different OAuth apps for development and production
- Enable RLS (Row Level Security) in Supabase for production

## Additional Resources

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Supabase GitHub OAuth Guide](https://supabase.com/docs/guides/auth/social-login/auth-github)
- [Supabase Google OAuth Guide](https://supabase.com/docs/guides/auth/social-login/auth-google)
- [GitHub OAuth Documentation](https://docs.github.com/en/developers/apps/building-oauth-apps)
- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
