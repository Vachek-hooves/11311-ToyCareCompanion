import React from 'react';
import ReactTestRenderer, { act } from 'react-test-renderer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CareProvider, useCare, SavedToy } from '../src/state/CareProvider';
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));
let state: ReturnType<typeof useCare>;
function Consumer() {
  state = useCare();
  return null;
}
let tree: ReactTestRenderer.ReactTestRenderer;
beforeEach(() => {
  jest.clearAllMocks();
  (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);
  (AsyncStorage.setItem as jest.Mock).mockResolvedValue(undefined);
});
afterEach(async () => {
  if (tree) await act(async () => tree.unmount());
});
async function mount() {
  await act(async () => {
    tree = ReactTestRenderer.create(
      <CareProvider>
        <Consumer />
      </CareProvider>,
    );
  });
}
const toy: SavedToy = {
  id: 'user-toy',
  name: 'My toy',
  createdAt: '2026-09-16',
  title: 'Safe to Clean',
  explanation: 'Care',
  tasks: [{ id: 'one', text: 'Inspect', done: false }],
};
test('starts with no saved toys and persists onboarding', async () => {
  await mount();
  expect(state.ready).toBe(true);
  expect(state.toys).toEqual([]);
  await act(async () => state.finishOnboarding());
  expect(state.onboarded).toBe(true);
  expect(AsyncStorage.setItem).toHaveBeenCalled();
});
test('saves a user toy, updates progress, reloads and deletes it', async () => {
  await mount();
  await act(async () => state.saveToy(toy));
  await act(async () => state.toggleTask(toy.id, 'one'));
  expect(state.toys[0].tasks[0].done).toBe(true);
  const stored = (AsyncStorage.setItem as jest.Mock).mock.calls.at(-1)[1];
  await act(async () => tree.unmount());
  (AsyncStorage.getItem as jest.Mock).mockResolvedValue(stored);
  await mount();
  expect(state.toys[0].name).toBe('My toy');
  expect(state.toys[0].tasks[0].done).toBe(true);
  await act(async () => state.deleteToy(toy.id));
  expect(state.toys).toEqual([]);
});
test('failed writes do not falsely update saved state', async () => {
  await mount();
  (AsyncStorage.setItem as jest.Mock).mockRejectedValueOnce(new Error('Full'));
  await act(async () => {
    await expect(state.saveToy(toy)).rejects.toThrow('Full');
  });
  expect(state.toys).toEqual([]);
});
test('corrupt storage is not silently overwritten', async () => {
  (AsyncStorage.getItem as jest.Mock).mockResolvedValue('{broken');
  await mount();
  expect(state.ready).toBe(false);
  expect(state.error).toBeTruthy();
  expect(AsyncStorage.setItem).not.toHaveBeenCalled();
});
