// 不同模块代码分离
import comm from './comm.router';
import sercice from './service.router';
import strategy from './strategy.router';
import care from './care.router';
import vip from './vip.router';
import power from './power.router';
import report from './report.router';
import complaint from './complaint.router';
import dbOperate from './dbOperate.router';
import rights from './rights.router';
import wxactivity from './wxactivity.router';
import management from './management.router';
import greyListSet from './greyListSet.router';

let routes = [];

routes = routes.concat(
  dbOperate._router,
  comm._router,
  sercice._router,
  strategy._router,
  rights._router,
  vip._router,
  power._router,
  report._router,
  complaint._router,
  care._router,
  wxactivity._router,
  management._router,
  greyListSet._router
);

export default {
  routes
};
