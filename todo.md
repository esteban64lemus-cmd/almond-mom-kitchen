# Almond Mom Kitchen - Project TODO

## Core Features
- [x] Homepage with hero section and featured recipes
- [x] Recipe blog with category filtering (Gluten-Free, Dairy-Free, No Preservatives, No GMO, Vegan, Quick & Easy)
- [ ] Individual recipe pages with ingredients, instructions, prep/cook time, servings, nutrition info
- [ ] Video embed section on recipe pages
- [ ] Daily recipe update feed/blog section
- [ ] Newsletter signup form
- [ ] Search bar for recipes by ingredient or category
- [ ] About page with founder story
- [ ] Shop/Book section for cookbook e-commerce
- [ ] Video gallery page for recipe videos

## Admin & Submission System
- [x] Recipe submission form for mom (ingredients, instructions, photos, video links)
- [ ] Draft/moderation queue for recipes (UI)
- [ ] Admin dashboard to review and approve recipes
- [ ] AI recipe analysis (categorization, nutrition extraction, description optimization)
- [x] Publish/reject controls for submitted recipes (backend)
- [ ] Recipe edit functionality

## Design & Branding
- [x] Implement Farmhouse Editorial design (Playfair Display + Lato fonts)
- [x] Warm cream backgrounds with forest green accents
- [x] Upload and integrate brand logo
- [x] Responsive mobile-first design
- [ ] Smooth animations and transitions

## Database & Backend
- [x] Set up recipes table with all required fields
- [x] Set up recipe_drafts table for submissions
- [x] Create tRPC procedures for recipe CRUD operations
- [x] Create tRPC procedures for draft submission and moderation
- [ ] Implement AI integration for recipe analysis
- [x] Set up authentication and role-based access (admin vs user)

## Frontend Pages & Components
- [x] Navigation header with logo and menu
- [x] Footer with newsletter signup
- [x] Recipe card component for listings
- [ ] Recipe detail page component
- [x] Category filter component
- [ ] Search functionality
- [ ] Admin panel/dashboard
- [x] Recipe submission form UI

## Testing & Quality
- [ ] Write vitest tests for recipe CRUD operations
- [ ] Write vitest tests for draft moderation flow
- [ ] Test responsive design on mobile, tablet, desktop
- [ ] Test search and filter functionality

## Deployment & Publishing
- [ ] Create initial checkpoint before major development
- [ ] Final testing and QA
- [ ] Create final checkpoint
- [ ] Publish website

## Wix Site Status
- [ ] Monitor Wix site builder completion
- [ ] Deliver both Wix and custom-built versions to user

## Notification System
- [x] Create notifications database table
- [x] Build notification service with tRPC procedures
- [x] Add in-app toast notifications for all user actions
- [x] Add admin alerts when recipes submitted for review
- [x] Add submitter notifications for draft approval/rejection
- [x] Add error notifications for all failures
- [ ] Create notification center/inbox UI
- [x] Wire notifications to recipe submission flow
- [x] Wire notifications to admin moderation flow

## Admin Dashboard
- [ ] Create admin dashboard layout
- [ ] Build pending recipes moderation queue
- [ ] Add approve/reject with reason UI
- [ ] Add recipe analytics/stats
- [ ] Add user management section

## Sample Data
- [ ] Create and publish 5-10 sample recipes
- [ ] Populate with realistic ingredients and instructions
- [ ] Add images and video URLs
- [ ] Test filtering and search
