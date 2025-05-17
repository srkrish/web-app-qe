import { VALID_USERNAMES, VALID_PASSWORD, SESSION_USERNAME } from "./Constants";
import { Credentials, ValidUsername } from "./types";

export const verifyCredentials = (username: ValidUsername | string, password: string): boolean => {
  return VALID_USERNAMES.includes(username as ValidUsername) && password === VALID_PASSWORD;
};

export const setCredentials = (username: string, password: string): void => {
  if (username && password) {
    localStorage.setItem('credentials', JSON.stringify({ username, password }));
    localStorage.setItem(SESSION_USERNAME, username);
  }
};

export const clearCredentials = (): void => {
  localStorage.removeItem('credentials');
  localStorage.removeItem(SESSION_USERNAME);
};

export const removeCredentials = clearCredentials;

export const isLoggedIn = (): boolean => {
  const storedUsername = localStorage.getItem(SESSION_USERNAME);
  const storedCredentials = localStorage.getItem('credentials');
  
  if (!storedUsername || !storedCredentials) {
    return false;
  }
  
  try {
    const { username, password } = JSON.parse(storedCredentials) as Credentials;
    return Boolean(username && password && verifyCredentials(username, password));
  } catch (e) {
    return false;
  }
};

export const currentUser = (): string | null => {
  return localStorage.getItem(SESSION_USERNAME);
};

export const isProblemUser = (): boolean => {
  const user = currentUser();
  return user === 'problem_user';
};

export const isErrorUser = (): boolean => {
  const user = currentUser();
  return user === 'error_user';
};

export const isPerformanceGlitchUser = (): boolean => {
  const user = currentUser();
  return user === 'performance_glitch_user';
};

export const isVisualUser = (): boolean => {
  const user = currentUser();
  return user === 'visual_user';
};

export const isLockedOutUser = (): boolean => {
  const user = currentUser();
  return user === 'locked_out_user';
};