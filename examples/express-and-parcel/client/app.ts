import { hello } from '../hello.telefunc'
(async () => {
    document.getElementById("app").textContent = "loading";

    const { message } = await hello({ name: 'Eva' })

    document.getElementById("app").textContent = message;
})();
