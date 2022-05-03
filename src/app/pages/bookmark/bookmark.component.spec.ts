import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApolloModule } from 'apollo-angular';
import { KeycloakAngularModule } from 'keycloak-angular';

import { BookmarkComponent } from './bookmark.component';

describe('BookmarkComponent', () => {
  let component: BookmarkComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookmarkComponent],
      providers: [BookmarkComponent],
      imports: [KeycloakAngularModule, HttpClientModule, ApolloModule],
    })
    component = TestBed.inject(BookmarkComponent);
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(BookmarkComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
