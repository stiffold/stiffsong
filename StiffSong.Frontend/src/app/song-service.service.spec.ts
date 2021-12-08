import { TestBed } from '@angular/core/testing';

import { SongServiceService } from './song-service.service';

describe('SongServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SongServiceService = TestBed.get(SongServiceService);
    expect(service).toBeTruthy();
  });
});
