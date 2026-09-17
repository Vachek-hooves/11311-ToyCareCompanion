import { assess, Answers } from '../src/services/assessment';
import { questions, calculatorQuestions } from '../src/data/questions';
import { articles } from '../src/data/articles';
import { facts } from '../src/data/facts';
test('healthy toys receive cleaning tasks without precompleted data', () => {
  const r = assess({
    age: 0,
    smell: 0,
    fabric: 0,
    parts: 0,
    filling: 0,
    use: 0,
  });
  expect(r.title).toBe('Safe to Clean');
  expect(r.tasks.some(t => t.text === 'Clean using a suitable method')).toBe(
    true,
  );
  expect(r.tasks.every(t => !t.done)).toBe(true);
});
test('age alone does not condemn a toy', () => {
  expect(assess({ age: 3 }).title).toBe('Safe to Clean');
  expect(assess({ age: 3 }).tasks.length).toBeGreaterThan(
    assess({ age: 0 }).tasks.length,
  );
});
test('repairable damage receives repair tasks', () => {
  const r = assess({ fabric: 2, parts: 1 });
  expect(r.title).toBe('Needs Repair');
  expect(r.tasks.some(t => t.text === 'Sew the seam with strong thread')).toBe(
    true,
  );
});
test.each<Answers>([
  { smell: 3 },
  { filling: 2 },
  { fabric: 3 },
  { parts: 3 },
  { storage: 3 },
])('isolates a toy with a serious risk %o', answers => {
  const r = assess(answers);
  expect(r.title).toBe('Keep Isolated');
  expect(r.tasks.some(t => t.text === 'Clean using a suitable method')).toBe(
    false,
  );
});
test('multiple severe warning signs override repair advice', () => {
  expect(assess({ smell: 3, fabric: 3, parts: 3 }).title).toBe(
    'Better to Replace',
  );
});
test('material and contact answers affect care recommendations', () => {
  const r = assess({ material: 3, use: 3 });
  expect(r.tasks.some(t => t.text.includes('electronic'))).toBe(true);
  expect(r.tasks.some(t => t.text.includes('small parts more carefully'))).toBe(
    true,
  );
  expect(new Set(r.tasks.map(t => t.text)).size).toBe(r.tasks.length);
});
test('content contains all requested sections and questions', () => {
  expect(questions).toHaveLength(8);
  expect(calculatorQuestions).toHaveLength(5);
  expect(articles.filter(a => a.category === 'repair')).toHaveLength(8);
  expect(articles.filter(a => a.category === 'stain')).toHaveLength(8);
  expect(facts).toHaveLength(10);
  expect(articles.every(a => a.paragraphs.length === 2)).toBe(true);
  expect(
    articles
      .filter(a => a.category === 'stain')
      .every(a => typeof a.quiz?.answer === 'boolean'),
  ).toBe(true);
});
