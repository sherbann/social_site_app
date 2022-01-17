import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import View from './pages/View';
import Add from './pages/Add';
import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      postId: undefined
    }
  }

  componentDidMount() {
    const listContents = localStorage.getItem("posts");
    let postValue = 0
    if (listContents) {
      postValue = (JSON.parse(listContents)[JSON.parse(listContents).length - 1].postid)
      console.log(postValue);
    }

    this.setState(
      {
        posts: JSON.parse(listContents) || [],
        postId: postValue
      }
    )
  }

  updateListItems(postid, id, text, img, likes) {
    const postItem = { postid, id, text, img, likes }
    this.setState((state) => ({
      posts: state.posts.concat(postItem)
    }), () => localStorage.setItem("posts", JSON.stringify(this.state.posts)))
  }

  addLike(id) {

    this.setState((state) => ({
      posts: state.posts.map(
        post => post.postid === id ? { ...post, likes: post.likes + 1 } : post
      )
    }), () => localStorage.setItem("posts", JSON.stringify(this.state.posts)))
  }

  render() {
    return (
      <Router>

        <Navbar bg="primary" expand="md">
          <Navbar.Brand>FaceAche™</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Link className="nav-link" to="/">View</Link>
              <Link className="nav-link" to="/add">Add</Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Container>
          <Switch>
            <Route path="/add">
              <Add
                onsubmit={(postid, id, text, img, likes) =>
                  this.updateListItems(postid, id, text, img, likes)}
                lastid={this.state.postId} />
            </Route>
            <Route exact path="/">
              <View
                posts={this.state.posts}
                likeaction={(id) => this.addLike(id)} />
            </Route>
            <Route path="/">
              Error: 404 not found
            </Route>
          </Switch>

        </Container>

      </Router>

    );
  }

}
export default App;
