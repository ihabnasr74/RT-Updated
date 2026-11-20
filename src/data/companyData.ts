export interface BilingualText {
  en: string;
  ar: string;
}

export interface CoreValueEntry extends BilingualText {
  id: string;
  number: string;
  iconKey: 'accuracy' | 'confidentiality' | 'deadlines' | 'triangle';
}

export interface TranslationServiceEntry extends BilingualText {
  id: string;
  number: string;
  imageSrc: string;
  imageAlt: string;
}

export interface OtherServiceEntry extends BilingualText {
  id: string;
  number: string;
}

export interface ProcessStepEntry extends BilingualText {
  step: number;
}

export const BRAND_DATA = {
  logoPrimary: 'Rowad Al Tamayuz',
  logoSecondary: 'Translation Services',
  heroTitleEn: 'Rowad Al Tamayuz Translation and Transactions Processing Services',
  heroTitleAr: 'رواد التميّز لخدمات الترجمة وتخليص المعاملات',
} as const;

export const SECTION_TITLES = {
  companyProfile: {
    en: 'Company Profile',
    ar: 'الملف التعريفي',
  },
  coreValues: {
    en: 'Our Core Values',
    ar: 'قيّمنا الجوهرية',
  },
  specializedServices: {
    en: 'Our Specialized Services',
    ar: 'خدماتنا المتخصصة',
  },
  translationServicesPillar: {
    numEn: '1',
    numAr: '١',
    en: 'Translation Services',
    ar: 'خدمات الترجمة',
  },
  otherServicesPillar: {
    numEn: '2',
    numAr: '٢',
    en: 'Other Services',
    ar: 'خدماتنا الأخرى',
  },
  translationRequestProcess: {
    en: 'Translation Request Process',
    ar: 'إجراءات طلب الترجمة',
  },
  communicationChannels: {
    en: 'Communication Channels',
    ar: 'قنوات التواصل',
  },
} as const;

export const COMPANY_PROFILE_DATA = {
  paragraphsEn: [
    'Rowad Al-Tamayuz Translation Services Company is one of the leading and most trusted providers of language solutions and services, delivered with the utmost accuracy and professionalism. We take pride in meeting the needs of the business, legal, medical, and government sectors, as well as other sectors.',
    'Our company brings together a select group of certified translators and language experts to ensure that translated documents meet the highest regulatory and professional standards, both locally and internationally.',
  ],
  paragraphsAr: [
    'تُعد شركة رواد التميّز لخدمات الترجمة من إحدى الشركات الرائدة والموثوقة لتقديم الحلول والخدمات اللغوية المتبادلة بدقة متناهية وسياق احترافي. نفخر بتلبية متطلبات القطاعات التجارية والقانونية والطبية والحكومية، إلى جانب القطاعات الأخرى.',
    'تضم شركتنا نخبة من المترجمين المعتمدين والخبراء اللغويين، وذلك لضمان مطابقة المستندات المترجمة لأعلى المعايير التنظيمية والمهنية على الصعيدين المحلي والدولي.',
  ],
  imageSrc: '/src/assets/images/tech_translation_hub_1795073476961.jpg',
  imageAlt: 'Rowad Al Tamayuz Translation Services',
} as const;

export const CORE_VALUES_DATA: CoreValueEntry[] = [
  {
    id: 'accuracy',
    number: '1',
    iconKey: 'accuracy',
    en: 'Exemplary linguistic and technical accuracy',
    ar: 'الدقة اللغوية والتقنية المثالية',
  },
  {
    id: 'confidentiality',
    number: '2',
    iconKey: 'confidentiality',
    en: 'Complete confidentiality and protection of data and document privacy',
    ar: 'السرية التامة وحماية خصوصية البيانات والمستندات',
  },
  {
    id: 'deadlines',
    number: '3',
    iconKey: 'deadlines',
    en: 'Strict adherence to specified deadlines',
    ar: 'الالتزام الدقيق بمواعيد التسليم المحددة',
  },
  {
    id: 'golden-triangle',
    number: '4',
    iconKey: 'triangle',
    en: '[Quality, Precision, and Craftsmanship]: The “Golden Triangle” that sets us apart from others in the industry.',
    ar: 'المثلث الذهبي الذي يميّزنا عن غيرنا في الـ:[الجودة والدقة والإتقان]',
  },
];

