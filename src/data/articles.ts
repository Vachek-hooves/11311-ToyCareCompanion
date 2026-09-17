import { ImageSourcePropType } from 'react-native';
export type Article = {
  id: string;
  category: 'repair' | 'stain';
  title: string;
  paragraphs: string[];
  image: ImageSourcePropType;
  warning: string;
  quiz?: { question: string; answer: boolean };
};
export const articles: Article[] = [
  {
    id: 'RepairingATornSeam',
    category: 'repair',
    title: 'Repairing A Torn Seam',
    paragraphs: [
      'A torn seam is one of the most common problems found in plush toys. Before repairing it, gently check whether the fabric is still strong around the damaged area. If the fabric is very thin or falling apart, the toy may need professional restoration.',
      'Clean and dry the toy before sewing the seam. Use a strong thread and small hidden stitches to keep the filling inside. After the repair, check that no sharp needle, loose thread, or open gap remains.',
    ],
    warning:
      'Home repair is suitable only when the fabric is sound and every part can be secured. For mold, crumbling material, persistent odor, or unsafe parts, stop using the toy and seek professional assessment or replacement.',
    image: require('../assets/plush-care-repairing-a-torn-seam.png'),
  },
  {
    id: 'CleaningAndPreparingTheToy',
    category: 'repair',
    title: 'Cleaning And Preparing The Toy',
    paragraphs: [
      'Always remove dust and loose dirt before starting any repair. You can gently brush the surface or use a vacuum cleaner with a soft attachment. This helps prevent dirt from becoming trapped under stitches or patches.',
      'Do not repair a wet or damp plush toy. Moisture can remain inside the filling and create an unpleasant smell or mold. Let the toy dry completely in a well-ventilated place before continuing.',
    ],
    warning:
      'Home repair is suitable only when the fabric is sound and every part can be secured. For mold, crumbling material, persistent odor, or unsafe parts, stop using the toy and seek professional assessment or replacement.',
    image: require('../assets/plush-care-cleaning-and-preparing-the-toy.png'),
  },
  {
    id: 'RestoringFlattenedFilling',
    category: 'repair',
    title: 'Restoring Flattened Filling',
    paragraphs: [
      'Plush filling can become flat or uneven after years of use, washing, or constant pressure. Carefully open a small section of the seam if the filling needs to be adjusted. Add small amounts of clean, suitable stuffing instead of overfilling the toy.',
      'Spread the filling evenly through the body, head, arms, and legs. Avoid using damaged foam, old fabric scraps, or materials with a strong smell. Close the opening securely and check that the toy keeps its original shape.',
    ],
    warning:
      'Home repair is suitable only when the fabric is sound and every part can be secured. For mold, crumbling material, persistent odor, or unsafe parts, stop using the toy and seek professional assessment or replacement.',
    image: require('../assets/plush-care-restoring-flattened-filling.png'),
  },
  {
    id: 'ReplacingAMissingEye',
    category: 'repair',
    title: 'Replacing A Missing Eye',
    paragraphs: [
      'A missing eye should be replaced carefully, especially if the toy is used by a young child. Sewn fabric eyes are usually safer than loose buttons or hard plastic parts. Choose a replacement that is firmly attached and suitable for the toy’s size.',
      'If you use a button, sew it through several layers of fabric with strong thread. Check it by gently pulling in different directions after the repair. If the button remains loose or the surrounding fabric is damaged, professional repair may be safer.',
    ],
    warning:
      'Home repair is suitable only when the fabric is sound and every part can be secured. For mold, crumbling material, persistent odor, or unsafe parts, stop using the toy and seek professional assessment or replacement.',
    image: require('../assets/plush-care-replacing-a-missing-eye.png'),
  },
  {
    id: 'RepairingWornFabric',
    category: 'repair',
    title: 'Repairing Worn Fabric',
    paragraphs: [
      'Worn fabric can often be strengthened with a soft patch placed over the damaged area. Choose a patch that is similar in weight and texture to the original material. Large weak areas may require support from the inside as well.',
      'Trim only loose threads and avoid cutting healthy fabric. Sew around the patch with small, even stitches to prevent new tears. If the fabric continues to crumble or shed, it may be time to replace the toy.',
    ],
    warning:
      'Home repair is suitable only when the fabric is sound and every part can be secured. For mold, crumbling material, persistent odor, or unsafe parts, stop using the toy and seek professional assessment or replacement.',
    image: require('../assets/plush-care-repairing-worn-fabric.png'),
  },
  {
    id: 'SewingASeparatedLimb',
    category: 'repair',
    title: 'Sewing A Separated Limb',
    paragraphs: [
      'A loose arm, leg, ear, or tail should be repaired as soon as possible. First check whether the part is still attached and whether the fabric around it is strong enough to hold new stitches. Remove any loose filling from the seam before sewing.',
      'Use reinforced stitches around the entire connection point. Make sure the limb is positioned correctly and cannot be pulled away easily. If the attachment point is badly damaged, ask a professional to restore the toy.',
    ],
    warning:
      'Home repair is suitable only when the fabric is sound and every part can be secured. For mold, crumbling material, persistent odor, or unsafe parts, stop using the toy and seek professional assessment or replacement.',
    image: require('../assets/plush-care-sewing-a-separated-limb.png'),
  },
  {
    id: 'RemovingOdorAndMildew',
    category: 'repair',
    title: 'Removing Odor And Mildew',
    paragraphs: [
      'A musty smell can indicate that a plush toy has absorbed moisture or was stored in a damp place. Do not cover the odor with perfume or fragrance sprays. Inspect the seams, filling, and hidden areas for visible mold or moisture.',
      'If mold is visible or the smell remains after careful cleaning and drying, keep the toy away from children and pets. Some toys may not be safe to restore at home, especially when the filling is affected. In this situation, consider professional assessment or replacement.',
    ],
    warning:
      'Home repair is suitable only when the fabric is sound and every part can be secured. For mold, crumbling material, persistent odor, or unsafe parts, stop using the toy and seek professional assessment or replacement.',
    image: require('../assets/plush-care-removing-odor-and-mildew.png'),
  },
  {
    id: 'KnowingWhenToReplace',
    category: 'repair',
    title: 'Knowing When To Replace',
    paragraphs: [
      'Repair is not always the safest or most practical option. A toy may need to be replaced when it has severe mold, crumbling fabric, damaged filling, many loose parts, or a persistent chemical smell. Toys used by babies, young children, or pets require especially careful inspection.',
      'If the toy has sentimental value, it may be possible to preserve it without continuing to use it. Take photographs, keep a small fabric piece, or ask a specialist about restoration. When in doubt, stop using the toy until its condition has been properly assessed.',
    ],
    warning:
      'Home repair is suitable only when the fabric is sound and every part can be secured. For mold, crumbling material, persistent odor, or unsafe parts, stop using the toy and seek professional assessment or replacement.',
    image: require('../assets/plush-care-knowing-when-to-replace.png'),
  },
  {
    id: 'RemovingFoodStains',
    category: 'stain',
    title: 'Removing Food Stains',
    paragraphs: [
      'Food stains should be treated as soon as possible, before they dry into the plush fabric. Gently remove any solid pieces with a spoon or a soft cloth. Avoid rubbing the stain, because this can push it deeper into the fibers.',
      'Apply a small amount of mild soap mixed with cool or lukewarm water. Dab the area carefully from the outside toward the center of the stain. Remove soap residue with a clean damp cloth and let the toy dry completely.',
    ],
    warning:
      'Avoid bleach, aggressive solvents, excessive heat, and soaking unless the care label allows it. Test a hidden area first and dry completely before use.',
    quiz: {
      question: 'Rubbing a fresh food stain strongly helps remove it faster.',
      answer: false,
    },
    image: require('../assets/plush-care-removing-food-stains.png'),
  },
  {
    id: 'RemovingPaintStains',
    category: 'stain',
    title: 'Removing Paint Stains',
    paragraphs: [
      'Paint stains can be difficult to remove, especially after they have completely dried. First identify whether the paint is water-based or oil-based, if possible. Always test the cleaning method on a hidden area of the toy.',
      'For fresh water-based paint, gently blot the stain with a damp cloth and mild soap. Do not use strong solvents, acetone, or bleach, as they may damage the fabric and colors. If the paint has dried deeply into the material, professional cleaning may be safer.',
    ],
    warning:
      'Avoid bleach, aggressive solvents, excessive heat, and soaking unless the care label allows it. Test a hidden area first and dry completely before use.',
    quiz: {
      question:
        'Strong solvents are always safe for removing paint from plush toys.',
      answer: false,
    },
    image: require('../assets/plush-care-removing-paint-stains.png'),
  },
  {
    id: 'RemovingCosmeticStains',
    category: 'stain',
    title: 'Removing Cosmetic Stains',
    paragraphs: [
      'Makeup, lipstick, and creams can leave oily or colorful marks on plush fabric. Start by lifting excess product with a dry spoon or soft tissue. Do not spread the stain by wiping across the surface.',
      'Use a small amount of mild dish soap diluted with lukewarm water. Dab the affected area gently and repeat only if the fabric tolerates the treatment. Rinse the area with a clean damp cloth and allow the toy to dry naturally.',
    ],
    warning:
      'Avoid bleach, aggressive solvents, excessive heat, and soaking unless the care label allows it. Test a hidden area first and dry completely before use.',
    quiz: {
      question:
        'Excess makeup should be gently lifted before cleaning the stain.',
      answer: true,
    },
    image: require('../assets/plush-care-removing-cosmetic-stains.png'),
  },
  {
    id: 'RemovingBloodStains',
    category: 'stain',
    title: 'Removing Blood Stains',
    paragraphs: [
      'Fresh blood stains should be treated with cool water as soon as possible. Hot water can make the proteins set deeper into the fabric. Use a clean cloth to gently blot the area without rubbing.',
      'Apply a small amount of mild soap or a fabric-safe stain remover after testing it on a hidden section. Work slowly and avoid soaking the entire toy unless its care label allows washing. If the stain is old or the toy is heavily affected, consider professional cleaning.',
    ],
    warning:
      'Avoid bleach, aggressive solvents, excessive heat, and soaking unless the care label allows it. Test a hidden area first and dry completely before use.',
    quiz: {
      question: 'Hot water is the best first choice for a fresh blood stain.',
      answer: false,
    },
    image: require('../assets/plush-care-removing-blood-stains.png'),
  },
  {
    id: 'RemovingGreaseStains',
    category: 'stain',
    title: 'Removing Grease Stains',
    paragraphs: [
      'Grease can spread quickly through plush fibers and leave a dark, oily mark. Begin by placing a clean paper towel over the area to absorb excess oil. Do not rub the stain, because this may push the grease further into the filling.',
      'Apply a small amount of mild dish soap to the surface and gently dab with a damp cloth. Remove the soap carefully and repeat the process only when necessary. Let the toy dry fully and check whether the fabric has returned to its original texture.',
    ],
    warning:
      'Avoid bleach, aggressive solvents, excessive heat, and soaking unless the care label allows it. Test a hidden area first and dry completely before use.',
    quiz: {
      question:
        'Rubbing a grease stain can make it spread deeper into the plush fabric.',
      answer: true,
    },
    image: require('../assets/plush-care-removing-grease-stains.png'),
  },
  {
    id: 'RemovingDrinkStains',
    category: 'stain',
    title: 'Removing Drink Stains',
    paragraphs: [
      'Juice, coffee, tea, and other drinks can leave both color and a sticky residue. Blot the liquid with a clean dry towel before applying any cleaning product. Avoid pressing too hard, especially if the toy has soft filling.',
      'Use mild soap and lukewarm water on a clean cloth. Dab the stain from the edges toward the center, then remove the remaining soap with another damp cloth. Dry the toy completely in a well-ventilated place.',
    ],
    warning:
      'Avoid bleach, aggressive solvents, excessive heat, and soaking unless the care label allows it. Test a hidden area first and dry completely before use.',
    quiz: {
      question: 'Blotting a drink spill is usually safer than rubbing it.',
      answer: true,
    },
    image: require('../assets/plush-care-removing-drink-stains.png'),
  },
  {
    id: 'RemovingDustAndDirt',
    category: 'stain',
    title: 'Removing Dust And Dirt',
    paragraphs: [
      'Surface dust and dirt can usually be removed without washing the entire toy. Gently brush the plush with a soft clothing brush or use a vacuum cleaner with a soft attachment. Pay attention to seams, ears, paws, and other areas where dust collects.',
      'For deeper dirt, use a slightly damp cloth with a small amount of mild soap. Avoid soaking the toy if the filling, glued details, or internal mechanisms may be damaged by moisture. Always let the plush toy dry completely after cleaning.',
    ],
    warning:
      'Avoid bleach, aggressive solvents, excessive heat, and soaking unless the care label allows it. Test a hidden area first and dry completely before use.',
    quiz: {
      question:
        'A plush toy should always be fully soaked to remove ordinary dust.',
      answer: false,
    },
    image: require('../assets/plush-care-removing-dust-and-dirt.png'),
  },
  {
    id: 'RemovingInkStains',
    category: 'stain',
    title: 'Removing Ink Stains',
    paragraphs: [
      'Ink stains should be treated carefully because they can spread quickly and become permanent. Place a clean cloth behind the stained area to prevent the ink from transferring to another part of the toy. Test any cleaning product on a hidden section first.',
      'Gently dab the stain with a small amount of fabric-safe cleaner, working from the outside toward the center. Do not use bleach or aggressive solvents without confirming that they are safe for the material. If the ink has spread widely, professional cleaning may provide a better result.',
    ],
    warning:
      'Avoid bleach, aggressive solvents, excessive heat, and soaking unless the care label allows it. Test a hidden area first and dry completely before use.',
    quiz: {
      question:
        'Ink stains should be rubbed strongly to remove them from plush fabric.',
      answer: false,
    },
    image: require('../assets/plush-care-removing-ink-stains.png'),
  },
];
