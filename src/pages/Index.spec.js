import { render, screen } from "@testing-library/vue";
import Main from "./Index.vue";

it('render', () => {
    render(Main)

    screen.getByText('Играть')
    screen.getByText('Настройки')
})