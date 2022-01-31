jest.mock('react-resize-observer');
jest.mock('../libs/eventTracking');
jest.mock('../helpers', () => ({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  ...jest.requireActual('../helpers'),
  trackClick: jest.fn(),
}));
