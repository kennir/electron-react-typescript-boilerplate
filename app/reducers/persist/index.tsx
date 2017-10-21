import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory('persist');

interface Storage {
  app?: { isPersisting: boolean; };
  auth?: {
    username?: string;
    password?: string;
    shop_number?: string;
    token?: string;
  };
}

export const rehydrate = actionCreator<Storage>('REHYDRATE');
