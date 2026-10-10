export type HealthStatus = 'low' | 'normal' | 'borderline' | 'high' | 'urgent';

export interface EvaluationResult {
  status: HealthStatus;
  ruleText: {
    en: string;
    hi: string;
    mr: string;
  };
  isValid: boolean;
  errorMessage?: string;
}

export interface ReadingInput {
  fastingGlucose?: number;
  ppbsGlucose?: number;
  hba1c?: number;
  systolic?: number;
  diastolic?: number;
}

export const mmolToMgDl = (mmol: number): number => Math.round(mmol * 18.0156);
export const mmolMolToPercent = (mmolMol: number): number => Number((0.0915 * mmolMol + 2.15).toFixed(1));

export const evaluateFastingGlucose = (val: number): EvaluationResult => {
  if (val < 20 || val > 800) {
    return { isValid: false, status: 'normal', ruleText: { en: '', hi: '', mr: '' }, errorMessage: 'Out of clinical range (20-800 mg/dL)' };
  }
  if (val < 70) {
    return {
      isValid: true,
      status: 'low',
      ruleText: {
        en: 'Fasting glucose under 70 mg/dL indicates hypoglycemia (low sugar).',
        hi: 'फास्टिंग ग्लूकोज 70 mg/dL से कम हाइपोग्लाइसीमिया (निम्न शुगर) दर्शाता है।',
        mr: 'उपवासातील साखर 70 mg/dL पेक्षा कमी असणे म्हणजे कमी साखरेची पातळी (हायपोग्लायसेमिया).'
      }
    };
  }
  if (val <= 99) {
    return {
      isValid: true,
      status: 'normal',
      ruleText: {
        en: 'Fasting glucose 70-99 mg/dL is within the target normal clinical range.',
        hi: 'फास्टिंग ग्लूकोज 70-99 mg/dL सामान्य और सुरक्षित स्तर है।',
        mr: 'उपवासातील साखर 70-99 mg/dL ही सामान्य आणि निरोगी पातळी आहे.'
      }
    };
  }
  if (val <= 125) {
    return {
      isValid: true,
      status: 'borderline',
      ruleText: {
        en: 'Fasting glucose 100-125 mg/dL is within the prediabetes range (impaired fasting glucose).',
        hi: 'फास्टिंग ग्लूकोज 100-125 mg/dL प्रीडायबिटीज रेंज में आता है।',
        mr: 'उपवासातील साखर 100-125 mg/dL ही प्रीडायबिटीज (मधुमेहापूर्वीची) पातळी आहे.'
      }
    };
  }
  if (val <= 299) {
    return {
      isValid: true,
      status: 'high',
      ruleText: {
        en: 'Fasting glucose 126-299 mg/dL indicates the diabetes diagnostic threshold.',
        hi: 'फास्टिंग ग्लूकोज 126-299 mg/dL डायबिटीज (उच्च शुगर) की श्रेणी में है।',
        mr: 'उपवासातील साखर 126-299 mg/dL ही मधुमेहाची पातळी दर्शवते.'
      }
    };
  }
  return {
    isValid: true,
    status: 'urgent',
    ruleText: {
      en: 'Fasting glucose 300+ mg/dL is critically high and requires prompt clinical evaluation.',
      hi: 'फास्टिंग ग्लूकोज 300+ mg/dL अत्यंत गंभीर है। तुरंत डॉक्टर से संपर्क करें।',
      mr: 'उपवासातील साखर 300+ mg/dL अत्यंत गंभीर आहे. कृपया त्वरित डॉक्टरांशी संपर्क साधा.'
    }
  };
};

export const evaluatePPBSGlucose = (val: number): EvaluationResult => {
  if (val < 20 || val > 900) return { isValid: false, status: 'normal', ruleText: { en: '', hi: '', mr: '' } };
  if (val < 70) {
    return {
      isValid: true,
      status: 'low',
      ruleText: {
        en: 'Post-meal glucose under 70 mg/dL is low.',
        hi: 'भोजन के 2 घंटे बाद ग्लूकोज 70 से कम होना निम्न है।',
        mr: 'जेवणानंतरची साखर 70 पेक्षा कमी असणे धोकादायक आहे.'
      }
    };
  }
  if (val <= 139) {
    return {
      isValid: true,
      status: 'normal',
      ruleText: {
        en: 'Post-meal glucose 70-139 mg/dL is within normal guidelines.',
        hi: 'भोजन के 2 घंटे बाद 70-139 mg/dL सामान्य स्तर है।',
        mr: 'जेवणानंतरची साखर 70-139 mg/dL सामान्य आहे.'
      }
    };
  }
  if (val <= 199) {
    return {
      isValid: true,
      status: 'borderline',
      ruleText: {
        en: 'Post-meal glucose 140-199 mg/dL indicates impaired glucose tolerance.',
        hi: 'भोजन के बाद 140-199 mg/dL प्रीडायबिटीज रेंज है।',
        mr: 'जेवणानंतरची साखर 140-199 mg/dL प्रीडायबिटीज दर्शवते.'
      }
    };
  }
  if (val <= 299) {
    return {
      isValid: true,
      status: 'high',
      ruleText: {
        en: 'Post-meal glucose 200-299 mg/dL indicates elevated diabetic levels.',
        hi: 'भोजन के बाद 200-299 mg/dL उच्च स्तर (डायबिटीज) है।',
        mr: 'जेवणानंतरची साखर 200-299 mg/dL उच्च पातळीवर आहे.'
      }
    };
  }
  return {
    isValid: true,
    status: 'urgent',
    ruleText: {
      en: 'Post-meal glucose 300+ mg/dL requires urgent medical review.',
      hi: 'भोजन के बाद 300+ mg/dL अत्यंत गंभीर है। तुरंत चिकित्सीय सलाह लें।',
      mr: 'जेवणानंतरची साखर 300+ mg/dL अत्यंत चिंताजनक आहे.'
    }
  };
};

