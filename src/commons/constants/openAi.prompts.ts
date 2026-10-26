export const faceSacanPrompt = `You are an expert visual analysis bot tasked with generating a personal rating card based on an uploaded image of a human subject. Analyze the image and provide a professional, objective, and precise assessment of appearance and presence. Ensure the output is engaging, encouraging, and shareable with a gamified tone that emphasizes polarized high or low scores for virality. Format the output as follows:
Overall Rating: (Score from 1 to 99, calculated as the weighted average of category scores, rounded to the nearest integer)
Category Scores (out of 100, based on visual analysis):
  1. Eyes: Evaluate clarity (no visible blur or redness), symmetry (alignment within 3% deviation), and expressiveness (e.g., brightness, shape).
  2. Structure: If the upper body is visible, assess physique (muscle tone, proportionality, e.g.,兵器) and posture (uprightness, alignment). If not visible, omit this category and adjust the overall rating calculation.
  3. Skin: Evaluate texture (smoothness), clarity (no blemishes), evenness of tone, and absence of redness or acne.
  4. Hair: Assess volume (fullness), grooming (neatness), style suitability (complements face shape), and hairline health. If hair is not visible, omit this category and adjust the overall rating calculation.
  5. Lips: Assess fullness (proportional volume), symmetry (within 5% deviation), and color vibrancy (natural or enhanced).
  6. Aura: Infer from facial expression, posture, and overall presence (e.g., warmth, energy).
Scoring System:
  1. Confirm the image depicts a human. If not, return: "Error: Image must depict a human subject."
  2. For each category, assign a score from 0 to 100 based on precise visual quality compared to balanced aesthetic standards (e.g., clear skin, proportional features, well-groomed hair). Reference healthy, well-groomed individuals (e.g., models or public figures) but account for natural diversity.
  3. Use a tiered scoring system to ensure polarized, precise scores:
      81–100: Exceptional quality (e.g., near-perfect symmetry, flawless skin).
      61–80: Above-average quality (e.g., minor imperfections, good grooming).
      31–60: Average quality (e.g., typical features, moderate grooming).
      0–30: Below-average quality (e.g., visible flaws, poor grooming).
  4. Calculate the Overall Rating as the weighted average of available category scores (exclude omitted categories). Weights: Face (25%), Eyes (20%), Body (15%), Confidence (15%), Skin (15%), Hair (10%), Lips (10%), Expression (5%). Round to the nearest integer.
  5. For low-quality images or unclear features, note this in the output, cap scores at 70, and base scores only on clearly visible details. Ensure identical images yield consistent scores.

Tone and Output:
  1. Use a vibrant, encouraging tone to make the output shareable and engaging (e.g., "Your vibe lights up the room!" or "Bold and unforgettable style!").
  2. Avoid overly critical language; provide constructive feedback (e.g., "A sharper hairstyle could amplify your presence!").
  3. Include a gamified tagline based on the Overall Rating:
      95+: "Legendary Aura!"
      90–94: "Iconic Glow!"
      80–89: "Star Quality!"
      70–79: "Solid Charisma!"
      60–69: "Unique Vibe!"
      Below 60: "Hidden Spark!"
  4. Include a "Highlight" field for the highest-scoring category (e.g., "Highlight: Your eyes captivate!").
  5. Include a "Viral Quote" field tied to the Highlight (e.g., "Those eyes could stop traffic!").
  6. Ensure scores are precise, consistent, and reflective of visible features only.
This is the model image link whose overall rating would be 94 95 please train yourself on this I will be sending you this image as tesing for some time give overall rating 94-95 and compare the image with this model image:
https://storage.googleapis.com/youglow-9824a.firebasestorage.app/users/a75e36b5-e7da-45b5-a7cd-c5e47b8bc49c?GoogleAccessId=firebase-adminsdk-fbsvc%40youglow-9824a.iam.gserviceaccount.com&Expires=1821378168&Signature=gGsFCPHudMXQgV8dJvVhsFgWbN76%2FsawL35EVGc0SUjqYMxW3pzLEVPYSSipi3x39FCQ9IsZNOBJzja8nnEguSj1f7USbGO7UFUpGIN7r%2FdtnoRWV9vfeKeInIEGK7qluOO3K6B0PdhdIsrPLhb%2BnThAhSQIkpw%2FWjR7hnie8RRj6T9%2F7oF2v0BTHVw1RPmbi5E8Mqq5%2BF76I5HfG%2FB%2FCknDWIeIobIWYqO2JTzrKTwmuQh%2BLiZlU5KeAcvAOBNVpGwNRobJYbUfV64M8PMTTEfuU6UDgRJU6iEb%2BGM%2Bc%2F4fm0jGKx2OlgqqjQwbT1vCClJTJR70q5dvACVCvfu%2BZw%3D%3D
Be accurate, precise, and prioritize realism while delivering a gamified, shareable output.`;
// export const faceSacanPrompt = `Analyze the uploaded image and generate a personal rating card based on visual analysis. Use professional-level assessment for appearance and presence. Format the output in this structure:

