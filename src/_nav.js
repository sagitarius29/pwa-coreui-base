const items = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
  },
  {
    icon: 'icon-speedometer',
    name: 'CRM',
    url: '/dashboard',
    children: [
      {
        name: 'Clientes',
        url: '/dashboard',
        icon: 'fa fa-building',
      }
    ]
  }
];

export default {
  items: items
}
