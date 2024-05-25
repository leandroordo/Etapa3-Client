export interface MenuItem {
  id: number;
  title: string;
  route?: string;
  children?: MenuItem[];
}

export const menuItems: MenuItem[] = [
  {
    id: 1,
    title: "Inicio",
    route: "/",
  },
  {
    id: 2,
    title: "Nosotros",
    route: "/aboutus",
  },
  {
    id: 3,
    title: "Contacto",
    route: "/contact",
  },
  {
    id: 4,
    title: "Admin",
    route: "/xx",
    children: [
      {
        id: 41,
        title: "Dar de alta",
        route: "/products/add",
      },
    ],
  },
];
