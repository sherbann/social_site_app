import React from 'react';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image'
import Likes from './Likes'

class Scard extends React.Component {

  render() {
    return (
      <>
        <Card className="mx-auto text-center mt-2">
          <Card.Header as="h5">@{this.props.id}</Card.Header>
          <Image
            thumbnail
            fluid
            className="mx-auto"
            src={this.props.img}
            alt={this.props.alt} />
          <Card.Body>
            <Card.Text>{this.props.text}</Card.Text>
            <Likes
              no={this.props.likes}
              likeaction={this.props.likeaction}
              postId={this.props.postId} />
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default Scard;