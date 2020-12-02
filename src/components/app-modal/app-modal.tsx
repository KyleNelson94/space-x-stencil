import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'app-modal',
  styleUrl: 'app-modal.css',
  shadow: true,
})
export class AppModal {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
