import AppDispatcher from './AppDispatcher'

class AppActions {

  public fetchPage(pathname: string) {
    AppDispatcher.dispatch({
      actionType: 'fetchPage',
      value: pathname,
    })
  }

  public setPageType(pageType: string) {
    AppDispatcher.dispatch({
      actionType: 'setPageType',
      value: pageType,
    })
  }

}

export default new AppActions()