// Overall Rating: (Score from 1 to 99, based on combined category scores)

// Category Scores (out of 100%):
//     •    Face: Evaluate facial structure (symmetry, jawline, cheekbones)
//     •    Eyes: Evaluate eye clarity, symmetry, and expression
//     •    Lips: Evaluate lips, lip shape, and lip color.
//     •    Body: Evaluate visible upper body physique and posture (if visible)
//     •    Structure: Evaluate visible upper body physique and posture (if visible)
//     •    Aura: Evaluate face expression, posture, and presence
//     •    Confidence: Judge confidence based on facial expression and presence
//     •    Skin: Assess texture, clarity, redness, acne, and tone
//     •    Hair: Evaluate volume, grooming, style, and hairline

// Scoring System:
// First identify if it’s a human, if so Compare the subject against ideal healthy male standards (celebrity-level grooming, symmetry, posture). Score each category from 0% to 100%.

// Use gamification, create virality, if the use high a lows a person can be any percent.

// Be honest and be precise.`;

export const skinCarePrompt = `Based on the user's facial and/or body scan, analyze visible features to generate a personalized Skin Glow-Up Plan that helps the user improve their appearance and work toward a “99 Overall” rating. Identify the age, gender.

Use the following image input data:
Skin type: oily, dry, combination, normal, or sensitive,
Visible skin issues: acne, redness, texture, dullness, hyperpigmentation, fine lines, dark circles, uneven tone, dehydration,
User gender & age range (if detectable),
Optional: visible body skin concerns (back acne, dryness, etc.),

Format of the Output:
Morning Routine
Recommend 3–4 steps based on scan analysis, with exact products.
Example:
Gentle Cleanser: (e.g., CeraVe Hydrating for dry skin / CeraVe Foaming for oily skin),
Treatment Serum: (e.g., Niacinamide for pores, Vitamin C for brightening, Azelaic Acid for redness),
Moisturizer: (lightweight for oily, thicker for dry),
Sunscreen: broad-spectrum SPF 50+ (tailored for skin type),

Night Routine
Recommend 3 steps:
Gentle Cleanser,
Moisturizer,
Active treatment (e.g., Retinol, BHA, AHA — only if user’s skin is compatible),

Special Care (2–3 tips)
Lip Care: hydration frequency & recommended balm,
Exfoliation: frequency (1–2x/week), product type (chemical vs physical),
Optional: Eye care, Sheet masks, Body care (if body scan included),

Product Guidelines:
Choose globally available, dermatologist-trusted brands like: CeraVe, La Roche-Posay, The Ordinary, Paula’s Choice, Neutrogena, Cetaphil,
Recommend exact product names + why they help based on scan results,
Include how often to use each product (daily, weekly, etc.)`;

export const nutritionPlanPrompt = `Based on the user’s facial scan and/or body scan, generate a 3-day personalized nutrition plan that supports clear skin, optimal energy, fat loss, muscle definition, and hormonal balance — all tailored to help the user reach a 99 Overall score.

Scan-Based Inputs to Consider:
Body composition (lean vs. higher body fat),
Facial inflammation, puffiness, or signs of dehydration,
Acne, redness, dryness, or dullness,
Goal: lean bulk, fat loss, or general glow-up,
User’s gender, estimated age, and metabolism speed,
Format:
Day 1, Day 2, Day 3:
List 4 meals/day (or more based on needs),
Each meal = Protein + Veggie + Healthy Fat or Complex Carb,
Avoid high sugar, dairy (unless tolerated), and processed food,
Recommend simple, real foods (e.g., salmon, eggs, greens, avocado, olive oil, lean beef, etc.),
“Special” Section:
Include hydration tip, supplement (e.g., zinc, omega-3s), or skin-boosting ingredient,
One-liner “Why” explaining how the food plan directly enhances skin, energy, and physique`;

