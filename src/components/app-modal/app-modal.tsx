import { Component, Prop, h } from '@stencil/core';
import state from '../../state/store';
@Component({
  tag: 'app-modal',
  styleUrl: 'app-modal.css',
  shadow: true,
})
export class AppModal {
  @Prop() showModal: boolean;
  @Prop() modalTitle: string;
  @Prop() modalContent: string;

  closeModal() {
    this.showModal = false;
    state.modalOpen = this.showModal;
  }

  render() {
    const { showModal, modalTitle, modalContent } = this;
    if (modalContent === null) {
      this.modalContent = "No content available";
    }
    if (!showModal) return;

    if (showModal) return (
      <div class="modal-container">
        <ion-content>
          <div class="inner">
            <ion-header>{modalTitle}</ion-header>
            <p>{modalContent}</p>
            <ion-button onClick={() => this.closeModal}>Close</ion-button>
          </div>
        </ion-content>
      </div>
    );
  }

}
