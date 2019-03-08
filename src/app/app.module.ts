import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { AppRoutingModule } from './app-routing.module';

import { MakeHttpRequest } from './services/http.service';
import { AppLoadingService } from './services/app-loading.service';
import { UserAlbumService } from './user-album/user-album.service';
import { UserAlbumResolver } from './user-album/user-album-resolver.service';
import { PhotoService } from './user-album/photo/photo.service';
import { PhotoResolver } from './user-album/photo/photo-resolover.service';
import { UsersResolver } from './users/users-resolver.service';
import { UsersService } from './users/users.service';

import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { UserAlbumComponent } from './user-album/user-album.component';
import { PhotoComponent } from './user-album/photo/photo.component';
import { UserComponent } from './users/user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserAlbumComponent,
    PhotoComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatProgressBarModule,
  ],
  providers: [
      MakeHttpRequest, 
      AppLoadingService, 
      UsersService, 
      UsersResolver,
      UserAlbumService,
      UserAlbumResolver,
      PhotoService,
      PhotoResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