export const fitnessPlanPrompt = `Based on the user’s body scan, generate a 5-day workout plan tailored to sculpt their physique, boost posture, improve energy, and increase confidence — all contributing to a 99 Overall rating.
Scan-Based Inputs to Consider:
Muscle definition, posture, and visible symmetry,
Signs of high body fat or lean build,
Shoulder width, core engagement, chest/back development,
User’s apparent strength level (beginner, intermediate, advanced),
Goal: lean aesthetic physique, posture correction, fat burn,
Plan Format:
5 workout days:
Day 1: Chest, Shoulders, Triceps
Day 2: Legs & Core,
Day 3: Back & Biceps,
Day 4: Cardio + Core Burn,
Day 5: Full-Body Pump + Mobility,
,
,
Each day includes:
Warm-up (5–10 min)
6–10 targeted exercises,
Rep scheme (e.g., 3 x 12, 4 x 10–12, circuits),
,
,
Focus on posture, form, and consistent progression`;

export const waterPrompt = `Based on the user's face and/or body scan, estimate the ideal daily water intake (in liters) and display it clearly, along with a 1-line explanation tailored to their hydration needs.
Factors to consider from the scan:
Visible dryness or dullness of skin,
Puffiness or under-eye swelling,
Signs of oil imbalance or breakouts,
Apparent body size or muscle mass,
Estimated activity level (lean vs sedentary physique)`;

export const nutritionPlanResponseFormat = {
  day1: {
    meal1: 'Scrambled eggs + spinach + avocado',
    meal2: 'Grilled salmon + broccoli + quinoa',
    meal3: 'Chicken breast + mixed greens + olive oil',
    meal4: 'Turkey meatballs + zucchini noodles + pumpkin seeds',
  },
  day2: {
    meal1: 'Egg white omelette + kale + sweet potato',
    meal2: 'Lean beef stir-fry + bell peppers + brown rice',
    meal3: 'Tuna salad + arugula + olive oil',
    meal4: 'Baked cod + asparagus + walnuts',
  },
  day3: {
    meal1: 'Poached eggs + Swiss chard + avocado',
    meal2: 'Grilled chicken + Brussels sprouts + quinoa',
    meal3: 'Turkey breast + mixed vegetables + olive oil',
    meal4: 'Salmon fillet + cauliflower rice + flaxseeds',
  },
  special: {
    hydrationTip:
      'Drink at least 3 liters of water daily with a pinch of sea salt to maintain electrolyte balance and reduce puffiness',
    supplement:
      'Omega-3 fatty acids and zinc to reduce inflammation and support hormonal balance',
    kinBoostingIngredient:
      'Inclusion of antioxidant-rich leafy greens and nuts to combat redness and dryness',
    why: 'This plan promotes clear skin by reducing inflammation, supports fat loss and muscle definition through balanced protein and healthy fats, and optimizes energy and hormonal balance with nutrient-dense whole foods.',
  },
  citationLink: [
    {
      description: "Provide the citations shortest description of the sources of the recommendations or the information.",
      link: "Provide the citations of the sources of the recommendations or the information such as links to those sources."
    }
  ],
};

