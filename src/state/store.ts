import { createStore } from "@stencil/store";

const { state, onChange } = createStore({
  modalOpen: false
});

onChange("modalOpen", value => {
  state.modalOpen = value;
});

export default state;
