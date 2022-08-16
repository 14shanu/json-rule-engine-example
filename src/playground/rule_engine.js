const { Engine } = require("json-rules-engine");

const ruleEngine = () => {
  let engine = new Engine();

  engine.addRule({
    conditions: {
      all: [
        {
          fact: "temperature",
          operator: "equal",
          value: 100,
        },
        {
          fact: "temperature",
          operator: "equal",
          value: 100,
        },
      ],
    },
    onSuccess(value, value2, value3) {
      //   console.log("on Success Called", value, value2, value3);
    },
    onFailure() {
      console.log("on Failure Called");
    },
    event: {
      type: "message",
      params: {
        data: "hello world",
      },
    },
  });

  const facts = { temperature: 100 };

  engine.run(facts);
};

module.exports = {
  ruleEngine,
};
