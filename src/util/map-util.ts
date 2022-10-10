import { RouteRecordRaw } from "vue-router";

export function mapToMenuRoutes(userMenu: any[]): Promise<RouteRecordRaw[]> {
    return new Promise((r, j) => {
        const routes: RouteRecordRaw[] = [];
        /*1.先加载所有路由*/
        getLoaclMapRoutes().then((res) => {
            const allRoutes = res;
            const _recurseGetRoute = (menus: any[]) => {
                menus.map((item) => {
                    if (item.type === 2) {
                        const route = allRoutes.find(
                            (r) => r.path === item.url
                        );
                        if (route) routes.push(route);
                    } else {
                        _recurseGetRoute(item.children);
                    }
                });
            };
            _recurseGetRoute(userMenu);
            r(routes);
        });
        // Object.keys(routeFiles).forEach((fileurl) => {
        //     const route = () => import(fileurl);
        //     console.log(route);
        //     // allRoutes.push(route);
        // });
    });
}

function getLoaclMapRoutes(): Promise<RouteRecordRaw[]> {
    return new Promise(async (r, j) => {
        const allRoutes: RouteRecordRaw[] = [];
        const files = import.meta.glob("../router/main/**/**.ts");
        for (const key in files) {
            const res: any = await files[key]();
            allRoutes.push(res.default);
        }
        r(allRoutes);
    });
}
