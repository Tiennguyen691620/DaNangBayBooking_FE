import { environment } from './../environments/environment';


declare var window: any;
export const localStorageKey = 
  window.localStorage || 'DNB' + environment.API_ENDPOINT;

export const SALT = window.SALT || 'adfasdfasdfasdf';