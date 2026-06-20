/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  Transaction - an object like { itemName, category, price, timestamp }.
  Output - [{ category1 - total_amount_spent_on_category1 }, { category2 - total_amount_spent_on_category2 }]

  Once you've implemented the logic, test your code by running
  - `npm run test-expenditure-analysis`
*/

function calculateTotalSpentByCategory(transactions) {
  let totals = {};
  for (let txn of transactions) {
    let category = txn.category;
    let price = txn.price;

    if (totals[category] === undefined) {
      totals[category] = price;
    } else {
      totals[category] += price;
    }
  }

  let result = [];
  for (let category in totals) {
    result.push({ category: category, totalSpent: totals[category] });
  }

  return result;
}

module.exports = calculateTotalSpentByCategory;

//use for of -> values and for in -> keys
