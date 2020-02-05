import {bootstrap} from 'aurelia-bootstrapper';
import {StageComponent} from 'aurelia-testing';
import {PLATFORM} from 'aurelia-pal';
import {DialogService} from 'aurelia-dialog';

describe('Stage Attachment Viewer Component', () => {
  let component, boundData, service, dialogResponse;

  beforeEach(() => {
    service = {
      open: jest.fn(() => {
        return {
          whenClosed: (callback) => {
            callback(dialogResponse);
          }
        }
      })
    };

    boundData = {
        incident: {
            attachments: [
                { 
                    displayName: 'testFile.txt', 
                    getFormatedTime: () => 'formatTime'
                },
                {
                    displayName: 'neatFile.png', 
                    getFormatedTime: () => 'formatTime'
                }
            ],
            addAttachment: jest.fn(),
            removeAttachment: jest.fn(),
            downloadAttachment: jest.fn()
        }
    };

    component = StageComponent
      .withResources(PLATFORM.moduleName('../../src/attachment/attachment-viewer'))
      .inView('<attachment-viewer incident.bind="incident"></attachment-viewer>')
      .boundTo(boundData);
    
    component.bootstrap(aurelia => {
        aurelia.use.standardConfiguration().plugin('aurelia-dialog');
        aurelia.container.registerInstance(DialogService, service);
    })
  });

  afterEach(() => component.dispose());

  it('should render', done => {
    component.create(bootstrap).then(() => {
      const view = component.element.querySelectorAll('attachment-item');
      expect(view.length).toBe(2);
      done();
    }).catch(e => {
      fail(e);
      done();
    });
  });

  it('should remove an attachment when it is removed', done => {
    component.create(bootstrap).then(() => {
        let view = component.element.querySelector('attachment-item .attachment-remove');
        view.click();
        setTimeout(() => {
          expect(boundData.incident.removeAttachment.call.length).toBe(1);
          done();
        });
    }).catch(e => {
      fail(e);
      done();
    });
  });

  it('should download an attachment when it is downloaded', done => {
    component.create(bootstrap).then(() => {
        let view = component.element.querySelector('attachment-item .attachment-item');
        view.click();
        setTimeout(() => {
          expect(boundData.incident.downloadAttachment.call.length).toBe(1);
          done();
        });
    }).catch(e => {
      fail(e);
      done();
    });
  });

  it('should handle add items', done => {
    dialogResponse = {
       wasCancelled: false,
       output: ['fooFile.txt']
    }
    component.create(bootstrap).then(() => {
        let view = component.element.querySelector('.upload-attachments-button');
        view.click();
        setTimeout(() => {
          expect(service.open.call.length).toBe(1);
          expect(boundData.incident.addAttachment.call.length).toBe(1);
          done();
        });
    }).catch(e => {
      fail(e);
      done();
    });
  });
});
