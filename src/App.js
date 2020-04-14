import { withAuthenticator } from 'aws-amplify-react';
import React from 'react';
import logo from './logo.svg';
import './App.css';
import apiCalls from './asyncFunctn';
import Amplify, { API, Auth, graphqlOperation } from 'aws-amplify';
import gql from 'graphql-tag';
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import awsmobile from './aws-exports';
import * as queries from './graphql/queries';
import * as mutations from './graphql/mutations';
import * as subscriptions from './graphql/subscriptions';

import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Button from 'react-bootstrap/Button';

Amplify.configure(awsmobile);


const client = new AWSAppSyncClient({
  url: awsmobile.aws_appsync_graphqlEndpoint,
  region: awsmobile.aws_appsync_region,
  auth: {
    type: awsmobile.aws_appsync_authenticationType,
    jwtToken: async () => (await Auth.currentSession()).getIdToken().getJwtToken(),
  },
});






class App extends React.Component {
  // define some state to hold the data returned from the API

  constructor(props) {
   super(props);
   //this.handleMinus = this.handleMinus.bind(this);
 }

  state = {
    mytasks: [],
    othertasks : []
  };

  deleteItemFromState(id) {
  const updatedTasks = this.state.othertasks.filter(task => task.id !== id)
  this.setState({ othertasks: updatedTasks })



}

//handle minus of a task assigned to others
// remove from current state othertasks and then gql to remove from database
  handleMinus(id,from){
  console.log('We need to get the details for ' + id);
  this.deleteItemFromState(id)
  console.log("going for db delete");
  client.mutate({
    mutation: gql(mutations.deleteFromToMessages),
    variables: {
      input: {
        id: id,
        from: from
      }
    }}).then((data) => {
   console.log('Data from handleMinus()/deleteFromToMessages with async ( When promise gets resolved ): ' + data);
 }).catch((error) => {
   console.log('Error from handleMinus()/deleteFromToMessages with async( When promise gets rejected ): ' + error);
 });
}
  handleAdd(){
    console.log("pressed");

  }





  // execute the query in componentDidMount
  async componentDidMount() {


    //fetch task assigned to user and store in state

    try {
      //const inputData = { $limit: 10} ;
      await client.query({
      query: gql(queries.listToFromMessages)
      }).then(({ data: { listToFromMessages } }) => {
      //console.log(listToFromMessages.items);
      this.setState({
        mytasks: listToFromMessages.items
      })
      //console.log(this.state.mytasks);
      });

    } catch (err) {
      console.log('error fetching listToFromMessages...', err)
    }


    //fetch task assigned to others and store in state

    try {

      //console.log("entered")
      //const inputData = { $limit: 10} ;
      await client.query({
      query: gql(queries.listFromToMessages)
      }).then(({ data: { listFromToMessages } }  ) => {
      //console.log(listFromToMessages.items);
      this.setState({
        othertasks: listFromToMessages.items
      })
      //console.log(this.state.othertasks);
      });

    } catch (err) {
      console.log('error fetching talks...', err)
    }


    //testing subscriptions
    try {

      //console.log("entered")
      //const inputData = { $limit: 10} ;
      await client.subscribe({
      query: gql(subscriptions.onDeleteFromToMessages)
      }).subscribe({
    next: data => {
      console.log(data.data.onDeleteFromToMessages);
    },
    error: error => {
      console.warn(error);
    }
  });

    } catch (err) {
      console.log('error fetching talks...', err)
    }







  }
  render() {
    return (
      <>
      <Tabs defaultActiveKey="mytasks" id="uncontrolled-tab-example">
         <Tab eventKey="mytasks" title="My Tasks">

         <Table striped bordered hover>
         <thead>
           <tr>
             <th>#</th>
             <th>From</th>
             <th>Message</th>
           </tr>
          </thead>
         <tbody>

        {
          this.state.mytasks.map((mytask, indexone) => (

      <tr key = {indexone}>
        <td> {indexone+1} </td>
        <td> {mytask.from}  </td>
        <td> {mytask.message}</td>
      </tr>

          ))
        }

      </tbody>
      </Table>
        </Tab>


        <Tab eventKey="othertasks" title="Other Tasks">

        <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Action</th>
            <th>To</th>
            <th>Message</th>
          </tr>
         </thead>
        <tbody>

       {
         this.state.othertasks.map((task, index) => (

     <tr key = {index} >
       <td> {index} </td>
       <td> <Button data-item={task.id} variant="secondary" size="sm" onClick={this.handleMinus.bind(this,task.id, task.from)} >-</Button> </td>
       <td> {task.to}  </td>
       <td> {task.message}</td>
     </tr>

   ))
       }

     </tbody>

     </Table>

    <Button data-item="add-item" variant="primary" onClick={this.handleAdd.bind(this)}>Add Task for Others</Button>
    </Tab>

    </Tabs>
    </>
  )
  }

}

export default withAuthenticator(App,{
                // Render a sign out button once   logged in
                usernameAttributes: 'email',
                includeGreetings: true} );