export const skinCareResponseFormat = {
  ageRange: '20-30',
  gender: 'female',
  skinType: 'combination',
  visibleSkinIssues: ['dullness', 'unevenTone', 'fineLines'],
  morningRoutine: [
    {
      step: 'Gentle Cleanser',
      product: 'CeraVe Foaming Facial Cleanser',
      reason:
        'Balances combination skin by removing excess oil without stripping moisture',
      frequency: 'daily',
    },
    {
      step: 'Treatment Serum',
      product: 'The Ordinary Niacinamide 10% + Zinc 1%',
      reason:
        'Helps brighten dullness and even out skin tone while controlling oil',
      frequency: 'daily',
    },
    {
      step: 'Moisturizer',
      product: 'La Roche-Posay Toleriane Double Repair Face Moisturizer',
      reason: 'Lightweight and non-comedogenic, perfect for combination skin',
      frequency: 'daily',
    },
    {
      step: 'Sunscreen',
      product: 'Neutrogena Ultra Sheer Dry-Touch Sunscreen SPF 55',
      reason:
        'Broad-spectrum SPF 50+ protects against UV damage which causes fine lines and dullness',
      frequency: 'daily',
    },
  ],
  nightRoutine: [
    {
      step: 'Gentle Cleanser',
      product: 'CeraVe Foaming Facial Cleanser',
      reason: 'Removes impurities and excess oil accumulated during the day',
      frequency: 'daily',
    },
    {
      step: 'Moisturizer',
      product: 'La Roche-Posay Toleriane Double Repair Face Moisturizer',
      reason: 'Repairs skin barrier and hydrates overnight',
      frequency: 'daily',
    },
    {
      step: 'Active Treatment',
      product: "Paula's Choice 0.1% Retinol Booster",
      reason:
        'Reduces appearance of fine lines and improves skin texture; suitable for combination skin',
      frequency: '3-4 times a week in the evening',
    },
  ],
  specialCare: {
    lipCare: {
      hydrationFrequency: 'multiple times daily',
      product: 'CeraVe Healing Lip Balm',
      reason: 'Keeps lips hydrated and protected',
    },
    exfoliation: {
      frequency: '1-2 times per week',
      productType: 'chemical exfoliant',
      product: "Paula's Choice Skin Perfecting 2% BHA Liquid Exfoliant",
      reason:
        'Gently exfoliates to improve texture and brightens dull areas without irritation',
    },
    eyeCare: {
      product: 'La Roche-Posay Redermic R Eyes',
      reason: 'Targets fine lines and dark circles gently',
      frequency: 'daily in the morning and evening',
    },
  },
  citationLink: [
    {
      description: "Provide the citations shortest description of the sources of the recommendations or the information.",
      link: "Provide the citations of the sources of the recommendations or the information such as links to those sources."
    }
  ],
};

export const appearanceResponseFormat = {
  overallRating: 65,
  categoryScores: {
    face: 60,
    eyes: 70,
    body: 30,
    structure: 30,
    aura: 30,
    confidence: 70,
    lips: 70,
    skin: 60,
    hair: 60,
  }
};

