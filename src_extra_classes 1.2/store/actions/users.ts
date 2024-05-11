import { UserType } from 'types';

export const plusUserCount = () => ({
  type: 'PLUS-USER-COUNT',
}) as const;

export const createUser = (user: UserType) => ({
  type: 'CREATE_USER',
  payload: user
});
