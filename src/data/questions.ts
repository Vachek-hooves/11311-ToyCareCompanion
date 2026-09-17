export type Question = {
  id: string;
  title: string;
  label: string;
  options: string[];
};
export const questions: Question[] = [
  {
    id: 'age',
    label: 'Toy age',
    title: 'How old is the plush toy?',
    options: ['0–4 years', '5–8 years', '9–15 years', 'Over 15 years'],
  },
  {
    id: 'smell',
    label: 'Smell',
    title: 'Does the toy have an unusual smell?',
    options: [
      'No unusual smell',
      'Slight musty smell',
      'Strong unpleasant smell',
      'Moldy or damp smell',
    ],
  },
  {
    id: 'fabric',
    label: 'Fabric condition',
    title: 'What is the visible condition of the toy?',
    options: [
      'No visible damage',
      'Small worn areas',
      'Torn fabric or open seams',
      'Severe damage or crumbling fabric',
    ],
  },
  {
    id: 'parts',
    label: 'Damage and loose parts',
    title: 'Are any parts loose or missing?',
    options: [
      'All parts are secure',
      'One small part feels loose',
      'A button, eye, or accessory is missing',
      'Several parts are loose or damaged',
    ],
  },
  {
    id: 'filling',
    label: 'Filling',
    title: 'What is the condition of the filling?',
    options: [
      'Dry and evenly shaped',
      'Slightly flat or uneven',
      'Lumpy or slightly damp',
      'Wet, damaged, or has an unpleasant smell',
    ],
  },
  {
    id: 'use',
    label: 'Contact with the toy',
    title: 'How is the toy usually used?',
    options: [
      'Stored as decoration',
      'Used occasionally',
      'Used regularly for cuddling or sleeping',
      'Used by a young child or pet',
    ],
  },
  {
    id: 'material',
    label: 'Material',
    title: 'What is the toy made of?',
    options: [
      'Washable synthetic plush',
      'Natural or delicate fabric',
      'Mixed materials or glued details',
      'Unknown material or electronic parts',
    ],
  },
  {
    id: 'storage',
    label: 'Storage',
    title: 'Where has the toy been stored?',
    options: [
      'In a clean, dry room',
      'In a closed box or cupboard',
      'In a dusty attic or garage',
      'In a damp basement or humid place',
    ],
  },
];
export const calculatorQuestions = questions.filter(q =>
  ['age', 'smell', 'fabric', 'parts', 'use'].includes(q.id),
);
