'use strict';

module.exports = {
  menus :[
    {
      title: 'Introduction',
      roles: ['guest'],
      type: 'dropdown',
      sequence: 1,
      subMenus : [
        {
          title: 'NodeBootJS',
          href:'/'
        },
        {
          title: 'MEANJS',
          href:'http://meanjs.org/'
        }
      ]
    },
    {
      title: 'Pages',
      roles: ['guest','user','admin'],
      type: 'dropdown',
      sequence: 1,
      subMenus : [
        {
          title: 'Page 404',
          href:'/balabala'
        },
        {
          title: 'Page 500',
          href:'/server-error'
        }
      ]
    },
    {
      title: 'User Guide',
      roles: ['user','admin'],
      type: 'link',
      sequence: 2,
      href: '/#'
    }
  ]
};
