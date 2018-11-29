import AppDispatcher from './AppDispatcher';

class AppActions {

  public fetchPage(pathname: string) {
    AppDispatcher.dispatch({
      actionType: 'fetchPage',
      value: pathname,
    });
  }

  public setAppMode(appMode: string) {
    AppDispatcher.dispatch({
      actionType: 'setAppMode',
      value: appMode,
    });
  }

}

export default new AppActions();
