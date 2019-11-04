// Types
export const CREATE_CAUSE = 'CREATE_CAUSE';

// Action Creators
export function createCause(name, location, description, image) {
  return {
    type: CREATE_CAUSE,
    payload: {
      name,
      location,
      description,
      image,
    }
  };
}
