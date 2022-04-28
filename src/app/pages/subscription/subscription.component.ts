import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Feed } from 'skiosa-orm';
import { SUBSCRIPTION_QUERY } from 'src/app/core/queries/subscription';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css'],
})
export class SubscriptionComponent implements OnInit {
  subscriptions: Feed[] = [];
  visibleSubscriptions: Set<number> = new Set();

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: SUBSCRIPTION_QUERY,
      })
      .valueChanges.subscribe(({ data }: any) => {
        this.subscriptions = data.subscriptions;
      });
  }

  /**
   * @author Amos Gross
   * @summary generates open lamda
   * @description generates open lambda to delete feed from visible feeds
   * @param feedId - feed id
   * @returns {Function} lambda for mutating open state
   */
  generateOnOpen = (feedId: number): (() => void) => {
    return () => {
      this.visibleSubscriptions.add(feedId);
    };
  };

  /**
   * @author Amos Gross
   * @summary generates close lamda
   * @description generates close lambda to delete feed from visible feeds
   * @param feedId - feed id
   * @returns {Function} lambda for mutating open state
   */
  generateOnClose = (feedId: number): (() => void) => {
    return () => {
      this.visibleSubscriptions.delete(feedId);
    };
  };
}