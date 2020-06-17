import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  constructor() { }

  isValid(value: any) {
    return value !== undefined && value !== null && value !== '';
  }
  buildQueryString(queryObject: Object) {
    const queryparams = Object.keys(queryObject);

    const query = queryparams.reduce((acc, param) => {
        return this.isValid(queryObject[param]) ? acc.concat(`${param}=${queryObject[param]}`) : acc;
    }, []);

    return query.length ? `?${query.join('&')}` : '';
}
}
