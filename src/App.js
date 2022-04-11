import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Company from './components/pages/Company';
import Contact from './components/pages/Contact';
import Home from './components/pages/Home';
import Container from './components/layout/Conatiner';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import NewProject from './components/pages/NewProject';
import Projects from './components/pages/Projects';


function App() {
  return (
    <Router>
      <Navbar/>
      <Switch>
        <Container customClass="min-height">
          <Route exact path="/"><Home/></Route>
          <Route  path="/company"><Company/></Route>
          <Route  path="/contact"><Contact/></Route>
          <Route  path="/newproject"><NewProject/></Route>
          <Route  path="/projects"><Projects/></Route>
        </Container>
      </Switch>
      <Footer/>
    </Router>
  );
}

export default App;
