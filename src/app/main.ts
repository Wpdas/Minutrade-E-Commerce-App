import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { enableProdMode } from '@angular/core';

import { AppModule } from './app.module';

//Define como modo producao
enableProdMode();

platformBrowserDynamic().bootstrapModule(AppModule);
