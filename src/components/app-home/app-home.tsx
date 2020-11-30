import { Component, h, State } from '@stencil/core';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
})
export class AppHome {
  @State() totalRocketLaunches: number;
  @State() mostRecentLaunch: object;
  @State() allLaunchData: any;

  async componentWillLoad() {
    let fetchResult = null;
    try {
      let launchesFetch = await fetch("https://api.spacexdata.com/v4/launches");
      fetchResult = await launchesFetch.json();
    } catch (error) {
      fetchResult = error
    }

    this.allLaunchData = fetchResult;
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color="dark">
          <ion-title>All Rocket Launches</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content class="ion-padding" fullscreen>
        <ion-grid>
          <ion-row>
            { this.allLaunchData.length > 0 &&
              this.allLaunchData.map(launch => {
              const flightNumber = launch.flight_number;
              let flightSuccess = launch.success;

              if(flightSuccess != null) {
                flightSuccess = flightSuccess.toString();
              } else {
                flightSuccess = "Test Flight";
              }

              return ( <ion-col size="3">
                  <ion-card>
                    <ion-card-header>
                    <ion-card-title>Flight Number: {flightNumber}</ion-card-title>
                    </ion-card-header>
                    <ion-card-content>
                      <ion-card-subtitle>Stats</ion-card-subtitle>
                        Mission Success: { flightSuccess === "true" ?
                        <span class="success">{flightSuccess}</span> :
                        <span class="failure">{flightSuccess}</span>
                      }
                      <ion-button color="dark" expand="full" class="card-button">Vehicle Review</ion-button>
                      <ion-button color="dark" expand="full" class="card-button">Mission Details</ion-button>
                    </ion-card-content>
                  </ion-card>
                </ion-col>
              )
            })}
          </ion-row>
        </ion-grid>

        <ion-button href="/profile/ionic" expand="block" color="dark">
          Profile page
        </ion-button>
      </ion-content>,
    ];
  }
}
