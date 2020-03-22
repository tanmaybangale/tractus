import React from 'react';
import logo from './logo.svg';
import './App.css';
import apiCalls from './asyncFunctn';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import awsmobile from './aws-exports';
import * as queries from './graphql/queries';
import * as mutations from './graphql/mutations';
import * as subscriptions from './graphql/subscriptions';

import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

class App extends React.Component {
  // define some state to hold the data returned from the API



  state = {
    mytasks: []
  };

  // execute the query in componentDidMount
  async componentDidMount() {
    try {
      Amplify.configure(awsmobile);
      const inputData = { $limit: 10} ;
      const mytaskData = await API.graphql(graphqlOperation(queries.listFromToMessages, inputData ));
      console.log('mytaskData:', mytaskData)
      this.setState({
        mytasks: mytaskData.data.listFromToMessages.items
      })
    } catch (err) {
      console.log('error fetching talks...', err)
    }



    try {
      Amplify.configure(awsmobile);
      const inputData = { $limit: 10} ;
      const mytaskData = await API.graphql(graphqlOperation(mutations.createFromToMessage, inputData ));
      console.log('mytaskData:', mytaskData)
      this.setState({
        mytasks: mytaskData.data.listFromToMessages.items
      })
    } catch (err) {
      console.log('error adding tasks...', err)
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
          this.state.mytasks.map((task, index) => (

      <tr key = {index}>
        <td> {index} </td>
        <td> {task.from}  </td>
        <td> {task.message}</td>
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
            <th>From</th>
            <th>Message</th>
          </tr>
         </thead>
        <tbody>

       {
         this.state.mytasks.map((task, index) => (

     <tr key = {index} >
       <td> {index} </td>
       <td> {task.from}  </td>
       <td> {task.message}</td>
     </tr>

         ))
       }

     </tbody>

     </Table>


        </Tab>
    </Tabs>
    </>
    )
  }
}

export default App;
