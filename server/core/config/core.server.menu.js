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
      title: 'Feature',
      roles: ['user','admin'],
      type: 'link',
      sequence: 1,
      href: '/#'
    }
  ]
};
