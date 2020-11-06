import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FromMessagesComponent } from './from-messages.component';

describe('FromMessagesComponent', () => {
  let component: FromMessagesComponent;
  let fixture: ComponentFixture<FromMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FromMessagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FromMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
