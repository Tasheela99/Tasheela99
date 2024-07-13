import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({"projectId":"tasheelajayawickrama","appId":"1:481572052255:web:d975fd238b19c7ec2a642a","storageBucket":"tasheelajayawickrama.appspot.com","apiKey":"AIzaSyDN71fJRjh7_x1k5nXveUzCTtkuWmFa04M","authDomain":"tasheelajayawickrama.firebaseapp.com","messagingSenderId":"481572052255"})), provideAuth(() => getAuth())]
};
