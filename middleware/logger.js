export const logger = (store) => (next) => (action) => {
  console.log(`Action: ${action.type}`);
  const nextState = next(action);
  console.log(`Next state: ${JSON.stringify(store.getState())}`);
  return nextState;
};
