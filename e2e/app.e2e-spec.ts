import { KAppPage } from './app.po';

describe('k-app App', () => {
  let page: KAppPage;

  beforeEach(() => {
    page = new KAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
