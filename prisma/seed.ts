// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting Zaya database seed...');

  // 1. Create Demo User + Profile
  const user1 = await prisma.user.upsert({
    where: { email: 'demo@zaya.health' },
    update: {},
    create: {
      email: 'demo@zaya.health',
      name: 'Elena Voss',
      profile: {
        create: {
          dietaryGoals: ['Mediterranean', 'GlutenFree'],
          activityLevel: 'moderate',
          age: 32,
          gender: 'female',
          weight: 58.5,
          height: 165,
          preferences: { allergies: ['dairy'], dislikes: ['red meat'] },
        },
      },
    },
  });

  console.log('✅ Users & Profiles seeded');

  // 2. Wellness Logs (last 7 days)
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const logDate = new Date(today);
    logDate.setDate(logDate.getDate() - i);
    await prisma.wellnessLog.create({
      data: {
        userId: user1.id,
        date: logDate,
        energyLevel: Math.floor(Math.random() * 4) + 7,
        sleepHours: 7.5 + Math.random() * 1,
        mood: ['calm', 'energized', 'focused', 'balanced'][Math.floor(Math.random() * 4)],
        digestion: 'good',
      },
    });
  }

  console.log('✅ Wellness logs seeded');

  // 3. Sample Meal Plan
  await prisma.mealPlan.create({
    data: {
      userId: user1.id,
      name: 'Week 1 Mediterranean Reset',
      startDate: today,
      endDate: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000),
      type: 'Mediterranean',
      macros: { daily: { protein: 120, carbs: 180, fat: 70 } },
      days: {
        create: [{
          dayNumber: 1,
          meals: [{ mealType: 'breakfast', foods: ['Greek yogurt with berries'] }]
        }]
      }
    }
  });

  console.log('✅ Meal plans seeded');
  console.log('🎉 Zaya seed completed!');
}

main()
  .catch(e => { console.error('Seed error:', e); process.exit(1); })
  .finally(() => prisma.$disconnect());