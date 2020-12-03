import React , {Component} from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle} from 'reactstrap';
import { Link } from 'react-router-dom';
import Breadcrumb from 'reactstrap/lib/Breadcrumb';
import BreadcrumbItem from 'reactstrap/lib/BreadcrumbItem';
import {Nav,Navbar, NavItem, NavbarToggler, Col,Collapse, NavItemNavbar, NavbarBrand, Jumbotron, Button, Modal, ModalHeader, ModalBody,Row, Form, FormGroup,Input,Label} from 'reactstrap';
import {NavLink} from 'react-router-dom';
import { Control, LocalForm } from 'react-redux-form';




    function RenderCampsite({campsite}) {
        return(
            <div className="col-md-5 m-1">
                <Card>
                    <CardImg top src={campsite.image} alt={campsite.name}/>
                    <CardBody>
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        )
    }

    function RenderComments({comments}){
        console.log(comments);
        if(comments){
            return(
                <div className="col-md-5 m-1">
                    <h4>Comments</h4>
                    <div> {comments.map(comment=> <div key={comment.id}> {comment.text} <br /> -- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</div>)}  </div>
                    <CommentForm/>
                </div>
            );
        }return <div/>;
    }

    function CampsiteInfo(props) {
        if(props.campsite){
            return(
                <div className ="container">
                    <div className="row">
                        <div className="col">
                            <Breadcrumb>
                                <BreadcrumbItem><Link to='/directory'>Directory</Link></BreadcrumbItem>
                                <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                            </Breadcrumb>
                            <h2>{props.campsite.name}</h2>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <RenderCampsite campsite ={props.campsite} />
                        <RenderComments comments = {props.comments} />
                    </div>
                </div>
            );
        }
        return <div />;
    }

    class CommentForm extends Component{
        constructor(props){
            super(props);
    
            //this.toggleNav =this.toggleNav.bind(this);
            this.state={
                isModalOpen:false
            };
            this.toggleModal=this.toggleModal.bind(this);  
        }
        toggleModal(){
            this.setState({
                isModalOpen: !this.state.isModalOpen
            });
        }

        render(){
            //Create LocalForm
            //Three control inputs for rating, author, text. 
            //rating field - Control.select and options 1-5
            //author field - Control.text
            //comment text field - Control.textarea and 6 rows.
            //authror - .author
            //rating - .rating
            //text -.text
            return(
                <React.Fragment>
                    <button outline className="fa-lg fa-pencil" onClick={this.toggleModal}>
                        Submit Comment
                    </button>

                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                            <ModalBody>
                                <h1>Comments</h1>
                                <LocalForm>
                                    <Row className="form-group">
                                        <Label htmlFor="Rating" md={2}>Rating</Label>
                                        <Col md={10}>
                                            <Control.select className="form-control" model=".rating" name="rating">
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </Control.select>    
                                        </Col>
                                    </Row>
                                </LocalForm>
                            </ModalBody>
                        </Modal>
                </React.Fragment>
            );
        }
    }

export default CampsiteInfo;