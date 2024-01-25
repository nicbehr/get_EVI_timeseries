// First enter the latitudes, longitudes, startdates, enddates and sitenames in arrays:

var lat = [...
    ]
    
    var lon = [...
      ]
    
    var startdates = [...
      ]
    
    
    var enddates = [...
      ]
    
    var sites = [...
    ]
    
    
// Running a loop to produce the time series charts for all sites
// The charts will be visible in the interactive window and can be 
// downloaded from there by open the chart and clicking in the top
// right on "download csv"

      for(var i=0;i< enddates.length; i++){
        get_evis(lat[i], lon[i], startdates[i], enddates[i], sites[i])
      }
    
    
    function get_evis(lat, lon, startdate, enddate, sitename){
        
        
      
      var modis = ee.ImageCollection("MODIS/MOD09GA_006_EVI").filterDate(startdate, enddate);
      
      var AOI = ee.Geometry.Point(lon, lat);
      var geometryBuff = AOI.buffer(100);
      // Apply buffer to geometry
      modis = modis.filterBounds(geometryBuff)
      
      
      // Add plot and buffer to the map and specify fill color and layer name
      Map.addLayer(AOI, { color: 'green' }, 'Border');
      Map.addLayer(geometryBuff, { color: 'red' }, 'Buffer');
      
      // Add plot and buffer to the map and specify fill color and layer name
      // Center map on the plot
      Map.centerObject(AOI);
      
      // Update the following lines to use modisWithEVI instead of modis
      var plotEVI = ui.Chart.image.seriesByRegion(
          modis,
          geometryBuff,
          ee.Reducer.mean(),
          'EVI', // Use 'EVI' instead of 'nd'
          10
      )
          .setChartType('LineChart')
          .setOptions({
              interpolateNulls: true,
              lineWidth: 1,
              pointSize: 3,
              title: 'EVI annual evolution: '+sitename,
              hAxis: { title: 'Date' },
              vAxis: { title: 'EVI' },
              series: { 0: { color: 'red' } }
          });
      
      print(plotEVI);
      
    }