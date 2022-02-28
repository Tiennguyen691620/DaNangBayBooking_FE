import { environment } from './../environments/environment';


declare var window: any;
export const localStorageKey = 
  window.localStorage || 'user' + environment.API_ENDPOINT;