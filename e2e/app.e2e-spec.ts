import { ChecklistWebPage } from './app.po';

describe('checklist-web App', function() {
  let page: ChecklistWebPage;

  beforeEach(() => {
    page = new ChecklistWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
