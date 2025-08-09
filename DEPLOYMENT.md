# SlotFit Deployment Guide

## Prerequisites
- Node.js 18+ installed
- Git installed
- Supabase account
- Vercel account (optional)

## Local Development Setup

1. **Navigate to project:**
```bash
cd ~/Desktop/projects/SlotFit
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure Supabase:**
   - Create a new project at [supabase.com](https://supabase.com)
   - Go to SQL Editor in your Supabase dashboard
   - Copy and run the contents of `supabase/schema.sql`
   - Get your project URL and anon key from Settings > API

4. **Set up environment variables:**
```bash
cp .env.local.example .env.local
```
Edit `.env.local` with your Supabase credentials.

5. **Start development server:**
```bash
./start.sh
# or
npm run dev
```
## Production Deployment

### Option 1: Vercel (Recommended)

1. **Push to GitHub:**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/slotfit.git
git push -u origin main
```

2. **Deploy with Vercel:**
```bash
npx vercel
```
Follow the prompts to link your GitHub repo.

3. **Add environment variables in Vercel:**
   - Go to your project in Vercel dashboard
   - Settings > Environment Variables
   - Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`

4. **Deploy to production:**
```bash
vercel --prod
```

### Option 2: Self-hosted

1. **Build the application:**
```bash
npm run build
```
2. **Start production server:**
```bash
npm run start
```

3. **Use PM2 for process management:**
```bash
npm install -g pm2
pm2 start npm --name "slotfit" -- start
pm2 save
pm2 startup
```

## Environment Variables

Required for production:
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key

Optional:
- `NEXT_PUBLIC_GA_ID` - Google Analytics ID
- `SUPABASE_SERVICE_ROLE_KEY` - For server-side operations

## Post-Deployment Checklist

- [ ] Test all exercise selection features
- [ ] Verify muscle heat map updates correctly
- [ ] Check responsive design on mobile
- [ ] Test dark/light mode switching
- [ ] Verify Supabase connection
- [ ] Monitor error logs
- [ ] Set up error tracking (Sentry)
- [ ] Configure analytics
## Troubleshooting

### Common Issues

**Build fails with TypeScript errors:**
- Run `npm run lint` to identify issues
- Check all imports are correct
- Ensure all types are properly defined

**Supabase connection fails:**
- Verify environment variables are set correctly
- Check Supabase project is active
- Ensure RLS policies are configured

**Deployment fails on Vercel:**
- Check build logs in Vercel dashboard
- Verify all environment variables are set
- Ensure package.json scripts are correct

## Performance Optimization

1. **Enable ISR (Incremental Static Regeneration):**
   - Add `revalidate` to page components

2. **Optimize images:**
   - Use Next.js Image component
   - Serve WebP format when possible

3. **Code splitting:**
   - Use dynamic imports for heavy components
   - Lazy load exercise data

## Support

For issues, please check:
- GitHub Issues
- Vercel deployment logs
- Supabase logs dashboard