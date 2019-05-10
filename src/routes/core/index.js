// 不同模块代码分离
import login from './login.router';
import menu from './menu.router';
// import group from './group.router'
// import role from './role.router'
// import user from './user.router'
// import objectType from './objectType.router'
// import permission from './permission.router'

let routes = [];

// routes.push(objectType._router[0]);

routes = routes.concat(menu._router, login._router);

export default {
  routes
};
