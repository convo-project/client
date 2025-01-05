export const EMAIL_REGEXP = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

export const PASSWORD_REGEXP = /^(?=.*[a-z])(?=.*[A-Z])|(?=.*[a-z])(?=.*[^a-zA-Z0-9])|(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).+$/;
// 영어, 숫자, 특수문자를 조합하여 8자리 이상
