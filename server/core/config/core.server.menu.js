'use strict';

module.exports = {
  menus :[
    {
      title: 'Pricing',
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
      title: 'User Guide',
      roles: ['user','admin'],
      type: 'link',
      sequence: 2,
      href: '/#'
    }
  ]
};
