// /client/App.js
import React, { Component } from 'react';
import Table from './Table';
import axios from 'axios';

class App extends Component {

constructor(props){
      super(props);
      this.state={
        tableData:[]
      }
    }

getDataFromDb = () => {
  axios.post("http://localhost:8081/graphql", {
    query: `query {
      persons{
        uid
        name
        age
        dob
      }
    }`
  }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((res) => this.setState({ tableData: res.data.data.persons }));
  };

render() {
    return (
      <div className="App">
        Hello, React <br/>
        Person Information <br/><br/>
          {
              this.state.tableData.length <= 0?
              'GET Person info from Mongo':<Table data={this.state.tableData}/>
           }

        <div style={{ padding: '5px' }}>
          <button onClick={() => this.getDataFromDb()}>
            GET
          </button>
        </div>
      </div>

    );
}

}

export default App;

