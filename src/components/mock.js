let menu = [
    {
        id: 1,
        path: "/home",
        name: "菜单1",
        icon: ""
    },
    {
        id: 2,
        path: "/tree",
        name: "菜单2",
        icon: "",
        children: [
            {
                id: 2.1,
                name: "菜单2.1",
                path: "/tree/tree2.1"
            },
            {
                id: 2.2,
                name: "菜单2.2",
                path: "/tree/tree2.2"
            },
            {
                id: 2.3,
                name: "菜单2.3",
                path: "/tree/tree2.3"
            },
        ]
    },
    {
        id: 3,
        path: "/introduce1",
        name: "菜单3",
        icon: "",
        children: [
            {
                id: 3.1,
                name: "菜单3.1",
                path: "/introduce"
            }
        ]
    },
    {
        id: 4,
        path: "/dashboard1",
        name: "菜单4",
        icon: "",
        children: [
            {
                id: 4.1,
                name: "菜单4.1",
                path: "/dashboard"
            }
        ]
    }
]

export default menu