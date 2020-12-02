import { newSpecPage } from '@stencil/core/testing';
import { AppModal } from '../app-modal';

describe('app-modal', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AppModal],
      html: `<app-modal></app-modal>`,
    });
    expect(page.root).toEqualHtml(`
      <app-modal>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </app-modal>
    `);
  });
});
