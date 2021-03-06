import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx';

import { TRANSACTION_LIST } from './mock-transaction'


@Injectable()
export class TransactionService {
	private transactionUrl = 'api/transactions';
	private headers = new Headers({'Content-Type' : 'application/json'});

	constructor(private http: Http) {
	}

	getTransactions(searchData) : Observable<any> {
		console.log('getTransactions()');
		let rows;
		var transList;

		if (searchData && searchData.msisdn && searchData.msisdn.length > 0) {
			rows = TRANSACTION_LIST.rows.filter(function (item) {
				// for msisdn
				return item[0].startsWith(searchData.msisdn);
			});
		} else {
			rows = TRANSACTION_LIST.rows;
		}

		transList = {
			columns: TRANSACTION_LIST.columns,
			rows: rows
		}
		
		// *below approach : app crash
		// transList.columns = TRANSACTION_LIST.columns;
		// transList.rows = TRANSACTION_LIST.rows.filter(function(item) {
		// 	// for msisdn
		// 	return item[0] === searchData.msisdn;
		// });
		console.log('transList.rows.length = ' + transList.rows.length);

		return Observable.of(transList);
	}

	getOneTransaction(rank:string) : any {
		let transaction = TRANSACTION_LIST.rows[0];
		
		return Observable.of(transaction);
	}

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

}
