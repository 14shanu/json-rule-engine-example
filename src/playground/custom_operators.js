"use strict";

require("colors");
const { Engine } = require("json-rules-engine");

async function customOperators() {
  /**
   * Setup a new engine
   */
  const engine = new Engine();

  /**
   * Define a 'startsWith' custom operator, for use in later rules
   */
  engine.addOperator("startsWith", (factValue, jsonValue) => {
    if (!factValue.length) return false;
    // console.log("Fact Value", factValue, jsonValue);
    return factValue[0].toLowerCase() === jsonValue.toLowerCase();
  });

  /**
   * Add rule for detecting words that start with 'a'
   */
  const ruleA = {
    conditions: {
      all: [
        {
          fact: "word",
          operator: "startsWith",
          value: "a",
        },
      ],
    },
    event: {
      type: "start-with-a",
    },
  };
  engine.addRule(ruleA);

  /*
   * Add rule for detecting words that start with 'b'
   */
  const ruleB = {
    conditions: {
      all: [
        {
          fact: "word",
          operator: "startsWith",
          value: "b",
        },
      ],
    },
    event: {
      type: "start-with-b",
    },
  };
  engine.addRule(ruleB);

  // utility for printing output
  const printEventType = {
    "start-with-a": 'start with "a"',
    "start-with-b": 'start with "b"',
  };

  /**
   * Register listeners with the engine for rule success and failure
   */
  let facts;
  engine
    .on("success", (event) => {
      console.log(facts.word + " DID ".green + printEventType[event.type]);
    })
    .on("failure", (event) => {
      console.log(
        facts.word + " did " + "NOT".red + " " + printEventType[event.type]
      );
    });

  /**
   * Each run() of the engine executes on an independent set of facts.  We'll run twice, once per word
   */

  // first run, using 'bacon'
  facts = { word: "bacon" };
  await engine.run(facts);

  //   second run, using 'antelope'
  facts = { word: "antelope" };
  await engine.run(facts);
}
module.exports = {
  customOperators,
};
