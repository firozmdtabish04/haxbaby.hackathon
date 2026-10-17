/**
 * Guestbook input validation utility
 */

export function sanitizeText(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/[<>]/g, '') // Strip basic HTML tags
    .trim();
}

export function validateGuestbookEntry(nickname, message) {
  const errors = {};
  const cleanNick = (nickname || '').trim();
  const cleanMsg = (message || '').trim();

  if (!cleanNick) {
    errors.nickname = 'Please enter a nickname so Pip knows who visited!';
  } else if (cleanNick.length < 2) {
    errors.nickname = 'Nickname must be at least 2 characters long.';
  } else if (cleanNick.length > 24) {
    errors.nickname = 'Nickname cannot exceed 24 characters.';
  }

  if (!cleanMsg) {
    errors.message = 'Please write a message to sign the guestbook!';
  } else if (cleanMsg.length < 3) {
    errors.message = 'Your message must be at least 3 characters.';
  } else if (cleanMsg.length > 140) {
    errors.message = 'Message limit is 140 characters.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    sanitized: {
      nickname: sanitizeText(cleanNick),
      message: sanitizeText(cleanMsg),
    },
  };
}
