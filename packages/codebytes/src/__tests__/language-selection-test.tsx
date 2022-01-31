import { setupRtl } from '@codecademy/gamut-tests';

import { LanguageSelection } from '../languageSelection';

const renderWrapper = setupRtl(LanguageSelection, {
  onChange: () => null,
});

describe('LanguageSelection', () => {
  it('has placeholder text', () => {
    const { view } = renderWrapper();
    view.getByText('Which language do you want to code in?');
  });
});
