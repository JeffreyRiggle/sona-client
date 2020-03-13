import {bootstrap} from 'aurelia-bootstrapper';
import {StageComponent} from 'aurelia-testing';
import {PLATFORM} from 'aurelia-pal';
import httpManager from '../../src/services/httpManager';
describe('Stage Git Issue Viewer Component', () => {
  let component, boundData, commentData, issueData;

  beforeEach(() => {
    issueData = {
        closed_at: Date.now(),
        title: 'Some issue',
        state: 'Open',
        user: {
            login: 'reporter'
        },
        body: 'I am having an issue'
    };

    commentData = [{
        body: 'This is a comment',
        user: {
            login: 'reporter'
        },
        created_at: Date.now(),
    }];

    httpManager.get = jest.fn((url) => {
        if (/\/comments/.test(url)) {
            return Promise.resolve(commentData);
        }
        return Promise.resolve(issueData);
    });

    boundData = {
        issue: '/some/git/url'
    };

    component = StageComponent
      .withResources(PLATFORM.moduleName('../../src/gitviewer/git-issue-viewer'))
      .inView('<git-issue-viewer issue.bind="issue"></git-issue-viewer>')
      .boundTo(boundData);
  });

  afterEach(() => component.dispose());

  it('should render', done => {
    component.create(bootstrap).then(() => {
      setTimeout(() => {
        const view = component.element.querySelector('h1');
        expect(view.textContent.trim()).toBe('Some issue');
        done();
      }, 100);
    }).catch(e => {
      fail(e);
      done();
    });
  });
});
