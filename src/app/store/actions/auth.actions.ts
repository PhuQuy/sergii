import { Action } from '@ngrx/store';


export enum AuthActionTypes {
    LOGOUT = '[Auth] Logout'
}

export class LogOut implements Action {
    readonly type = AuthActionTypes.LOGOUT;
}

export type All =
    | LogOut;