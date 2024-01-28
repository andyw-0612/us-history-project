/**
 * ---------------------------------------
 * This demo was created using amCharts 5.
 * 
 * For more information visit:
 * https://www.amcharts.com/
 * 
 * Documentation is available at:
 * https://www.amcharts.com/docs/v5/
 * ---------------------------------------
 */

// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");


// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root)
]);


// Create the map chart
// https://www.amcharts.com/docs/v5/charts/map-chart/
var chart = root.container.children.push(am5map.MapChart.new(root, {
  panX: "rotateX",
  panY: "rotateY",
  projection: am5map.geoOrthographic(),
  paddingBottom: 20,
  paddingTop: 20,
  paddingLeft: 20,
  paddingRight: 20
}));


// ... [previous code remains unchanged]

// ... [previous code remains unchanged]

// Create main polygon series for countries
var polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
  geoJSON: am5geodata_worldLow
}));

// Set default color for all countries
polygonSeries.mapPolygons.template.setAll({
  fill: am5.color(0xDDDDDD), // Gray color
  fillOpacity: 1,
  strokeOpacity: 0,
  interactive: false // Disable interaction by default
});

// Define an array of selected country IDs
var selectedCountries = ['US', 'MX', 'VN', 'IQ', 'ZW', 'GL', 'GT', 'SV'];


// Apply different settings for selected countries
polygonSeries.events.on("datavalidated", function() {
  polygonSeries.mapPolygons.each(function(polygon) {
    var id = polygon.dataItem.dataContext.id;
    if (selectedCountries.includes(id)) {
      polygon.setAll({
        fill: root.interfaceColors.get("primaryButtonHover"),
        interactive: true, // Enable interaction
        tooltipText: "{name}" // Show tooltip
      });
    }
  });
});


// ... [rest of your code remains unchanged]



// Create series for background fill
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/#Background_polygon
var backgroundSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {}));
backgroundSeries.mapPolygons.template.setAll({
  fill: root.interfaceColors.get("alternativeBackground"),
  fillOpacity: 0.1,
  strokeOpacity: 0
});
backgroundSeries.data.push({
  geometry: am5map.getGeoRectangle(90, 180, -90, -180)
});


// Create graticule series
// https://www.amcharts.com/docs/v5/charts/map-chart/graticule-series/
var graticuleSeries = chart.series.push(am5map.GraticuleSeries.new(root, {}));
graticuleSeries.mapLines.template.setAll({ strokeOpacity: 0.1, stroke: root.interfaceColors.get("alternativeBackground") })


// Rotate animation
chart.animate({
  key: "rotationX",
  from: 0,
  to: 360,
  duration: 30000,
  loops: Infinity
});


// Make stuff animate on load
chart.appear(1000, 100);