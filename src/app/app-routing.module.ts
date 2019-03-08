import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersResolver } from './users/users-resolver.service';
import { UserAlbumResolver } from './user-album/user-album-resolver.service';
import { PhotoResolver } from './user-album/photo/photo-resolover.service';

import { UsersComponent } from './users/users.component';
import { UserAlbumComponent } from './user-album/user-album.component';
import { PhotoComponent } from './user-album/photo/photo.component';
import { UserComponent } from './users/user/user.component';

const routes: Routes = [
    { path: '', component: UsersComponent, resolve: { users: UsersResolver }, children: [
        { path: 'user/:id', component: UserComponent },
        { path: 'user/:id/album', component: UserAlbumComponent, resolve: { albums: UserAlbumResolver } } ,
        { path: 'user/:id/album/:album_id', component: PhotoComponent, resolve: { photos: PhotoResolver } } 
    ] },
    { path: 'users', component: UsersComponent, resolve: { users: UsersResolver, albums: UserAlbumResolver } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: "top" })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
