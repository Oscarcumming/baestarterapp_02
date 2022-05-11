import axios from "axios";
import { Component } from "react";
import React from "react";
import { Container, Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import "./Searcher.css";
import { Button } from "react-bootstrap";

class Searcher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: "",
      participants: "",
      price: "",
      type: "",
      record: [],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  //handle the current value when submitting - address has to be added to json.config to get round CORS access issue.
  //format is : "proxy" : "https://www.boredapi.com/api/activity/",
  handleSubmit = async (e) => {
    //prevents refresh when form / button method is called
    e.preventDefault();

    axios
      .get("https://www.boredapi.com/api/activity/")

      .then((response) => {
        console.log(response.data);
        console.log(response.status);
        console.log(response.statusText);
        console.log(response.headers);
        console.log(response.config);

        this.setState({ activity: response.data.activity });
        this.setState({
          record: [...this.state.record, response.data.activity],
        });
        console.log("activity ==== " + response.data.activity);
        console.log("array state is currently " + this.state.record);
      });

    console.log("button pressed");
  };

  //handles form input change to update current item state
  handleChange = () => {};

  render() {
    const listItems = this.state.record.map((number) => (
      <li className="list_01">{number}</li>
    ));
    return (
      <Container fluid="flex">
        <Row className="topBar flex-auto">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h1 className="text_01">B O R E D . C O M</h1>
          </div>
        </Row>
        <Row>
          <div
            className="button_01"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Button
              variant="dark"
              style={{
                alignItems: "center",
              }}
              onClick={this.handleSubmit}
            >
              CLICK ME
            </Button>
          </div>
          <h1 className="text_02" style={{ textAlign: "center" }}>
            {this.state.activity}
          </h1>
        </Row>
        <Row>
          <h1 className="text_02" style={{ textAlign: "center" }}>
            {/* {this.state.record} */}
            {listItems}
          </h1>
        </Row>
      </Container>
    );
  }
}

export default Searcher;
