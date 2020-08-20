// Import stylesheets
import "./style.css";
import "@grapecity/wijmo.styles/wijmo.css";

import * as wjcCore from "@grapecity/wijmo";
import * as wjcInput from "@grapecity/wijmo.input";
import * as wjcGrid from "@grapecity/wijmo.grid";
import * as wjcGridFilter from "@grapecity/wijmo.grid.filter";

var countries = "US,Germany,UK,Japan,Italy,Greece".split(",");
var filterBeforeUpdate;

const grid = new wjcGrid.FlexGrid("#grid", {
  itemsSource: getData(10)
});

var uniqCntry = [
  "UK",
  "US",
  "India",
  "Italy",
  "Greece",
  "Japan"
  ];
var filter = new wjcGridFilter.FlexGridFilter(grid);
filter.getColumnFilter("country").valueFilter.uniqueValues = uniqCntry;
filter.getColumnFilter("id").valueFilter.uniqueValues = ["1", "2", "3", "4"];

grid.hostElement.addEventListener('dblclick', function(e) {
	populateFilterGrid(grid);
})

function populateFilterGrid(grid) {
  alert('inside populate filter grid');
  filter.getColumnFilter("country").valueFilter.uniqueValues = uniqCntry;
  filter.getColumnFilter("id").valueFilter.uniqueValues = ["1", "2", "3", "4"];
    if(filterBeforeUpdate) {
      filter.filterDefinition = filterBeforeUpdate;
    }
  
  grid.collectionView.refresh();
}

var cntFilter = filter.getColumnFilter("country").valueFilter;
cntFilter.apply = function(value) {
  // if not active
  // then pass all values
  if (!this.isActive) {
    return true;
  }
  // if some values are selected
  if (this.showValues) {
    // get all the selected values
    var keys = Object.keys(this.showValues);
    for (let i = 0; i < keys.length; i++) {
      var key = keys[i];
      var item = value[this.column.binding];
      // check if current item contains the current key
      if (item.indexOf(key) > -1) {
        return true;
      }
    }
  }
  return false;
};

filter.filterApplied.addHandler((s, e) => {
  // api call
  var newData = getData(5);
  filterBeforeUpdate = filter.filterDefinition;
  grid.collectionView.sourceCollection = newData;
  grid.collectionView.refresh();
});

// create some random data
function getData(cnt) {
  var data = [];
  for (var i = 0; i < cnt; i++) {
    data.push({
      id: i,
      country: [
        countries[Math.floor(Math.random() * countries.length)],
        countries[Math.floor(Math.random() * countries.length)],
        countries[Math.floor(Math.random() * countries.length)]
      ].join(","),
      active: i % 5 != 0,
      downloads: Math.round(Math.random() * 200000),
      sales: Math.random() * 100000,
      expenses: Math.random() * 50000
    });
  }
  data.push({id: 10, country: 'UK', active: 0, downloads: 10, sales: 12, expenses: 50})
  return data;
}
