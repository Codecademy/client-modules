import { trackClick } from '../helpers';
import { trackUserClick } from '../libs/eventTracking';

jest.mock('../libs/eventTracking');

const initialUrl = window.location.href;
const resetCodebytesParams = () =>
  window.history.replaceState(null, '', initialUrl);

describe('trackClick', () => {
  afterEach(() => {
    resetCodebytesParams();
    (trackUserClick as any).mockReset();
  });

  it('tracks user click when tracking data is provided', () => {
    const target = 'foobar';
    const trackingData = {
      page_name: 'forum',
      context: 'https://discuss.codecademy.com/some-interesting/post',
      target,
    };

    trackClick(target, trackingData);
    expect(trackUserClick).toHaveBeenCalledWith({
      page_name: 'forum',
      context: 'https://discuss.codecademy.com/some-interesting/post',
      target,
    });
  });

  it('tracks user click when tracking data is not provided', () => {
    const target = 'foobar';
    trackClick(target);
    expect(trackUserClick).toHaveBeenCalledWith({
      target,
    });
  });
});
