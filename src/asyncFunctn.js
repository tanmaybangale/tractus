import React from 'react';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
//import Amplify, { API } from 'aws-amplify';
import awsmobile from './aws-exports';
import * as queries from './graphql/queries';
import * as mutations from './graphql/mutations';
import * as subscriptions from './graphql/subscriptions';
import ListGroup from 'react-bootstrap/ListGroup';



class apiCalls {

  constructor() {
    Amplify.configure(awsmobile);
  }

  async getAllMyTask(){
    const inputData = { $limit: 10}
    const result = await API.graphql(graphqlOperation(queries.listFromToMessages, inputData ));
    //console.log(result);
    return result.data.listFromToMessages.items;
  }

};

export default apiCalls;
