// utils/Credentials.js
import { VALID_USERNAMES, VALID_PASSWORD, SESSION_USERNAME } from "./Constants";

export const verifyCredentials = (username, password) => {
  return VALID_USERNAMES.includes(username) && password === VALID_PASSWORD;
};

export const setCredentials = (username, password) => {
  if (username && password) {
    localStorage.setItem('credentials', JSON.stringify({ username, password }));
    localStorage.setItem(SESSION_USERNAME, username);
  }
};

export const clearCredentials = () => {
  localStorage.removeItem('credentials');
  localStorage.removeItem(SESSION_USERNAME);
};

// Maintain backward compatibility
export const removeCredentials = clearCredentials;

export const isLoggedIn = () => {
  const storedUsername = localStorage.getItem(SESSION_USERNAME);
  const storedCredentials = localStorage.getItem('credentials');
  
  if (!storedUsername || !storedCredentials) {
    return false;
  }
  
  try {
    const { username, password } = JSON.parse(storedCredentials);
    return Boolean(username && password && verifyCredentials(username, password));
  } catch (e) {
    return false;
  }
};

export const currentUser = () => {
  return localStorage.getItem(SESSION_USERNAME) || null;
};

export const isProblemUser = () => {
  const user = currentUser();
  return user === 'problem_user';
};

export const isErrorUser = () => {
  const user = currentUser();
  return user === 'error_user';
};

export const isPerformanceGlitchUser = () => {
  const user = currentUser();
  return user === 'performance_glitch_user';
};

export const isVisualUser = () => {
  const user = currentUser();
  return user === 'visual_user';
};

export const isLockedOutUser = () => {
  const user = currentUser();
  return user === 'locked_out_user';
};