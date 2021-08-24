
export const ValidationMessages:Record<string, Record<string,string> > = {
  name: {
    required: 'Name is required',
    minlength: 'Min length is 2 character',
    maxlength: 'Max length is 250 characters',
    uniqueName: 'Ship name already taken.'
  },
  length: {
    required: 'Length is required',
    maxlength: 'Max length is 6 digits',
    pattern: 'Invalid length supported format 12.23',
  },
  width: {
    required: 'Width is required',
    maxlength: 'Max length is 6 digits',
    pattern: 'Invalid width supported format 12.23',
  },
  code: {
    required: 'Code is required',
    pattern: 'Invalid code - Support format (AAAA-1111-A1)',
    uniqueCode: 'Ship code already taken.'
  },
};
