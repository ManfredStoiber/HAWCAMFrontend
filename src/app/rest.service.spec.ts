import { TestBed, async } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RESTService } from './rest.service';



describe('RESTService', () => {

  let checkAlertSpy;
  let service: RESTService;
  let httpMock: HttpTestingController;

  beforeEach( async( () => TestBed.configureTestingModule({
    imports:
      [
        HttpClientModule,
        HttpClientTestingModule
      ],
    providers: [ RESTService ]

  })));

  beforeEach(() => {
    checkAlertSpy = spyOn(window, 'alert').and.callThrough();
    service = TestBed.get(RESTService);
    httpMock = TestBed.get(HttpTestingController);
  })


  afterEach( () => {
    httpMock.verify();  // waits until none requests are outstanding
  })


  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should have a GET that returns a Observable<JSON>', () => {

    const dummyResponse: any =
    {
      categories:
        [
          {name: "Tee"},
          {name: "Flaschen"},
          {namr: "Raum"}
        ]
    }

    service.getFromRESTService('test').subscribe( response => {
      expect(response).toBe(dummyResponse);
    });

    const request = httpMock.expectOne( service.strUrl + 'test');

    expect( request.request.method).toBe('GET');
    request.flush(dummyResponse);

  });


  // it('should have a POST that returns a Observable<JSON>', () => {
  //
  //   const jsonToBackend: JSON = JSON.parse('{"search": "' + "'" + "Raum" + "'" + '"}');
  //
  //   const dummyResponse: any =
  //   {
  //   categories:
  //       [
  //           {name: "Raum"}
  //       ],
  //       objects:
  //       [
  //           {name: "Raum1", cat:"Raum"},
  //           {name: "Raum2", cat:"Raum"}
  //       ]
  //   };
  //
  //   service.putToRESTService('test', jsonToBackend).subscribe( response => {
  //     expect(response).toBe(dummyResponse);
  //   });
  //
  //   const request = httpMock.expectOne( service.strUrl + 'test');
  //
  //   expect( request.request.method).toBe('PUT');
  //   request.flush(dummyResponse);
  //
  // });



  it('should alert user on error', () => {

    let myError: any = {
      error: new Error('This is going horribly wrong'),
      message:"testmessage",
      status:300
    }
    service.handleError( myError );
    expect(window.alert).toHaveBeenCalledWith("Fehlgeschlagen, Info siehe Console");

  });


});
