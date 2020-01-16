// /client/App.js
import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  state = {
    data: [],
    intervalIsSet: false
  };

  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
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
    .then((res) => this.setState({ data: res.data }));
  };


  // here is our UI
  // it is easy to understand their functions when you
  // see them render into our screen
  render() {
    const { data } = this.state;

    return (
      <div>
      <ul>
                {data.length <= 0? 'Click GET to pull data from Mongo'
                  :
                  <pre>
                  {JSON.stringify(data.data.persons,null,2)}
                  </pre>
                  }
              </ul>
        <div style={{ padding: '10px' }}>
                  <button onClick={() => this.getDataFromDb()}>
                    GET
                  </button>
                </div>
      </div>
    );
  }
}

export default App;
