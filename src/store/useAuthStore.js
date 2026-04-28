import { create } from "zustand";

const STORAGE_KEY = "ecommerce-auth";

const loadAuthState = () => {
  if (typeof window === "undefined") {
    return { user: null, users: [] };
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { user: null, users: [] };
    }
    const parsed = JSON.parse(raw);
    const users = Array.isArray(parsed?.users) ? parsed.users : [];
    const user = parsed?.user ?? null;
    return { user, users };
  } catch (error) {
    return { user: null, users: [] };
  }
};

const persistAuth = (state) => {
  if (typeof window === "undefined") {
    return;
  }
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    // ignore write errors
  }
};

const useAuthStore = create((set, get) => ({
  ...loadAuthState(),
  register: ({ name, email, password }) => {
    const trimmedName = name?.trim();
    const normalizedEmail = email?.trim().toLowerCase();
    const safePassword = password?.trim();
    if (!trimmedName || !normalizedEmail || !safePassword) {
      return { success: false, message: "Completá todos los campos." };
    }

    const users = get().users;
    const alreadyExists = users.some((user) =>
      user.email?.toLowerCase() === normalizedEmail
    );
    if (alreadyExists) {
      return {
        success: false,
        message: "Ese email ya está registrado.",
      };
    }

    const newUser = {
      id:
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `${Date.now()}`,
      name: trimmedName,
      email: normalizedEmail,
      password: safePassword,
    };
    const nextUsers = [...users, newUser];
    const sessionUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    };

    set({ users: nextUsers, user: sessionUser });
    persistAuth({ users: nextUsers, user: sessionUser });
    return { success: true };
  },
  login: ({ email, password }) => {
    const normalizedEmail = email?.trim().toLowerCase();
    const safePassword = password?.trim();
    if (!normalizedEmail || !safePassword) {
      return { success: false, message: "Ingresá tu email y contraseña." };
    }

    const users = get().users;
    const match = users.find(
      (user) =>
        user.email?.toLowerCase() === normalizedEmail &&
        user.password === safePassword
    );
    if (!match) {
      return { success: false, message: "Credenciales inválidas." };
    }

    const sessionUser = {
      id: match.id,
      name: match.name,
      email: match.email,
    };
    set({ user: sessionUser });
    persistAuth({ users, user: sessionUser });
    return { success: true };
  },
  logout: () => {
    const users = get().users;
    set({ user: null });
    persistAuth({ users, user: null });
  },
}));

export default useAuthStore;
