import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-profile',
  styleUrl: 'app-profile.css',
})
export class AppProfile {

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-buttons slot="start">
            <ion-back-button defaultHref="/" />
          </ion-buttons>
          <ion-title>All Vehicles</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content class="ion-padding">

      </ion-content>,
    ];
  }
}
