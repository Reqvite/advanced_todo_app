export const ErrorMessages = {
  minLength: (length: number) => `Minimum length should be ${length} characters`,
  isRequired: (label: string) => `${label} is required`,
  maxAllowedSize: (size: string) => `Max allowed size is ${size}`
};
