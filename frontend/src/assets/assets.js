import appointment_img from './appointment_img.png'
import header_img from './header_img.png'
import group_profiles from './group_profiles.png'
import profile_pic from './profile_pic.png'
import contact_image from './contact_image.png'
import about_image from './about_image.png'
import logo from './logo.PNG'
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
import stripe_logo from './stripe_logo.png'
import razorpay_logo from './razorpay_logo.png'
import doc1 from './doc1.png'
import doc2 from './doc2.png'
import doc3 from './doc3.png'
import doc4 from './doc4.png'
import doc5 from './doc5.png'
import doc6 from './doc6.png'
import doc7 from './doc7.png'
import doc8 from './doc8.png'
import doc9 from './doc9.png'
import doc10 from './doc10.png'
import doc11 from './doc11.png'
import doc12 from './doc12.png'
import doc13 from './doc13.png'
import doc14 from './doc14.png'
import doc15 from './doc15.png'
import Psychiatrist from './Psychiatrist.svg'
import Psychologist from './Psychologist.svg'
import ADHD_Specialist from './ADHD_Specialist.svg'
import OCD_Therapist from './OCD_Therapist.svg'
import CBT_Therapist from './CBT_Therapist.svg'
import Anxiety_Stress from './Anxiety_Stress.svg'
import Depression_Counselor from './Depression_Counselor.svg'
import Trauma_PTSD from './Trauma_PTSD.svg'


export const assets = {
    appointment_img,
    header_img,
    group_profiles,
    logo,
    chats_icon,
    verified_icon,
    info_icon,
    profile_pic,
    arrow_icon,
    contact_image,
    about_image,
    menu_icon,
    cross_icon,
    dropdown_icon,
    upload_icon,
    stripe_logo,
    razorpay_logo
}

export const specialityData = [
    {
        speciality: 'Psychiatrist',
        image: Psychiatrist
    },
    {
        speciality: 'Psychologist',
        image: Psychologist
    },
    {
        speciality: 'ADHD Specialist',
        image: ADHD_Specialist
    },
    {
        speciality: 'OCD Therapist',
        image: OCD_Therapist
    },
    {
        speciality: 'CBT Therapist',
        image: CBT_Therapist
    },
    {
        speciality: 'Anxiety & Stress',
        image: Anxiety_Stress
    },
    {
        speciality: 'Depression Counselor',
        image: Depression_Counselor
    },
    {
        speciality: 'Trauma & PTSD',
        image: Trauma_PTSD
    },
]

