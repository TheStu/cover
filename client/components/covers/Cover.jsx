var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <div>
        <div dangerouslySetInnerHTML={{ __html: "<iframe type='text/html' width='336' height='550' frameborder='0' allowfullscreen style='max-width:100%' src='https://read.amazon.com/kp/card?asin=" + this.props.asin + "&preview=inline&linkCode=kpe&ref_=cm_sw_r_kb_dp_Y8.kybJP3R4M3&tag=scrowed-20&hideShare=true' ></iframe>" }} />
      </div>
    );
  }
});