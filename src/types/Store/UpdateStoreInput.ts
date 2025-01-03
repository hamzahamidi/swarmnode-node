import { IStore } from './Store';

export interface IUpdateStoreInput extends Partial<Pick<IStore, 'name'>> {}
