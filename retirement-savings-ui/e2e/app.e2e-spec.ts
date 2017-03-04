import { RetirementSavingsUiPage } from './app.po';

describe('retirement-savings-ui App', () => {
  let page: RetirementSavingsUiPage;

  beforeEach(() => {
    page = new RetirementSavingsUiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
