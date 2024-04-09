import * as yup from 'yup';

const MAX_FILE_SIZE = 100 * 1024;

interface File {
  type: string;
  size: number;
}

function isFile(value: any): value is File {
  return typeof value === 'object' && value !== null && 'type' in value && 'size' in value;
}

export const uploadTaskSchema = yup.object().shape({
  file: yup
    .mixed()
    .required('Excel file is required')
    .test('is-valid-type', 'Invalid file type. Only .xls and .xlsx are allowed', (value) => {
      if (!isFile(value)) {
        return false;
      }
      const allowedExcelMimeTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];

      return allowedExcelMimeTypes.includes(value.type);
    })
    .test('is-valid-size', 'Max allowed size is 100KB', (value) => {
      if (!isFile(value)) {
        return false;
      }

      return value.size <= MAX_FILE_SIZE;
    })
});
