// Import stylesheets
import "./style.css";
import "@grapecity/wijmo.styles/wijmo.css";

import * as wjcCore from "@grapecity/wijmo";
import * as wjcInput from "@grapecity/wijmo.input";
import * as wjcGrid from "@grapecity/wijmo.grid";
import * as wjcGridFilter from "@grapecity/wijmo.grid.filter";

var countries = "US,Germany,UK,Japan,Italy,Greece".split(",");

const grid = new wjcGrid.FlexGrid("#grid", {
  itemsSource: getData(10),
});

var filter = new wjcGridFilter.FlexGridFilter(grid);
filter.getColumnFilter('country').valueFilter.uniqueValues = ['UK', 'US', 'India', 'Italy', 'Greece', 'Japan'];
filter.getColumnFilter('id').valueFilter.uniqueValues = ['1', '2', '3', '4'];

filter.filterApplied.addHandler((s, e) => {
  // api call
    var newData = getData(5);
    grid.collectionView.sourceCollection = newData;
    grid.collectionView.refresh();
});

// create some random data
function getData(cnt) {
  var data = [];
  for (var i = 0; i < cnt; i++) {
    data.push({
      id: i,
      country: [countries[Math.floor(Math.random() * countries.length)], countries[Math.floor(Math.random() * countries.length)], countries[Math.floor(Math.random() * countries.length)]].join(','),
      active: i % 5 != 0,
      downloads: Math.round(Math.random() * 200000),
      sales: Math.random() * 100000,
      expenses: Math.random() * 50000
    });
  }
  return data;
}
