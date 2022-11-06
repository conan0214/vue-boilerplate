// 1.Dependency
import {
    createRouter,
    // createWebHistory,
    createWebHashHistory,
} from "vue-router";

// 2.Components
const Index = () => import("../views/Index/Index.vue");
const Layout = () => import("../components/Layout.vue");
const PlantModel = () => import("../views/PlantModel/Index.vue");
const AddPlantModel = () => import("../views/PlantModel/add.vue");

// 3.Routes
const routes = [
    {
        path: "/",
        redirect: "/index",
        component: Layout,
        children: [
            {
                path: "index",
                component: Index,
            },
            {
                path: "plantModel",
                component: PlantModel,
            },
            {
                path: "add",
                component: AddPlantModel,
            },
        ],
    },
];

// 4.Build An Instance
const router = createRouter({
    history: createWebHashHistory(), //hash
    // history: createWebHistory(),  //history api
    // base : '/rewrite root',
    routes,
});

export default router;
