import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'app-button',
  shadow: true,
})
export class AppButton {

  render() {
    return (
      <Host>
        <p>Hello Button</p>
      </Host>
    );
  }

}
