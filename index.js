const Express = require("express");
const { customOperators } = require("./src/playground/custom_operators");
const { start } = require("./src/playground/dynamic_facts");
const { factComparison } = require("./src/playground/fact_compariosn");
const { factDependency } = require("./src/playground/fact_dependency");
const {
  prioritiesdFacts,
} = require("./src/playground/optimizing_runtime_with_fact_priorities");
const { ruleResult } = require("./src/playground/ruleResults");
const { ruleChaining } = require("./src/playground/rule_chaining");
const { ruleEngine } = require("./src/playground/rule_engine");

const app = Express();

app.use("/", (req, res) => {
  res.send("Server Setup");
});
// ruleEngine();
// start();
// factDependency();
// prioritiesdFacts();
// customOperators();
// ruleChaining();
// factComparison();
ruleResult();
app.listen(3005, () => {
  console.log("Server is listening on port", 3005);
});
