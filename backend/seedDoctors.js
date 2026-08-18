// SafeSpace Doctor Seed Script
// Run with: node seedDoctors.js
// Inserts 4-5 doctors per specialty (8 specialties = ~37 doctors total)

import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const MONGODB_URI = 'mongodb+srv://samarashu00_db_user:i5W4FN7HUME6AMT0@cluster0.x1atctr.mongodb.net/SafeSpace?appName=Cluster0'

// ─── Doctor Schema (inline, same as doctorModel.js) ──────────────────────────
const doctorSchema = new mongoose.Schema({
    name:                { type: String, required: true },
    email:               { type: String, required: true, unique: true },
    password:            { type: String, required: true },
    image:               { type: String, required: true },
    speciality:          { type: String, required: true },
    degree:              { type: String, required: true },
    experience:          { type: String, required: true },
    about:               { type: String, required: true },
    available:           { type: Boolean, default: true },
    fees:                { type: Number, required: true },
    slots_booked:        { type: Object, default: {} },
    address:             { type: Object, required: true },
    date:                { type: Number, required: true },
    registration_Number: { type: String },
    rating:              { type: Number, default: 0 },
}, { minimize: false })

const Doctor = mongoose.models.doctor || mongoose.model('doctor', doctorSchema)

// ─── Realistic profile photos (randomuser.me — real headshots) ───────────────
// Format: https://randomuser.me/api/portraits/[men|women]/[0-99].jpg
const malePhotos   = (ids) => ids.map(i => `https://randomuser.me/api/portraits/men/${i}.jpg`)
const femalePhotos = (ids) => ids.map(i => `https://randomuser.me/api/portraits/women/${i}.jpg`)

