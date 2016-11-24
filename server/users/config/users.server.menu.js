'use strict';

module.exports = {
  menus :[
    {
      title: 'User Profile',
      roles: ['user','admin'],
      sequence: 3,
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
