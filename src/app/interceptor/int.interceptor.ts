import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class IntInterceptor implements HttpInterceptor {
  token: any = '';

  constructor(private http: HttpClient) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    //Que nose agregen token a las peticiones de login
    //ni de refrescar token
    if (
      request.url == environment.urlLogin ||
      request.url == environment.urlRefreshToken
    )
      return next.handle(request);
    this.token = localStorage.getItem('token');
    //Se captura la fecha de expiracion en
    //formato epoch
    const payload: any = JSON.parse(atob(this.token.split('.')[1])).exp;
    //De epoch a formato tradicional de fecha
    const tokenExp: any = new Date(payload * 1000);
    //Tiempo actual
    const now: any = new Date();
    //Calcular 15 min despues del tiempo actual
    now.setTime(now.getTime() + 15 * 60 * 1000);
    if (tokenExp.getTime() < now.getTime()) {
      const body = {
        grant_type: 'refresh_token',
        refresh_token: localStorage.getItem('refreshToken'),
      };
      this.http
        .post(environment.urlRefreshToken, body)
        .subscribe((resp: any) => {
          //Se captura el idToken y refreshToken
          localStorage.setItem('token', resp.id_token);
          localStorage.setItem('refreshToken', resp.refresh_token);
          this.token = resp.id_token;
        });
    }

    return next.handle(this.cloneToken(request, this.token)).pipe(
      map((resp: any) => {
        return resp;
      })
    );
  }

  //Clonar el parametro token
  private cloneToken(
    request: HttpRequest<unknown>,
    token: string
  ): HttpRequest<any> {
    return request.clone({
      setParams: {
        auth: token,
      },
    });
  }
}
