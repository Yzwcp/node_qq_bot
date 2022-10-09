import { createPinia, PiniaPluginContext } from "pinia";
import { toRaw } from "vue";
const pinia = createPinia();

interface Option {
    key?: string;
}

const piniaPlugin = (option: Option) => {
    return (context: PiniaPluginContext) => {
        const { store } = context;
        if (store.$state.keepCache) {
            const data = JSON.parse(
                localStorage.getItem(
                    `${option?.key ?? "test"}-${store.$id}`
                ) as string
            );
            store.$subscribe((msg) => {
                localStorage.setItem(
                    `${option?.key ?? "test"}-${store.$id}`,
                    JSON.stringify(toRaw(store.$state))
                );
            });
            return {
                ...data,
            };
        }
    };
};
pinia.use(
    piniaPlugin({
        key: "__PINIA__INFO",
    })
);
export default pinia;