// ─── Doctors Data ─────────────────────────────────────────────────────────────
const doctors = [

    // ══════════════════════════════════════════════════════════
    //  1. PSYCHIATRIST (5 doctors)
    // ══════════════════════════════════════════════════════════
    {
        name: 'Dr. Arjun Mehta',
        email: 'arjun.mehta@safespace.com',
        image: 'https://randomuser.me/api/portraits/men/32.jpg',
        speciality: 'Psychiatrist',
        degree: 'MBBS, MD Psychiatry — AIIMS New Delhi',
        experience: '14 Years',
        fees: 1200,
        about: 'Dr. Arjun Mehta is a senior consultant psychiatrist with 14 years of clinical experience in mood disorders, schizophrenia, and bipolar spectrum conditions. He combines pharmacotherapy with structured psychoeducation to deliver holistic care.',
        address: { line1: 'Fortis Hospital, Sector 62', line2: 'Noida, Uttar Pradesh' },
        registration_Number: 'MCI-2009-DEL-48210',
        rating: 4.9,
    },
    {
        name: 'Dr. Priya Nambiar',
        email: 'priya.nambiar@safespace.com',
        image: 'https://randomuser.me/api/portraits/women/44.jpg',
        speciality: 'Psychiatrist',
        degree: 'MBBS, DPM — Kozhikode Medical College',
        experience: '11 Years',
        fees: 1000,
        about: 'Dr. Priya Nambiar specialises in women\'s mental health, postpartum depression, and perinatal psychiatry. She is trained in both biological psychiatry and supportive therapy, helping patients find stability and clarity.',
        address: { line1: 'Aster Medcity, Kochi', line2: 'Kerala' },
        registration_Number: 'KMC-2012-KER-77341',
        rating: 4.8,
    },
    {
        name: 'Dr. Rahul Srivastava',
        email: 'rahul.srivastava@safespace.com',
        image: 'https://randomuser.me/api/portraits/men/55.jpg',
        speciality: 'Psychiatrist',
        degree: 'MBBS, MD Psychiatry — KEM Hospital Mumbai',
        experience: '9 Years',
        fees: 900,
        about: 'Dr. Rahul Srivastava focuses on anxiety-spectrum disorders, OCD, and adult ADHD. He uses a collaborative, evidence-based approach combining medication management with psychoeducation and lifestyle interventions.',
        address: { line1: 'Lilavati Hospital, Bandra West', line2: 'Mumbai, Maharashtra' },
        registration_Number: 'MMC-2015-MUM-33012',
        rating: 4.7,
    },
    {
        name: 'Dr. Sneha Kapoor',
        email: 'sneha.kapoor@safespace.com',
        image: 'https://randomuser.me/api/portraits/women/61.jpg',
        speciality: 'Psychiatrist',
        degree: 'MBBS, DNB Psychiatry — PGI Chandigarh',
        experience: '7 Years',
        fees: 850,
        about: 'Dr. Sneha Kapoor is passionate about accessible mental healthcare. She provides comprehensive psychiatric evaluation and treatment for depression, bipolar disorder, and psychotic conditions with a gentle, patient-first approach.',
        address: { line1: 'Max Hospital, Saket', line2: 'New Delhi' },
        registration_Number: 'DMC-2017-DEL-52890',
        rating: 4.8,
    },
    {
        name: 'Dr. Vikram Bose',
        email: 'vikram.bose@safespace.com',
        image: 'https://randomuser.me/api/portraits/men/72.jpg',
        speciality: 'Psychiatrist',
        degree: 'MBBS, MD Psychiatry — NIMHANS Bangalore',
        experience: '16 Years',
        fees: 1500,
        about: 'Dr. Vikram Bose is a NIMHANS-trained psychiatrist with over 16 years of experience in complex psychiatric conditions including treatment-resistant depression, psychosis, and addiction psychiatry.',
        address: { line1: 'Manipal Hospital, Whitefield', line2: 'Bangalore, Karnataka' },
        registration_Number: 'KMC-2008-BLR-21045',
        rating: 4.9,
    },

    // ══════════════════════════════════════════════════════════
    //  2. PSYCHOLOGIST (5 doctors)
    // ══════════════════════════════════════════════════════════
    {
        name: 'Dr. Kavitha Rao',
        email: 'kavitha.rao@safespace.com',
        image: 'https://randomuser.me/api/portraits/women/26.jpg',
        speciality: 'Psychologist',
        degree: 'M.Phil Clinical Psychology — NIMHANS',
        experience: '10 Years',
        fees: 800,
        about: 'Dr. Kavitha Rao is a clinical psychologist specialising in personality disorders, interpersonal conflict, and self-esteem issues. She uses an integrative therapeutic approach drawing from CBT, DBT, and mindfulness-based techniques.',
        address: { line1: 'Apollo Spectra, Koramangala', line2: 'Bangalore, Karnataka' },
        registration_Number: 'RCI-2014-KAR-40128',
        rating: 4.8,
    },
    {
        name: 'Dr. Amit Joshi',
        email: 'amit.joshi@safespace.com',
        image: 'https://randomuser.me/api/portraits/men/40.jpg',
        speciality: 'Psychologist',
        degree: 'PhD Psychology — Tata Institute of Social Sciences',
        experience: '12 Years',
        fees: 750,
        about: 'Dr. Amit Joshi is a research-backed psychologist focusing on depression, grief, and life transitions. He has worked with corporate clients and academic institutions to build mental wellness frameworks.',
        address: { line1: 'Breach Candy Hospital', line2: 'Mumbai, Maharashtra' },
        registration_Number: 'RCI-2012-MAH-29034',
        rating: 4.7,
    },
    {
        name: 'Dr. Ritu Malhotra',
        email: 'ritu.malhotra@safespace.com',
        image: 'https://randomuser.me/api/portraits/women/35.jpg',
        speciality: 'Psychologist',
        degree: 'M.Phil Clinical Psychology — Delhi University',
        experience: '8 Years',
        fees: 700,
        about: 'Dr. Ritu Malhotra specialises in adolescent psychology, family systems, and relationship counselling. She creates a warm, non-judgmental space for clients navigating identity, relationships, and academic pressures.',
        address: { line1: 'Moolchand Hospital, Lajpat Nagar', line2: 'New Delhi' },
        registration_Number: 'RCI-2016-DEL-37541',
        rating: 4.9,
    },
    {
        name: 'Dr. Sameer Pillai',
        email: 'sameer.pillai@safespace.com',
        image: 'https://randomuser.me/api/portraits/men/28.jpg',
        speciality: 'Psychologist',
        degree: 'MA Psychology, M.Phil — Bangalore University',
        experience: '6 Years',
        fees: 650,
        about: 'Dr. Sameer Pillai works with young adults navigating anxiety, career stress, and burnout. He blends solution-focused therapy with positive psychology techniques to help clients rediscover their sense of direction.',
        address: { line1: 'BGS Gleneagles Global Hospital', line2: 'Bangalore, Karnataka' },
        registration_Number: 'RCI-2018-KAR-51202',
        rating: 4.6,
    },
    {
        name: 'Dr. Ananya Krishnan',
        email: 'ananya.krishnan@safespace.com',
        image: 'https://randomuser.me/api/portraits/women/52.jpg',
        speciality: 'Psychologist',
        degree: 'M.Phil Clinical Psychology — Amrita Institute',
        experience: '9 Years',
        fees: 720,
        about: 'Dr. Ananya Krishnan is a clinical psychologist specialising in trauma, emotional dysregulation, and borderline personality patterns. She is trained in Schema Therapy and EMDR, offering evidence-based healing for deep-seated psychological pain.',
        address: { line1: 'KIMS Hospital, Trivandrum', line2: 'Kerala' },
        registration_Number: 'RCI-2015-KER-28410',
        rating: 4.8,
    },

    // ══════════════════════════════════════════════════════════
    //  3. ADHD SPECIALIST (4 doctors)
    // ══════════════════════════════════════════════════════════
    {
        name: 'Dr. Rohan Desai',
        email: 'rohan.desai@safespace.com',
        image: 'https://randomuser.me/api/portraits/men/47.jpg',
        speciality: 'ADHD Specialist',
        degree: 'MBBS, MD Psychiatry — Seth GS Medical College',
        experience: '8 Years',
        fees: 950,
        about: 'Dr. Rohan Desai is a neurodevelopmental specialist who has worked with over 500 adults diagnosed with ADHD. His approach combines pharmacological management with cognitive coaching, executive function training, and lifestyle restructuring.',
        address: { line1: 'Hinduja Hospital, Mahim', line2: 'Mumbai, Maharashtra' },
        registration_Number: 'MMC-2016-MUM-44110',
        rating: 4.8,
    },
    {
        name: 'Dr. Nandita Ghosh',
        email: 'nandita.ghosh@safespace.com',
        image: 'https://randomuser.me/api/portraits/women/38.jpg',
        speciality: 'ADHD Specialist',
        degree: 'MBBS, DPM, ADHD Certification — CHADD USA',
        experience: '11 Years',
        fees: 1000,
        about: 'Dr. Nandita Ghosh is a certified ADHD specialist with international training from CHADD. She works with both children and adults, offering comprehensive ADHD evaluations, medication reviews, and strategies for managing inattention and impulsivity.',
        address: { line1: 'Medica Superspecialty Hospital', line2: 'Kolkata, West Bengal' },
        registration_Number: 'WBC-2013-KOL-39821',
        rating: 4.9,
    },
    {
        name: 'Dr. Aditya Nair',
        email: 'aditya.nair@safespace.com',
        image: 'https://randomuser.me/api/portraits/men/63.jpg',
        speciality: 'ADHD Specialist',
        degree: 'MD Psychiatry — St. John\'s Medical College',
        experience: '7 Years',
        fees: 880,
        about: 'Dr. Aditya Nair specialises in adult ADHD, executive dysfunction, and co-morbid anxiety. He takes a structured, coaching-based approach to help clients improve time management, focus, and emotional regulation in daily life.',
        address: { line1: 'Sakra World Hospital, Marathahalli', line2: 'Bangalore, Karnataka' },
        registration_Number: 'KMC-2017-BLR-63041',
        rating: 4.7,
    },
    {
        name: 'Dr. Pooja Sharma',
        email: 'pooja.sharma@safespace.com',
        image: 'https://randomuser.me/api/portraits/women/19.jpg',
        speciality: 'ADHD Specialist',
        degree: 'MD Psychiatry, Fellowship Neurodevelopment — NIMHANS',
        experience: '13 Years',
        fees: 1100,
        about: 'Dr. Pooja Sharma is a NIMHANS fellowship-trained specialist in neurodevelopmental conditions. She provides in-depth ADHD assessments, psychoeducation sessions, and long-term support plans for individuals across the lifespan.',
        address: { line1: 'Nanavati Hospital, Vile Parle', line2: 'Mumbai, Maharashtra' },
        registration_Number: 'MMC-2011-MUM-29834',
        rating: 4.9,
    },

    // ══════════════════════════════════════════════════════════
    //  4. OCD THERAPIST (4 doctors)
    // ══════════════════════════════════════════════════════════
    {
        name: 'Dr. Suresh Iyer',
        email: 'suresh.iyer@safespace.com',
        image: 'https://randomuser.me/api/portraits/men/82.jpg',
        speciality: 'OCD Therapist',
        degree: 'M.Phil Clinical Psychology, ERP Certified',
        experience: '10 Years',
        fees: 850,
        about: 'Dr. Suresh Iyer is a certified ERP (Exposure and Response Prevention) therapist — the gold standard treatment for OCD. He has helped hundreds of patients break free from obsessive thought cycles and compulsive rituals through structured, gradual exposure work.',
        address: { line1: 'Gleneagles Global Health City', line2: 'Chennai, Tamil Nadu' },
        registration_Number: 'RCI-2014-TN-31028',
        rating: 4.9,
    },
    {
        name: 'Dr. Deepa Venkataraman',
        email: 'deepa.venkataraman@safespace.com',
        image: 'https://randomuser.me/api/portraits/women/74.jpg',
        speciality: 'OCD Therapist',
        degree: 'PhD Psychology — University of Hyderabad',
        experience: '9 Years',
        fees: 800,
        about: 'Dr. Deepa Venkataraman specialises in obsessive-compulsive disorder, contamination fears, and pure-O OCD. She integrates ERP with ACT (Acceptance and Commitment Therapy) to offer a comprehensive, modern approach to OCD treatment.',
        address: { line1: 'Yashoda Hospitals, Somajiguda', line2: 'Hyderabad, Telangana' },
        registration_Number: 'RCI-2015-TEL-44218',
        rating: 4.8,
    },
    {
        name: 'Dr. Kiran Reddy',
        email: 'kiran.reddy@safespace.com',
        image: 'https://randomuser.me/api/portraits/men/33.jpg',
        speciality: 'OCD Therapist',
        degree: 'MBBS, MD Psychiatry — Osmania Medical College',
        experience: '12 Years',
        fees: 950,
        about: 'Dr. Kiran Reddy is a psychiatrist with a dedicated OCD practice. He offers both medication management and psychotherapy coordination, working closely with psychologists to deliver integrated care for complex OCD presentations.',
        address: { line1: 'KIMS Hospital, Secunderabad', line2: 'Hyderabad, Telangana' },
        registration_Number: 'TSC-2012-HYD-28103',
        rating: 4.7,
    },
    {
        name: 'Dr. Meenakshi Subramanian',
        email: 'meenakshi.subramanian@safespace.com',
        image: 'https://randomuser.me/api/portraits/women/82.jpg',
        speciality: 'OCD Therapist',
        degree: 'M.Phil Clinical Psychology — University of Madras',
        experience: '7 Years',
        fees: 750,
        about: 'Dr. Meenakshi Subramanian works with adults and young adults experiencing OCD, health anxiety, and scrupulosity. She creates a structured, compassionate therapeutic environment where clients learn to tolerate uncertainty and reduce compulsive behaviours.',
        address: { line1: 'Sri Ramachandra Hospital', line2: 'Chennai, Tamil Nadu' },
        registration_Number: 'RCI-2017-TN-53012',
        rating: 4.8,
    },

    // ══════════════════════════════════════════════════════════
    //  5. CBT THERAPIST (5 doctors)
    // ══════════════════════════════════════════════════════════
    {
        name: 'Dr. Nikhil Verma',
        email: 'nikhil.verma@safespace.com',
        image: 'https://randomuser.me/api/portraits/men/21.jpg',
        speciality: 'CBT Therapist',
        degree: 'M.Phil Clinical Psychology, CBT Diploma — Beck Institute',
        experience: '8 Years',
        fees: 700,
        about: 'Dr. Nikhil Verma is trained directly at the Beck Institute — the birthplace of Cognitive Behavioural Therapy. He specialises in using CBT for depression, anxiety, low self-worth, and negative core beliefs, helping clients build lasting mental resilience.',
        address: { line1: 'Fortis Memorial Research Institute', line2: 'Gurugram, Haryana' },
        registration_Number: 'RCI-2016-HAR-39210',
        rating: 4.8,
    },
    {
        name: 'Dr. Tanya Malviya',
        email: 'tanya.malviya@safespace.com',
        image: 'https://randomuser.me/api/portraits/women/29.jpg',
        speciality: 'CBT Therapist',
        degree: 'MA Psychology, PG Diploma CBT — TISS Mumbai',
        experience: '6 Years',
        fees: 650,
        about: 'Dr. Tanya Malviya specialises in CBT for social anxiety, phobias, and generalised anxiety disorder. Her sessions are structured around identifying cognitive distortions and rebuilding more realistic, adaptive thought patterns.',
        address: { line1: 'Wockhardt Hospital, Mumbai Central', line2: 'Mumbai, Maharashtra' },
        registration_Number: 'RCI-2018-MAH-47830',
        rating: 4.7,
    },
    {
        name: 'Dr. Sanjay Kulkarni',
        email: 'sanjay.kulkarni@safespace.com',
        image: 'https://randomuser.me/api/portraits/men/58.jpg',
        speciality: 'CBT Therapist',
        degree: 'PhD Psychology — University of Pune',
        experience: '14 Years',
        fees: 900,
        about: 'Dr. Sanjay Kulkarni brings over 14 years of CBT practice to his work with chronic anxiety, health anxiety, and insomnia (CBT-I). He has conducted workshops and trained therapists across Maharashtra in evidence-based CBT techniques.',
        address: { line1: 'Ruby Hall Clinic, Pune Camp', line2: 'Pune, Maharashtra' },
        registration_Number: 'RCI-2010-MAH-17042',
        rating: 4.9,
    },
    {
        name: 'Dr. Ishita Sen',
        email: 'ishita.sen@safespace.com',
        image: 'https://randomuser.me/api/portraits/women/67.jpg',
        speciality: 'CBT Therapist',
        degree: 'M.Phil Psychology — Jadavpur University',
        experience: '5 Years',
        fees: 600,
        about: 'Dr. Ishita Sen works primarily with young adults experiencing academic burnout, perfectionism, and exam-related anxiety. Her CBT approach is practical and goal-oriented, helping clients make meaningful progress in a short period.',
        address: { line1: 'Medica Superspecialty, Salt Lake', line2: 'Kolkata, West Bengal' },
        registration_Number: 'RCI-2019-WB-61034',
        rating: 4.6,
    },
    {
        name: 'Dr. Arvind Choudhary',
        email: 'arvind.choudhary@safespace.com',
        image: 'https://randomuser.me/api/portraits/men/77.jpg',
        speciality: 'CBT Therapist',
        degree: 'MA Clinical Psychology — Rajasthan University, CBT Certified',
        experience: '10 Years',
        fees: 750,
        about: 'Dr. Arvind Choudhary has over a decade of experience delivering CBT for workplace stress, chronic worry, and adjustment disorders. He combines structured CBT with mindfulness practices to deliver integrated, durable relief.',
        address: { line1: 'Santokba Durlabhji Memorial Hospital', line2: 'Jaipur, Rajasthan' },
        registration_Number: 'RCI-2014-RAJ-38902',
        rating: 4.7,
    },

    // ══════════════════════════════════════════════════════════
    //  6. ANXIETY & STRESS (5 doctors)
    // ══════════════════════════════════════════════════════════
    {
        name: 'Dr. Harini Krishnamurthy',
        email: 'harini.krishnamurthy@safespace.com',
        image: 'https://randomuser.me/api/portraits/women/14.jpg',
        speciality: 'Anxiety & Stress',
        degree: 'M.Phil Clinical Psychology — Bangalore University',
        experience: '9 Years',
        fees: 700,
        about: 'Dr. Harini Krishnamurthy is an anxiety specialist with a deep focus on panic disorder, social anxiety, and performance anxiety. She uses a blend of CBT, mindfulness-based stress reduction (MBSR), and biofeedback techniques.',
        address: { line1: 'Narayana Health, Electronic City', line2: 'Bangalore, Karnataka' },
        registration_Number: 'RCI-2015-KAR-29018',
        rating: 4.8,
    },
    {
        name: 'Dr. Abhinav Saxena',
        email: 'abhinav.saxena@safespace.com',
        image: 'https://randomuser.me/api/portraits/men/14.jpg',
        speciality: 'Anxiety & Stress',
        degree: 'MBBS, DPM — GSVM Medical College',
        experience: '7 Years',
        fees: 800,
        about: 'Dr. Abhinav Saxena treats generalised anxiety disorder, workplace burnout, and stress-related psychosomatic complaints. He helps clients regain control through a structured combination of medication, therapy, and stress-management coaching.',
        address: { line1: 'Regency Hospital, Swaroop Nagar', line2: 'Kanpur, Uttar Pradesh' },
        registration_Number: 'UPC-2017-KNP-44130',
        rating: 4.7,
    },
    {
        name: 'Dr. Lavanya Suresh',
        email: 'lavanya.suresh@safespace.com',
        image: 'https://randomuser.me/api/portraits/women/55.jpg',
        speciality: 'Anxiety & Stress',
        degree: 'MA Counselling Psychology — Christ University',
        experience: '6 Years',
        fees: 650,
        about: 'Dr. Lavanya Suresh is a counselling psychologist who focuses on acute and chronic stress, health anxiety, and body-related worry. She incorporates breathing techniques, somatic awareness, and relaxation training into her therapeutic practice.',
        address: { line1: 'Jayadeva Institute, Bannerghatta Road', line2: 'Bangalore, Karnataka' },
        registration_Number: 'RCI-2018-KAR-55340',
        rating: 4.6,
    },
    {
        name: 'Dr. Gaurav Pandey',
        email: 'gaurav.pandey@safespace.com',
        image: 'https://randomuser.me/api/portraits/men/66.jpg',
        speciality: 'Anxiety & Stress',
        degree: 'MD Psychiatry — Lucknow Medical College',
        experience: '11 Years',
        fees: 900,
        about: 'Dr. Gaurav Pandey is a psychiatrist with an anxiety-focused practice. He manages treatment-resistant anxiety disorders with both pharmacological and psychotherapeutic interventions, offering a comprehensive second opinion for complex anxiety cases.',
        address: { line1: 'Era\'s Lucknow Medical College', line2: 'Lucknow, Uttar Pradesh' },
        registration_Number: 'UPC-2013-LKO-21870',
        rating: 4.8,
    },
    {
        name: 'Dr. Sunita Rajput',
        email: 'sunita.rajput@safespace.com',
        image: 'https://randomuser.me/api/portraits/women/42.jpg',
        speciality: 'Anxiety & Stress',
        degree: 'M.Phil Clinical Psychology — SNDT University',
        experience: '8 Years',
        fees: 700,
        about: 'Dr. Sunita Rajput helps clients navigate chronic stress, exam anxiety, and generalised worry using CBT and Acceptance-Commitment Therapy (ACT). She is particularly experienced working with competitive exam aspirants and corporate professionals.',
        address: { line1: 'KEM Hospital, Parel', line2: 'Mumbai, Maharashtra' },
        registration_Number: 'RCI-2016-MAH-49011',
        rating: 4.7,
    },

    // ══════════════════════════════════════════════════════════
    //  7. DEPRESSION COUNSELOR (5 doctors)
    // ══════════════════════════════════════════════════════════
    {
        name: 'Dr. Meghna Das',
        email: 'meghna.das@safespace.com',
        image: 'https://randomuser.me/api/portraits/women/6.jpg',
        speciality: 'Depression Counselor',
        degree: 'M.Phil Clinical Psychology — NIMHANS',
        experience: '10 Years',
        fees: 750,
        about: 'Dr. Meghna Das is a NIMHANS-trained clinical psychologist specialising in major depressive disorder, dysthymia, and seasonal affective disorder. She uses a warm, person-centred approach combined with structured CBT protocols.',
        address: { line1: 'NIMHANS Campus Outpatient', line2: 'Bangalore, Karnataka' },
        registration_Number: 'RCI-2014-KAR-30128',
        rating: 4.9,
    },
    {
        name: 'Dr. Prateek Singh',
        email: 'prateek.singh@safespace.com',
        image: 'https://randomuser.me/api/portraits/men/10.jpg',
        speciality: 'Depression Counselor',
        degree: 'MA Counselling Psychology — Symbiosis Pune',
        experience: '6 Years',
        fees: 600,
        about: 'Dr. Prateek Singh works with clients experiencing moderate depression, low motivation, and existential emptiness. His therapy approach draws from Interpersonal Therapy (IPT) and Behavioural Activation — practical tools that help clients rebuild engagement with life.',
        address: { line1: 'Columbia Asia Hospital, Kharadi', line2: 'Pune, Maharashtra' },
        registration_Number: 'RCI-2018-MAH-52014',
        rating: 4.7,
    },
    {
        name: 'Dr. Padmavathi Iyengar',
        email: 'padmavathi.iyengar@safespace.com',
        image: 'https://randomuser.me/api/portraits/women/77.jpg',
        speciality: 'Depression Counselor',
        degree: 'PhD Psychology — University of Mysore',
        experience: '15 Years',
        fees: 950,
        about: 'Dr. Padmavathi Iyengar is one of the most experienced depression counsellors on our platform. With 15 years of clinical work, she has helped hundreds of patients emerge from chronic depression using integrative, culturally sensitive therapy.',
        address: { line1: 'JSS Hospital, Mysore Road', line2: 'Mysore, Karnataka' },
        registration_Number: 'RCI-2009-KAR-14201',
        rating: 4.9,
    },
    {
        name: 'Dr. Rajesh Tripathi',
        email: 'rajesh.tripathi@safespace.com',
        image: 'https://randomuser.me/api/portraits/men/50.jpg',
        speciality: 'Depression Counselor',
        degree: 'MBBS, DPM — BHU Varanasi',
        experience: '12 Years',
        fees: 850,
        about: 'Dr. Rajesh Tripathi manages depression with a dual approach — pharmacotherapy where clinically indicated, and structured counselling using IPT and mindfulness. He has worked extensively with college students, first-generation professionals, and rural populations.',
        address: { line1: 'Sir Sunderlal Hospital, BHU', line2: 'Varanasi, Uttar Pradesh' },
        registration_Number: 'UPC-2012-VNS-28930',
        rating: 4.8,
    },
    {
        name: 'Dr. Shobha Menon',
        email: 'shobha.menon@safespace.com',
        image: 'https://randomuser.me/api/portraits/women/89.jpg',
        speciality: 'Depression Counselor',
        degree: 'M.Phil Clinical Psychology — Amrita Institute Kochi',
        experience: '8 Years',
        fees: 700,
        about: 'Dr. Shobha Menon counsels individuals navigating relationship-induced depression, grief, and job loss. She creates a deeply empathetic space where clients feel heard, validated, and gradually guided toward hope and self-compassion.',
        address: { line1: 'Amrita Institute of Medical Sciences', line2: 'Kochi, Kerala' },
        registration_Number: 'RCI-2016-KER-40512',
        rating: 4.8,
    },

    // ══════════════════════════════════════════════════════════
    //  8. TRAUMA & PTSD (4 doctors)
    // ══════════════════════════════════════════════════════════
    {
        name: 'Dr. Ashwin Ghoshal',
        email: 'ashwin.ghoshal@safespace.com',
        image: 'https://randomuser.me/api/portraits/men/42.jpg',
        speciality: 'Trauma & PTSD',
        degree: 'MBBS, MD Psychiatry, EMDR Certified Level II',
        experience: '13 Years',
        fees: 1100,
        about: 'Dr. Ashwin Ghoshal is a Level II EMDR-certified trauma specialist. He has worked with survivors of abuse, accidents, medical trauma, and disaster events. His calm, structured approach helps patients process traumatic memories safely and rebuild their lives.',
        address: { line1: 'Belle Vue Clinic, Park Street', line2: 'Kolkata, West Bengal' },
        registration_Number: 'WBC-2011-KOL-19823',
        rating: 4.9,
    },
    {
        name: 'Dr. Nalini Chandrasekhar',
        email: 'nalini.chandrasekhar@safespace.com',
        image: 'https://randomuser.me/api/portraits/women/33.jpg',
        speciality: 'Trauma & PTSD',
        degree: 'M.Phil Clinical Psychology — Madras University, TF-CBT Trained',
        experience: '11 Years',
        fees: 950,
        about: 'Dr. Nalini Chandrasekhar is a trauma-focused CBT (TF-CBT) specialist trained to work with adult and childhood trauma. She focuses on dissociation, complex PTSD, and trauma bonding, offering one of the most comprehensive trauma therapy practices in South India.',
        address: { line1: 'Fortis Malar Hospital, Adyar', line2: 'Chennai, Tamil Nadu' },
        registration_Number: 'RCI-2013-TN-28930',
        rating: 4.9,
    },
    {
        name: 'Dr. Vikrant Agarwal',
        email: 'vikrant.agarwal@safespace.com',
        image: 'https://randomuser.me/api/portraits/men/61.jpg',
        speciality: 'Trauma & PTSD',
        degree: 'MD Psychiatry — JIPMER Puducherry',
        experience: '9 Years',
        fees: 1000,
        about: 'Dr. Vikrant Agarwal specialises in combat trauma, first-responder PTSD, and acute stress reactions. He uses Prolonged Exposure Therapy (PE) and narrative therapy to help clients regain a sense of control and safety after traumatic events.',
        address: { line1: 'JIPMER Outpatient Department', line2: 'Puducherry' },
        registration_Number: 'TNMC-2015-PUD-33104',
        rating: 4.8,
    },
    {
        name: 'Dr. Reena Bhatia',
        email: 'reena.bhatia@safespace.com',
        image: 'https://randomuser.me/api/portraits/women/48.jpg',
        speciality: 'Trauma & PTSD',
        degree: 'MA Psychology, EMDR Certified — EMDR Association India',
        experience: '10 Years',
        fees: 900,
        about: 'Dr. Reena Bhatia is an EMDR-certified trauma therapist who works with survivors of domestic violence, childhood neglect, and complex relational trauma. She offers safe, structured trauma processing with a strong emphasis on somatic awareness and resourcing.',
        address: { line1: 'Medanta The Medicity, Sector 38', line2: 'Gurugram, Haryana' },
        registration_Number: 'RCI-2014-HAR-41209',
        rating: 4.8,
    },
]

