import { environment } from './../environments/environment';


declare var window: any;
export const localStorageKey = 'DNB-Admin-' + environment.API_ENDPOINT;
