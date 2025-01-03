import { IStore } from './Store';

export interface ICreateStoreInput extends Pick<IStore, 'name'> {}
