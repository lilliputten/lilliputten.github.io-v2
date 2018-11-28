import AppDispatcher from './AppDispatcher';

// const appDispatcher = new AppDispatcher();

class AppActions {

  public showPage(data: any) {
    AppDispatcher.dispatch({
      actionType: 'SHOW_PAGE',
      value: data,
    });
  }

}

export default new AppActions();
