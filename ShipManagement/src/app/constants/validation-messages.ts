
export const ValidationMessages:Record<string, Record<string,string> > = {
  name: {
    required: 'Name is required',
    minlength: 'Min length is 2 character',
    maxlength: 'Max length is 250 characters',
  },
  length: {
    required: 'Length is required',
    maxlength: 'Max length is 6 digits',
    pattern: 'Invalid length',
  },
  width: {
    required: 'Width is required',
    maxlength: 'Max length is 6 digits',
    pattern: 'Invalid width',
  },
  code: {
    required: 'Code is required',
    pattern: 'Invalid code',
  },
};
