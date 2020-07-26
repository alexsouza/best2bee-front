import { TestBed } from "@angular/core/testing";

import { XyzService } from "./xyz.service";

describe("XyzServiceService", () => {
  let service: XyzService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XyzService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