export const TRANSLATION_SERVICES_DATA: TranslationServiceEntry[] = [
  {
    id: 'legal',
    number: '1',
    en: 'Legal translation services for all documents English to Arabic and vice versa and other languages if required.',
    ar: 'خدمات الترجمة القانونية لجميع الوثائق من الإنجليزية إلى العربية والعكس، وللغات أخرى حسب الطلب',
    imageSrc: '/src/assets/images/tech_legal_digital_1795073473318.jpg',
    imageAlt: 'Legal translation services',
  },
  {
    id: 'commercial',
    number: '2',
    en: 'Commercial Translation',
    ar: 'الترجمة التجارية',
    imageSrc: '/src/assets/images/tech_translation_hub_1795073476961.jpg',
    imageAlt: 'Commercial Translation',
  },
  {
    id: 'technical',
    number: '3',
    en: 'Technical Translation',
    ar: 'الترجمة التقنية',
    imageSrc: '/src/assets/images/tech_neural_matrix_1795073479144.jpg',
    imageAlt: 'Technical Translation',
  },
  {
    id: 'specialized',
    number: '4',
    en: 'Specialized Translation, including: [Translation of academic and university research, media materials, and marketing content, with comprehensive proofreading and editing performed professionally, accurately, and with precision]',
    ar: 'الترجمة المتخصصة، وتشمل: [ترجمة البحوث الأكاديمية والجامعية والمواد الإعلامية والمحتوى التسويقي مع التدقيق والتحرير الشاملين بمهنية ودقة وإتقان]',
    imageSrc: '/src/assets/images/tech_neural_matrix_1795073479144.jpg',
    imageAlt: 'Specialized Translation',
  },
];

export const OTHER_SERVICES_DATA: OtherServiceEntry[] = [
  {
    id: 'business-setup',
    number: '1',
    en: 'Business Setup and Company formation.',
    ar: 'تأسيس الأعمال والشركات',
  },
  {
    id: 'drafting-contracts',
    number: '2',
    en: 'Drafting contracts, agreements, and memoranda of understanding (MoU)',
    ar: 'صياغة العقود والاتفاقيات ومذكرات التفاهم',
  },
  {
    id: 'moa-amendments',
    number: '3',
    en: 'Memorandums of Association (MOA), Amendments, and Other Related Documents.',
    ar: 'عقود التأسيس والملاحق، وما إلى ذلك',
  },
  {
    id: 'notary-public',
    number: '4',
    en: 'Notary Public Services',
    ar: 'خدمات الكاتب العدل',
  },
  {
    id: 'courts-prosecution',
    number: '5',
    en: 'Courts and Public Prosecution Services',
    ar: 'خدمات المحاكم والنيابة العامة',
  },
  {
    id: 'degree-recognition',
    number: '6',
    en: 'Degree Recognition Serviced',
    ar: 'خدمات اعتماد الشهادات الجامعية',
  },
  {
    id: 'printing',
    number: '7',
    en: 'Printing services',
    ar: 'خدمات الطباعة',
  },
  {
    id: 'pr-representative',
    number: '8',
    en: 'Public Relations Representative Services',
    ar: 'خدمات تمثيل العلاقات العامة',
  },
  {
    id: 'attestation',
    number: '9',
    en: 'Attestation Services',
    ar: 'خدمات التصديق',
  },
  {
    id: 'transactions-processing',
    number: '10',
    en: 'Transactions Processing',
    ar: 'تخليص المعاملات',
  },
];

export const PROCESS_STEPS_DATA: ProcessStepEntry[] = [
  {
    step: 1,
    en: 'Share your document with us via: WhatsApp, Email',
    ar: 'أرسل المستند إلينا عبر الواتساب أو البريد الإلكتروني',
  },
  {
    step: 2,
    en: 'We respond promptly, acknowledging the receipt of the document required to be translated.',
    ar: 'نقوم بالرد سريعاً لتأكيد استلام المستند المطلوب ترجمته',
  },
  {
    step: 3,
    en: 'We evaluate the document, determine the target language, turnaround time, and cost, and commence the translation process as agreed.',
    ar: 'نقوم بمراجعة المستند وتحديد اللغة المطلوبة للترجمة والمدة الزمنية اللازمة للتنفيذ والتكلفة ثم نبدأ عملية الترجمة وفقاً لما تم الاتفاق عليه',
  },
  {
    step: 4,
    en: 'Payment is made through bank transfer',
    ar: 'يتم سداد قيمة الخدمة عن طريق التحويل البنكي',
  },
  {
    step: 5,
    en: 'Translated document shall be sent either through email or WhatsApp, as per the client convenient.',
    ar: 'يتم إرسال المستند المترجم إما عبر البريد الإلكتروني أو الواتساب، وفقاً لما يناسب العميل',
  },
  {
    step: 6,
    en: 'Client shall receive the translated document in PDF or Word Document format',
    ar: 'يستلم العميل المستند المترجم بصيغة PDF أو مستند Word',
  },
];

export const COMMUNICATION_DATA = {
  promptEn: 'You may reach us through the following communication channels:',
  promptAr: 'بإمكانكم التواصل معنا عبر قنوات التواصل التالية',
  emailLabel: 'Email',
  emails: ['Sami.legal@outlook.com', 'SamiTranslation@outlook.com'] as const,
  whatsappLabel: 'Whatsapp',
  whatsappDisplay: '+971 50 509 5759',
  whatsappRaw: '971505095759',
  backdropImageSrc: '/src/assets/images/contact_communication_backdrop_1794992091947.jpg',
} as const;