// ─── Seed Function ─────────────────────────────────────────────────────────────
async function seed() {
    console.log('\n🌱  SafeSpace Doctor Seed Script')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

    try {
        await mongoose.connect(MONGODB_URI)
        console.log('✅  Connected to MongoDB Atlas — SafeSpace DB\n')

        const DEFAULT_PASSWORD_HASH = await bcrypt.hash('SafeSpace@2024', 10)
        const now = Date.now()
        let inserted = 0
        let skipped = 0

        for (const doc of doctors) {
            const exists = await Doctor.findOne({ email: doc.email })
            if (exists) {
                console.log(`⏩  Skipped (already exists): ${doc.name}`)
                skipped++
                continue
            }

            await Doctor.create({
                ...doc,
                password: DEFAULT_PASSWORD_HASH,
                slots_booked: {},
                date: now,
                available: true,
            })

            console.log(`✅  Inserted: ${doc.name} — ${doc.speciality}`)
            inserted++
        }

        console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
        console.log(`🎉  Done! Inserted: ${inserted} | Skipped: ${skipped} | Total: ${doctors.length}`)
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

    } catch (err) {
        console.error('\n❌  Error:', err.message)
    } finally {
        await mongoose.disconnect()
        console.log('🔌  Disconnected from MongoDB\n')
        process.exit(0)
    }
}

seed()