export const evaluateHbA1c = (val: number): EvaluationResult => {
  if (val < 3 || val > 20) return { isValid: false, status: 'normal', ruleText: { en: '', hi: '', mr: '' } };
  if (val < 5.7) {
    return {
      isValid: true,
      status: 'normal',
      ruleText: {
        en: 'HbA1c below 5.7% is in the normal non-diabetic range.',
        hi: 'HbA1c 5.7% से कम सामान्य गैर-मधुमेह सीमा में है।',
        mr: 'HbA1c 5.7% पेक्षा कमी ही सामान्य पातळी आहे.'
      }
    };
  }
  if (val <= 6.4) {
    return {
      isValid: true,
      status: 'borderline',
      ruleText: {
        en: 'HbA1c 5.7-6.4% indicates prediabetes. (Note: HbA1c should not be the sole test in India).',
        hi: 'HbA1c 5.7-6.4% प्रीडायबिटीज दर्शाता है।',
        mr: 'HbA1c 5.7-6.4% प्रीडायबिटीज दर्शवते.'
      }
    };
  }
  if (val <= 9.9) {
    return {
      isValid: true,
      status: 'high',
      ruleText: {
        en: 'HbA1c 6.5-9.9% meets the diagnostic threshold for diabetes.',
        hi: 'HbA1c 6.5-9.9% डायबिटीज की पुष्टि करता है।',
        mr: 'HbA1c 6.5-9.9% मधुमेह दर्शवते.'
      }
    };
  }
  return {
    isValid: true,
    status: 'urgent',
    ruleText: {
      en: 'HbA1c 10.0%+ denotes severely uncontrolled glycemic exposure.',
      hi: 'HbA1c 10.0%+ अत्यंत उच्च स्तर है। तत्काल डॉक्टर से मिलें।',
      mr: 'HbA1c 10.0%+ अत्यंत गंभीर पातळी आहे.'
    }
  };
};

export const evaluateBloodPressure = (systolic: number, diastolic: number): EvaluationResult => {
  if (systolic >= 180 || diastolic >= 120) {
    return {
      isValid: true,
      status: 'urgent',
      ruleText: {
        en: 'Blood Pressure 180/120+ mmHg indicates a hypertensive emergency.',
        hi: 'रक्तचाप 180/120+ mmHg अति-गंभीर स्थिति है। तुरंत अस्पताल या डॉक्टर से मिलें।',
        mr: 'रक्तदाब 180/120+ mmHg ही तातडीची आणीबाणी आहे. त्वरित वैद्यकीय मदत घ्या.'
      }
    };
  }
  if (systolic >= 140 || diastolic >= 90) {
    return {
      isValid: true,
      status: 'high',
      ruleText: {
        en: 'BP 140/90+ mmHg is in the Stage 2 hypertension range.',
        hi: 'रक्तचाप 140/90+ mmHg उच्च रक्तचाप (हाइपरटेंशन) श्रेणी में आता है।',
        mr: 'रक्तदाब 140/90+ mmHg हा उच्च रक्तदाब दर्शवतो.'
      }
    };
  }
  if ((systolic >= 120 && systolic <= 139) || (diastolic >= 80 && diastolic <= 89)) {
    return {
      isValid: true,
      status: 'borderline',
      ruleText: {
        en: 'BP 120-139 / 80-89 mmHg is borderline (pre-hypertension).',
        hi: 'रक्तचाप 120-139 / 80-89 mmHg बॉर्डरलाइन (प्री-हाइपरटेंशन) है।',
        mr: 'रक्तदाब 120-139 / 80-89 mmHg बॉर्डरलाइन पातळी आहे.'
      }
    };
  }
  return {
    isValid: true,
    status: 'normal',
    ruleText: {
      en: 'Blood Pressure below 120/80 mmHg is in the optimal normal range.',
      hi: 'रक्तचाप 120/80 mmHg से नीचे सामान्य और स्वस्थ सीमा में है।',
      mr: 'रक्तदाब 120/80 mmHg पेक्षा कमी सामान्य आणि निरोगी आहे.'
    }
  };
};