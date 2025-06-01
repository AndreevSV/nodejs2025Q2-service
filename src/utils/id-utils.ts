import { validate } from 'uuid';

function validateId(id: string): boolean | Error {
  if (!validate(id)) {
    throw new Error(`Id ${id} is not a  valid UUID`);
  } else {
    return true;
  }
}

export { validateId };
