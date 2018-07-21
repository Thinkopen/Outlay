const handlePromise = store => next => action => {
  if (action && typeof action.then === 'function') {
    return Promise.resolve(action).then(store.dispatch);
  }
  return next(action);
};

export default handlePromise;
