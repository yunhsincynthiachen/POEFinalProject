var React = require('react');
var ReactDOM = require('react-dom');

var DisplayEnum = Object.freeze({
    DISPLAY_HOME: 0
});


var DestinyChildBox = React.createClass({

    getInitialState: function() {
        return {
            display: DisplayEnum.DISPLAY_HOME,
            resources: [],
            metadata: {}
        };
    },

    componentDidMount: function() {
        //Calls login to facebook as soon as component is mounting
        // this.getResourcesPlusMetadata();
        return null;
    },

    // getResourcesPlusMetadata: function() {
    //   console.log("hello");
    //   $.ajax({
    //       url: '/api/resources/allResources',
    //       dataType: 'json',
    //       type: 'GET',
    //       success: function(resourceAndMetadataItems){
    //         console.log("hello" + resourceAndMetadataItems);
    //           this.setState({
    //             resources: resourceAndMetadataItems['resources'],
    //             metadata: resourceAndMetadataItems['metadata']
    //           });
    //
    //       }.bind(this),
    //       error: function(xhr, status, err){
    //           console.log("cannot get resources, '/api/resources/allResources'", status, err.toString());
    //       }.bind(this)
    //   })
    // },

    render: function() {
        var page;

        // Decide whether to show login page, tinder news wheel, or dashboard
        switch (this.state.display) {

            case DisplayEnum.DISPLAY_HOME:
                page = (
                  <div>
                    <h1>POE DDR</h1>
                  </div>
              );
              break;

      }

      return (
          <div>
      {page}
          </div>
      );
    }
});

ReactDOM.render(
  <DestinyChildBox />,
  document.getElementById('content')
);
