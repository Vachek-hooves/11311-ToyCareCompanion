export type Answers = Record<string, number>;
export type CareTask = { id: string; text: string; done: boolean };
export type Assessment = {
  title: string;
  explanation: string;
  tasks: CareTask[];
};
export function assess(a: Answers): Assessment {
  const smell = a.smell ?? 0,
    fabric = a.fabric ?? 0,
    parts = a.parts ?? 0,
    filling = a.filling ?? 0;
  const severe = [smell === 3, fabric === 3, parts === 3, filling === 3].filter(
    Boolean,
  ).length;
  const isolated =
    smell >= 2 ||
    fabric === 3 ||
    parts === 3 ||
    filling >= 2 ||
    a.storage === 3;
  const repair = fabric > 0 || parts > 0 || filling === 1;
  const title =
    severe >= 2
      ? 'Better to Replace'
      : isolated
      ? 'Keep Isolated'
      : repair
      ? 'Needs Repair'
      : 'Safe to Clean';
  const explanation =
    title === 'Better to Replace'
      ? 'The toy shows several warning signs and may not be safe to restore at home. Consider professional assessment or replacement.'
      : title === 'Keep Isolated'
      ? 'Keep the toy away from children and pets until its condition is assessed and the recommended care steps are completed.'
      : title === 'Needs Repair'
      ? 'The toy may be restorable, but it needs repair before regular use. Complete the repair tasks and inspect it again afterward.'
      : 'The toy appears suitable for careful cleaning. Follow its care label and the recommended drying steps before using it again.';
  const list = [
    'Check seams and fabric',
    'Check eyes, buttons, and accessories',
    'Read the care label',
  ];
  if (!isolated)
    list.push(
      'Remove surface dust',
      'Clean using a suitable method',
      'Dry the toy completely',
    );
  if ((a.age ?? 0) > 0)
    list.push(
      'Inspect hidden seams and inner fabric',
      'Check whether the filling has changed color or texture',
      'Look for old glue, rust, or material deterioration',
    );
  if (smell === 1)
    list.push(
      'Air the toy in a dry, well-ventilated place',
      'Avoid storing it in a closed container',
      'Check the filling and inner seams for moisture',
      'Do not use fragrance sprays to hide the smell',
    );
  if (smell >= 2)
    list.push(
      'Keep the toy away from children and pets',
      'Do not use the toy until it has been assessed',
      'Avoid washing it together with other items',
      'Consider professional cleaning or replacement',
    );
  if (fabric === 1)
    list.push(
      'Reinforce weak fabric with a soft patch',
      'Trim only loose threads',
      'Check whether the damaged area is becoming larger',
    );
  if (fabric === 2)
    list.push(
      'Stop using the toy until the tear is repaired',
      'Sew the seam with strong thread',
      'Check that no filling remains exposed',
      'Inspect the repaired area before use',
    );
  if (fabric === 3)
    list.push(
      'Keep the toy isolated',
      'Do not give it to a young child or pet',
      'Avoid washing if the fabric may fall apart',
      'Consider professional restoration or replacement',
    );
  if (parts === 1)
    list.push(
      'Secure the loose part before further use',
      'Check the surrounding fabric and stitches',
      'Repeat the pull test after the repair',
    );
  if (parts === 2)
    list.push(
      'Replace the part with a securely sewn alternative',
      'Do not use loose buttons for toys handled by babies',
      'Check that no small parts remain inside the toy',
    );
  if (parts === 3)
    list.push(
      'Remove the toy from regular use',
      'Keep all loose parts away from children and pets',
      'Ask a specialist about safe restoration or replace the toy',
    );
  if (filling === 1)
    list.push(
      'Redistribute the filling evenly',
      'Gently reshape the head, body, arms, and legs',
      'Check the seams before adding new filling',
    );
  if (filling === 2)
    list.push(
      'Dry the toy completely before using it',
      'Place it in a well-ventilated area',
      'Check the filling for odor or discoloration',
      'Do not store it until all moisture is gone',
    );
  if (filling === 3)
    list.push(
      'Stop using the toy immediately',
      'Keep it away from other textiles',
      'Do not seal it in a plastic bag while damp',
      'Consider professional cleaning or replacement',
    );
  if (a.use === 3)
    list.push(
      'Check all small parts more carefully',
      'Avoid loose buttons, plastic eyes, and detachable accessories',
      'Clean the toy more regularly when safe',
      'Make sure the toy is completely dry before returning it to use',
    );
  if (a.material === 1)
    list.push('Use a gentle method approved for delicate fabric');
  if (a.material === 2)
    list.push('Avoid soaking glued details and mixed materials');
  if (a.material === 3)
    list.push(
      'Do not immerse electronic parts or unknown materials',
      'Ask a specialist if the care label is missing',
    );
  if (a.storage === 1) list.push('Air the storage space regularly');
  if (a.storage === 2) list.push('Inspect hidden areas for dust and pests');
  if (a.storage === 3)
    list.push(
      'Keep the toy isolated until moisture and mold have been assessed',
    );
  list.push('Store in a clean, dry place', 'Check the toy again before use');
  return {
    title,
    explanation,
    tasks: [...new Set(list)].map((text, i) => ({
      id: `task-${i}`,
      text,
      done: false,
    })),
  };
}
