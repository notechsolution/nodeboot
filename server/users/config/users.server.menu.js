'use strict';

module.exports = {
  menus :[
    {
      title: 'Products',
      roles: ['user','admin'],
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
    }
  ]
};
