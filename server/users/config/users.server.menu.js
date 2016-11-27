'use strict';

module.exports = {
  menus :[
    {
      title: 'Products',
      roles: ['user','admin'],
      sequence: 1,
      subMenus : [
        {
          title: 'Product A',
          href:'/'
        },
        {
          title: 'Product B',
          href:'http://meanjs.org/'
        }
      ]
    }
  ]
};
