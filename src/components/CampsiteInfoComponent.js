import React , {Component} from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle} from 'reactstrap';
import { Link } from 'react-router-dom';
import Breadcrumb from 'reactstrap/lib/Breadcrumb';
import BreadcrumbItem from 'reactstrap/lib/BreadcrumbItem';
import {Nav,Navbar, NavItem, NavbarToggler, Collapse, NavItemNavbar, NavbarBrand, Jumbotron, Button, Modal, ModalHeader, ModalBody, Form, FormGroup,Input,Label} from 'reactstrap';
import {NavLink} from 'react-router-dom';




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
            return(
                <React.Fragment>
                    <button outline className="fa-lg fa-pencil" onClick={this.toggleModal}>
                        Submit Comment
                    </button>

                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                            <ModalBody>
                                <Form onSubmit={this.handleLogin}>
                                    <FormGroup>
                                        <Label htmlFor="username">Username</Label>
                                        <Input type="text" id="username" name="username"
                                        innerRef={input => this.username = input}/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="password">Password</Label>
                                        <Input type="password" id="password" name="password" 
                                        innerRef={input=>this.password = input}/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label check>
                                        <Input type="checkbox" name="remember" 
                                        innerRef={input => this.remember = input}/>Remember me
                                        </Label>
                                    </FormGroup>
                                    <Button type="submit" value="submit" color="primary">Login</Button>
                                </Form>
                            </ModalBody>
                        </Modal>
                </React.Fragment>
            );
        }
    }

export default CampsiteInfo;