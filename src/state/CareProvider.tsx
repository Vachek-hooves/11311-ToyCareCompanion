import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Assessment } from '../services/assessment';
export type SavedToy = Assessment & {
  id: string;
  name: string;
  photo?: string;
  createdAt: string;
};
type Store = { onboarded: boolean; toys: SavedToy[] };
type Context = Store & {
  ready: boolean;
  error: string | null;
  finishOnboarding: () => Promise<void>;
  saveToy: (toy: SavedToy) => Promise<void>;
  toggleTask: (id: string, taskId: string) => Promise<void>;
  deleteToy: (id: string) => Promise<void>;
  retry: () => void;
};
const KEY = '@favourite-plush-care/v1';
const initial: Store = { onboarded: false, toys: [] };
const CareContext = createContext<Context | null>(null);
function validStore(value: unknown): value is Store {
  if (!value || typeof value !== 'object') return false;
  const s = value as Store;
  return (
    typeof s.onboarded === 'boolean' &&
    Array.isArray(s.toys) &&
    s.toys.every(
      t =>
        typeof t.id === 'string' &&
        typeof t.name === 'string' &&
        typeof t.title === 'string' &&
        typeof t.explanation === 'string' &&
        typeof t.createdAt === 'string' &&
        (t.photo === undefined || typeof t.photo === 'string') &&
        Array.isArray(t.tasks) &&
        t.tasks.every(
          k =>
            typeof k.id === 'string' &&
            typeof k.text === 'string' &&
            typeof k.done === 'boolean',
        ),
    )
  );
}
export function CareProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<Store>(initial),
    [ready, setReady] = useState(false),
    [error, setError] = useState<string | null>(null);
  const ref = useRef(data),
    queue = useRef<Promise<void>>(Promise.resolve());
  const hydrate = React.useCallback(() => {
    setError(null);
    AsyncStorage.getItem(KEY)
      .then(raw => {
        const parsed: unknown = raw ? JSON.parse(raw) : initial;
        if (!validStore(parsed)) throw new Error('Invalid saved data');
        ref.current = parsed;
        setData(parsed);
        setReady(true);
      })
      .catch(() =>
        setError('Your saved data could not be loaded. Please try again.'),
      );
  }, []);
  useEffect(hydrate, [hydrate]);
  const update = (change: (current: Store) => Store) => {
    const operation = queue.current.then(async () => {
      const next = change(ref.current);
      await AsyncStorage.setItem(KEY, JSON.stringify(next));
      ref.current = next;
      setData(next);
    });
    queue.current = operation.catch(() => {});
    return operation;
  };
  return (
    <CareContext.Provider
      value={{
        ...data,
        ready,
        error,
        retry: hydrate,
        finishOnboarding: () => update(s => ({ ...s, onboarded: true })),
        saveToy: toy => update(s => ({ ...s, toys: [toy, ...s.toys] })),
        toggleTask: (id, taskId) =>
          update(s => ({
            ...s,
            toys: s.toys.map(t =>
              t.id === id
                ? {
                    ...t,
                    tasks: t.tasks.map(k =>
                      k.id === taskId ? { ...k, done: !k.done } : k,
                    ),
                  }
                : t,
            ),
          })),
        deleteToy: id =>
          update(s => ({ ...s, toys: s.toys.filter(t => t.id !== id) })),
      }}
    >
      {children}
    </CareContext.Provider>
  );
}
export function useCare() {
  const ctx = useContext(CareContext);
  if (!ctx) throw new Error('CareProvider is missing');
  return ctx;
}
