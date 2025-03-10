export const EMAIL_REGEXP = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

export const PASSWORD_REGEXP = /^(?=.*[a-z])(?=.*[A-Z])|(?=.*[a-z])(?=.*[^a-zA-Z0-9])|(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).+$/;
// 영어, 숫자, 특수문자를 조합하여 8자리 이상
