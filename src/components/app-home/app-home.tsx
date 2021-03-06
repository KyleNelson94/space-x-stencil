import { Component, h, State, Watch } from '@stencil/core';
import state from '../../state/store';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
})
export class AppHome {
  @State() totalRocketLaunches: number;
  @State() mostRecentLaunch: object;
  @State() allLaunchData: any;
  @State() allRocketsData: any;
  @State() showModal: boolean;
  @State() modalTitle: string;
  @State() modalContent: string;

  async componentWillLoad() {
    let allDataFetch = null;
    let allRocketFetch = null;
    const BASE_URL = "https://api.spacexdata.com/v4";
    this.showModal = state.modalOpen;

    try {
      let launchesFetch = await fetch(`${BASE_URL}/launches`);
      let rocketFetch = await fetch(`${BASE_URL}/rockets`);

      allDataFetch = await launchesFetch.json();
      allRocketFetch = await rocketFetch.json();
    } catch (error) {

      allDataFetch = error
    }

    this.allLaunchData = allDataFetch;
    this.allRocketsData = allRocketFetch;
  }

  getRocketType( vehicleId: string ) {
    let vehicleName = "";
    if (this.allRocketsData.length > 0) {
      this.allRocketsData.filter(rocket => {

        if(rocket.id === vehicleId) {
          vehicleName = rocket.name;
        }
      });
    }

    return vehicleName;
  };

  toggleModal(title:string, content:string) {
    this.showModal = !this.showModal;
    state.modalOpen = this.showModal;
    this.modalTitle = title;
    this.modalContent = content;
  }

  render() {

    return [
      <ion-header>
        <ion-toolbar color="dark">
          <ion-title>All Rocket Launches</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content class="ion-padding" fullscreen>
        <app-modal
          showModal={ this.showModal }
          modalTitle={ this.modalTitle }
          modalContent={ this.modalContent }
        />
        <ion-grid>
          <ion-row>
            { this.allLaunchData.length > 0 &&
              this.allLaunchData.map(launch => {
              const flightNumber = launch.flight_number;
              let flightVehicle = launch.rocket;
              //const flightLaunchpad = launch.launchpad;
              let flightSuccess = launch.success;
              //let fairingsObj = launch.fairings;
              const flightName = launch.name;
              const flightDetails = launch.details;
              console.log("LAUNCH ---------------->", launch);

              flightVehicle = this.getRocketType(flightVehicle);

              if(flightSuccess != null) {
                flightSuccess = flightSuccess.toString();
              } else {
                flightSuccess = "Test Flight";
              }


              return ( <ion-col size="3">
                  <ion-card>
                    <ion-card-header>
                    <ion-card-title>Flight {flightNumber}</ion-card-title>
                    </ion-card-header>
                    <ion-card-content>
                      <ion-card-subtitle>Stats</ion-card-subtitle>
                      <ul class="stat-list">
                        <li>
                          Mission Success: { flightSuccess === "true" ?
                          <span class="success">{flightSuccess}</span> :
                          <span class="failure">{flightSuccess}</span> }
                        </li>
                        <li>Vehicle: {flightVehicle}</li>
                      </ul>

                      <ion-button
                        onClick={() => this.toggleModal(flightName, flightDetails) }
                        color="dark"
                        expand="full"
                        class="card-button"
                      >Mission Details</ion-button>
                    </ion-card-content>
                  </ion-card>
                </ion-col>
              )
            })}
          </ion-row>
        </ion-grid>
        <ion-button href="/profile/ionic" expand="block" color="dark">
          View all Rockets
        </ion-button>
      </ion-content>,
    ];
  }
}