export const doctors = [
    {
        _id: 'doc1',
        name: 'Dr. Richard James',
        image: doc1,
        speciality: 'Psychiatrist',
        degree: 'MD, Psychiatry',
        experience: '8 Years',
        about: 'Dr. James is a compassionate psychiatrist specializing in mood disorders, anxiety, and complex mental health conditions. He combines evidence-based pharmacotherapy with psychotherapeutic approaches to provide holistic, patient-centered care. His practice emphasizes building trust, reducing stigma, and empowering patients on their healing journey.',
        fees: 50,
        address: {
            line1: '17th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc2',
        name: 'Dr. Emily Larson',
        image: doc2,
        speciality: 'Psychologist',
        degree: 'PhD, Clinical Psychology',
        experience: '6 Years',
        about: 'Dr. Larson is a licensed clinical psychologist with expertise in cognitive-behavioral therapy, trauma-informed care, and relationship counseling. She creates a safe and non-judgmental space for clients to explore their emotions, develop coping strategies, and build lasting resilience.',
        fees: 60,
        address: {
            line1: '27th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc3',
        name: 'Dr. Sarah Patel',
        image: doc3,
        speciality: 'ADHD Specialist',
        degree: 'MD, Child & Adult Psychiatry',
        experience: '5 Years',
        about: 'Dr. Patel specializes in diagnosing and treating ADHD across all age groups. She uses comprehensive assessment tools and personalized treatment plans combining behavioral therapy, coaching strategies, and medication management when needed to help patients thrive in daily life.',
        fees: 30,
        address: {
            line1: '37th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc4',
        name: 'Dr. Christopher Lee',
        image: doc4,
        speciality: 'OCD Therapist',
        degree: 'PsyD, Clinical Psychology',
        experience: '7 Years',
        about: 'Dr. Lee is an OCD and anxiety specialist who uses Exposure and Response Prevention (ERP) therapy, the gold-standard treatment for OCD. He helps patients confront their fears systematically and reduce compulsive behaviors, guiding them toward a life no longer ruled by intrusive thoughts.',
        fees: 40,
        address: {
            line1: '47th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc5',
        name: 'Dr. Jennifer Garcia',
        image: doc5,
        speciality: 'CBT Therapist',
        degree: 'MSc, Cognitive Behavioural Therapy',
        experience: '9 Years',
        about: 'Dr. Garcia is a certified CBT therapist helping individuals overcome negative thought patterns, phobias, depression, and panic disorders. Her structured, goal-oriented approach equips clients with practical tools they can use independently, creating lasting positive change.',
        fees: 50,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc6',
        name: 'Dr. Andrew Williams',
        image: doc6,
        speciality: 'Anxiety & Stress',
        degree: 'MD, Psychiatry',
        experience: '6 Years',
        about: 'Dr. Williams specializes in anxiety disorders, stress management, and burnout recovery. He integrates mindfulness-based stress reduction (MBSR), acceptance and commitment therapy (ACT), and pharmacotherapy to help clients regain balance, calm, and confidence in their lives.',
        fees: 50,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc7',
        name: 'Dr. Christopher Davis',
        image: doc7,
        speciality: 'Psychiatrist',
        degree: 'MD, Psychiatry',
        experience: '11 Years',
        about: 'Dr. Davis brings over a decade of experience in adult psychiatry. He specializes in bipolar disorder, schizophrenia, and treatment-resistant depression. His compassionate, evidence-based approach focuses on medication optimization and long-term mental wellness planning.',
        fees: 50,
        address: {
            line1: '17th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc8',
        name: 'Dr. Timothy White',
        image: doc8,
        speciality: 'Depression Counselor',
        degree: 'MA, Counselling Psychology',
        experience: '4 Years',
        about: 'Dr. White is a compassionate depression counselor who helps individuals navigate through feelings of hopelessness, grief, and low mood. Using person-centered therapy and behavioral activation techniques, he guides clients toward rediscovering meaning, purpose, and joy.',
        fees: 60,
        address: {
            line1: '27th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc9',
        name: 'Dr. Ava Mitchell',
        image: doc9,
        speciality: 'Trauma & PTSD',
        degree: 'PhD, Trauma Psychology',
        experience: '7 Years',
        about: 'Dr. Mitchell is a trauma-informed therapist specializing in PTSD, complex trauma, and emotional dysregulation. She uses EMDR (Eye Movement Desensitization and Reprocessing) and somatic therapies to help survivors process traumatic experiences and reclaim their sense of safety.',
        fees: 30,
        address: {
            line1: '37th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc10',
        name: 'Dr. Jeffrey King',
        image: doc10,
        speciality: 'ADHD Specialist',
        degree: 'MD, Behavioral Neurology',
        experience: '10 Years',
        about: 'Dr. King is a behavioral neurologist and ADHD specialist with expertise in both pediatric and adult ADHD presentations. He provides comprehensive evaluations, executive function coaching, and multimodal treatment planning to unlock each patient\'s full potential.',
        fees: 40,
        address: {
            line1: '47th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc11',
        name: 'Dr. Zoe Kelly',
        image: doc11,
        speciality: 'Anxiety & Stress',
        degree: 'DClinPsy, Clinical Psychology',
        experience: '8 Years',
        about: 'Dr. Kelly is a specialist in anxiety, panic disorder, and social anxiety. She uses an integrative approach combining CBT, breathing regulation, and nervous system regulation techniques. Her warm, collaborative style helps clients build courage and reclaim their lives from anxiety.',
        fees: 50,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc12',
        name: 'Dr. Patrick Harris',
        image: doc12,
        speciality: 'CBT Therapist',
        degree: 'MSc, Psychological Therapies',
        experience: '6 Years',
        about: 'Dr. Harris is an accredited CBT therapist skilled in treating health anxiety, perfectionism, and workplace-related stress. He tailors each therapy program to the individual, using structured sessions and practical exercises that clients can continue independently after therapy ends.',
        fees: 50,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc13',
        name: 'Dr. Chloe Evans',
        image: doc13,
        speciality: 'Psychologist',
        degree: 'PhD, Psychology',
        experience: '5 Years',
        about: 'Dr. Evans is a clinical psychologist specializing in relationship issues, self-esteem, and identity challenges. She uses a blend of psychodynamic and humanistic approaches, helping clients gain insight into unconscious patterns and develop a stronger, more authentic sense of self.',
        fees: 50,
        address: {
            line1: '17th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc14',
        name: 'Dr. Ryan Martinez',
        image: doc14,
        speciality: 'Depression Counselor',
        degree: 'MA, Psychotherapy',
        experience: '9 Years',
        about: 'Dr. Martinez specializes in depression, emotional exhaustion, and life transitions. He uses an integrative therapeutic model combining motivational interviewing, mindfulness, and solution-focused therapy to help clients break free from depressive cycles and rebuild a fulfilling life.',
        fees: 60,
        address: {
            line1: '27th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc15',
        name: 'Dr. Amelia Hill',
        image: doc15,
        speciality: 'Trauma & PTSD',
        degree: 'MSc, Trauma-Informed Therapy',
        experience: '12 Years',
        about: 'Dr. Hill is an expert in complex trauma, childhood adversity, and dissociative disorders. With over a decade of experience, she uses Sensorimotor Psychotherapy and narrative approaches to help clients move from survival to genuine healing, building resilience and post-traumatic growth.',
        fees: 30,
        address: {
            line1: '37th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
]