import { RetirementSavingsUiPage } from './app.po';

describe('retirement-savings-ui App', function() {
  let page: RetirementSavingsUiPage;

  beforeEach(() => {
    page = new RetirementSavingsUiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