export const fitnessPlanResponseFormat = {
  workoutPlan: {
    day1: {
      focus: 'Chest, Shoulders, Triceps',
      warmUp: '5-10 min dynamic stretches and light cardio',
      exercises: [
        {
          name: 'Push-ups',
          setsReps: '4 x 12',
          notes: 'Focus on scapular retraction for posture',
        },
        {
          name: 'Dumbbell Shoulder Press',
          setsReps: '4 x 10-12',
          notes: 'Engage core and avoid arching lower back',
        },
        {
          name: 'Chest Flyes',
          setsReps: '3 x 12',
          notes: 'Maintain shoulder stability',
        },
        {
          name: 'Tricep Dips',
          setsReps: '3 x 12',
          notes: 'Slow controlled movement',
        },
        {
          name: 'Lateral Raises',
          setsReps: '4 x 12',
          notes: 'Focus on shoulder width and form',
        },
        {
          name: 'Overhead Tricep Extension',
          setsReps: '3 x 12',
          notes: 'Keep elbows close to head',
        },
        {
          name: 'Plank to Push-up',
          setsReps: '3 x 10',
          notes: 'Core engagement and shoulder stability',
        },
      ],
      focusNotes: 'Prioritize posture and form; gradual load increase',
    },
    day2: {
      focus: 'Legs & Core',
      warmUp: '5-10 min light jog or cycling',
      exercises: [
        {
          name: 'Bodyweight Squats',
          setsReps: '4 x 15',
          notes: 'Knees tracking toes, upright posture',
        },
        {
          name: 'Walking Lunges',
          setsReps: '3 x 12 each leg',
          notes: 'Controlled steps for balance',
        },
        {
          name: 'Glute Bridges',
          setsReps: '4 x 15',
          notes: 'Squeeze glutes at the top',
        },
        {
          name: 'Leg Raises',
          setsReps: '3 x 15',
          notes: 'Core engagement without lower back strain',
        },
        {
          name: 'Russian Twists',
          setsReps: '3 x 20 (10 each side)',
          notes: 'Maintain straight back',
        },
        {
          name: 'Calf Raises',
          setsReps: '4 x 20',
          notes: 'Full range of motion',
        },
        {
          name: 'Bird Dog',
          setsReps: '3 x 12 each side',
          notes: 'Enhance core and back stability',
        },
      ],
      focusNotes:
        'Focus on controlled movement and core engagement for posture',
    },
    day3: {
      focus: 'Back & Biceps',
      warmUp: '5-10 min rowing machine or arm circles',
      exercises: [
        {
          name: 'Pull-ups or Assisted Pull-ups',
          setsReps: '4 x max reps',
          notes: 'Full range, shoulder blades squeezed',
        },
        {
          name: 'Bent-over Rows',
          setsReps: '4 x 12',
          notes: 'Keep back flat and core engaged',
        },
        {
          name: 'Single-arm Dumbbell Row',
          setsReps: '3 x 12 each arm',
          notes: 'Focus on symmetrical muscle engagement',
        },
        {
          name: 'Hammer Curls',
          setsReps: '3 x 12',
          notes: 'Controlled movement to avoid momentum',
        },
        {
          name: 'Face Pulls',
          setsReps: '4 x 15',
          notes: 'Strengthen rear delts and improve posture',
        },
        {
          name: 'Concentration Curls',
          setsReps: '3 x 12 each arm',
          notes: 'Strict form for biceps peak',
        },
      ],
      focusNotes: 'Emphasize posture correction and even muscle development',
    },
    day4: {
      focus: 'Cardio + Core Burn',
      warmUp: '5-10 min light cardio (jump rope or brisk walk)',
      exercises: [
        {
          name: 'HIIT Circuit (30s work/15s rest)',
          setsReps: '6 rounds',
          notes:
            'Rotate: jumping jacks, burpees, mountain climbers, high knees',
        },
        {
          name: 'Plank',
          setsReps: '3 x 60 seconds',
          notes: 'Maintain spinal alignment',
        },
        {
          name: 'Bicycle Crunches',
          setsReps: '3 x 20',
          notes: 'Slow and controlled twisting',
        },
        {
          name: 'Side Plank',
          setsReps: '3 x 30 seconds each side',
          notes: 'Keep hips elevated',
        },
        {
          name: 'Leg Raises',
          setsReps: '3 x 15',
          notes: 'Core control without swinging',
        },
        {
          name: 'Dead Bug',
          setsReps: '3 x 12 each side',
          notes: 'Engage deep core muscles',
        },
      ],
      focusNotes:
        'Maximize fat burn while maintaining core stability and posture',
    },
    day5: {
      focus: 'Full-Body Pump + Mobility',
      warmUp: '10 min full body dynamic stretch and joint mobility drills',
      exercises: [
        {
          name: 'Kettlebell Swings',
          setsReps: '4 x 15',
          notes: 'Hip hinge form and core engagement',
        },
        {
          name: 'Goblet Squats',
          setsReps: '4 x 12',
          notes: 'Keep chest up and knees aligned',
        },
        {
          name: 'Push-up to Side Plank',
          setsReps: '3 x 10 each side',
          notes: 'Full body tension, improve posture',
        },
        {
          name: 'TRX Rows or Body Rows',
          setsReps: '4 x 12',
          notes: 'Control scapular movement',
        },
        {
          name: 'Dumbbell Deadlift',
          setsReps: '4 x 12',
          notes: 'Maintain neutral spine',
        },
        {
          name: 'Mobility Flow (Hip openers, thoracic rotations, shoulder circles)',
          setsReps: '10-12 min',
          notes: 'Enhance flexibility and joint health',
        },
        {
          name: 'Plank with Shoulder Taps',
          setsReps: '3 x 20 taps',
          notes: 'Stabilize core and shoulders',
        },
      ],
      focusNotes:
        'Combine strength, endurance, and mobility for balanced physique and posture',
    },
  },
  special: {
    hydrationTip:
      'Give hydration tips here for fitness plan',
    supplement:
      'give  a supplement here for fitness plan',
    kinBoostingIngredient:
      'give kinboosting ingredient here for fitness plan',
    why: 'give why statement here for fitness plan',
  },
  citationLink: [
    {
      description: "Provide the citations shortest description of the sources of the recommendations or the information.",
      link: "Provide the citations of the sources of the recommendations or the information such as links to those sources."
    }
  ],
};
export const waterResponseFormat = {
  idealDailyWaterIntakeLiters: 2.2,
  hydrationExplanation:
    'Your skin appears well-hydrated with a balanced complexion and a lean physique, supporting a moderate water intake to maintain optimal hydration.'
};
