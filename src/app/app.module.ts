import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './core/sidebar/sidebar.component';
import { GraphQLModule } from './graphql.module';
import { ArticleViewComponent } from './pages/article-view/article-view.component';
import { BookmarkComponent } from './pages/bookmark/bookmark.component';
import { FeedOverviewPageComponent } from './pages/feed-overview-page/feed-overview-page.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { WelcomePageComponent } from './pages/welcome/welcome-page.component';
import { SharedModule } from './shared/shared.module';
import { SettingsComponent } from './pages/settings/settings.component';

function initializeKeycloak(keycloak: KeycloakService) {
	return () =>
		keycloak.init({
			config: {
				url: environment.keycloakUrl,
				realm: environment.keycloakRealm,
				clientId: environment.keycloakClientId,
			},
			initOptions: {
				onLoad: 'check-sso',
				silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
			},
		});
}

@NgModule({
	declarations: [
		AppComponent,
		SidebarComponent,
		NotFoundComponent,
		WelcomePageComponent,
		FeedOverviewPageComponent,
		ArticleViewComponent,
		BookmarkComponent,
		SettingsComponent,
	],
	imports: [BrowserModule, AppRoutingModule, HttpClientModule, SharedModule, KeycloakAngularModule, GraphQLModule],
	providers: [
		{
			provide: APP_INITIALIZER,
			useFactory: initializeKeycloak,
			multi: true,
			deps: [KeycloakService],
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
