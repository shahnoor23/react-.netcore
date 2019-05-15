import React,{ Component } from 'react';
import axios from 'axios';
import {Input,FormGroup,Label,Modal ,ModalHeader,ModalBody,ModalFooter,Table, Button } from 'reactstrap';


class App extends Component {
  state={
    students:[],
    newStudentData:{
      name:'',
      address:'',
      fathername:'',
      cnic:''

    },
      
    editStudentData: {
      id: '',
      name: '',
      address: '',
      fathername:'',
      cnic:''

    },
  //state variables
    newStudentModal : false,
    editStudentModal: false
  }
  componentWillMount(){
   this._refreshStudents();
    
  
  }

  toggleNewStudentModal(){

    this.setState({
      newStudentModal:! this.state.newStudentModal
    });
   
  }

  toggleEditStudentModal() {
    this.setState({
      editStudentModal: ! this.state.editStudentModal
    });
  }
  
  
  addStudent(){
    axios.post('/api/students', this.state.newStudentData).then((response)=>{
    let {students} = this.state;
    students.push(response.data);
    this.setState({students, newStudentModal:false,newStudentData:{
      name:'',
      address:'',
      fathername:'',
      cnic:''
    }
    });
   });
  }

  updateStudent() {
    let { name, address, fathername,cnic } = this.state.editStudentData;

    axios.put('/api/students/'+ this.state.editStudentData.id, {
      name,address,fathername,cnic
    }).then((response) => {
      this._refreshStudents();

      this.setState({
        editStudentModal: false, editStudentData: { id: '', name: '', address: '',fathername: '',cnic:'' }
      })
    });
  }
  editStudent(id, name, address,fathername,cnic) {
    this.setState({
      editStudentData: { id, name, address,fathername,cnic }, editStudentModal: ! this.state.editStudentModal
    });
  }
   
 deleteStudent(id){
    
  axios.delete('/api/students/'+id).then((response)=>{
    this._refreshStudents();
      
  });
  
  }

  
     _refreshStudents(){
      axios.get('/api/students').then((response)=>{

    this.setState({
      students:response.data
    })
  });
     }

     
  render(){
    let students = this.state.students.map((student)=>{
      return (
           <tr key={student.id}>
           <td>{student.id}</td>
           <td>{student.name}</td>
           <td>{student.address}</td>
          <td>{student.fathername}</td>
          <td>{student.cnic}</td>
          <td>
          <Button color="success" size="sm" className="mr-2" onClick={this.editStudent.bind(this, student.id, student.name, student.address, student.fathername, student.cnic)}>Edit</Button>
            <Button color="danger" size="sm" onClick={this.deleteStudent.bind(this, student.id)}>Delete</Button>
        </td>
        </tr>

      )
    });
    return (
      <div className="App container">

      <h1>Students ADD</h1>
      <Button className="my-3" color="primary" onClick={this.toggleNewStudentModal.bind(this)}>Add Student</Button>
        
        <Modal isOpen={this.state.newStudentModal} toggle={this.toggleNewStudentModal.bind(this)}>
          <ModalHeader toggle={this.toggleNewStudentModal.bind(this)}>Add Student</ModalHeader>
          <ModalBody>

            
          <FormGroup>
          <Label for="name">Name</Label>
          <Input  id="name" value={this.state.newStudentData.name} onChange={(e)=>{
            let{newStudentData}=this.state;
            newStudentData.name=e.target.value;
            this.setState({newStudentData });
          }}/>
          </FormGroup>

          <FormGroup>
          <Label for="address">Address</Label>
          <Input  id="address" value={this.state.newStudentData.address} onChange={(e)=>{
            let{ newStudentData}=this.state;
            newStudentData.address=e.target.value;
            this.setState({newStudentData });
          }}/> 
          </FormGroup>


          <FormGroup>
          <Label for="fathername">Father Name</Label>
          <Input  id="fathername" value={this.state.newStudentData.fathername} onChange={(e)=>{
            let{ newStudentData}=this.state;
            newStudentData.fathername=e.target.value;
            this.setState({newStudentData });
          }}/>
          </FormGroup>


          <FormGroup>
          <Label for="cnic">CNIC</Label>
          <Input  id="cnic" value={this.state.newStudentData.cnic} onChange={(e)=>{
            let{ newStudentData}=this.state;
            newStudentData.cnic=e.target.value;
            this.setState({newStudentData });
          }}/>
          </FormGroup>


          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.addStudent.bind(this)}>Add Student</Button>{' '}
            <Button color="secondary" onClick={this.toggleNewStudentModal.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.editStudentModal} toggle={this.toggleEditStudentModal.bind(this)}>
        <ModalHeader toggle={this.toggleEditStudentModal.bind(this)}>Edit a new student</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input id="name" value={this.state.editStudentData.name} onChange={(e) => {
              let { editStudentData } = this.state;

              editStudentData.name = e.target.value;

              this.setState({ editStudentData });
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="address">Address</Label>
            <Input id="address" value={this.state.editStudentData.address} onChange={(e) => {
              let { editStudentData } = this.state;

              editStudentData.address = e.target.value;

              this.setState({ editStudentData });
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="fathername">Fathername</Label>
            <Input id="fathername" value={this.state.editStudentData.fathername} onChange={(e) => {
              let { editStudentData } = this.state;

              editStudentData.fathername = e.target.value;

              this.setState({ editStudentData });
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="cnic">Cnic</Label>
            <Input id="cnic" value={this.state.editStudentData.cnic} onChange={(e) => {
              let { editStudentData } = this.state;

              editStudentData.cnic = e.target.value;

              this.setState({ editStudentData });
            }} />
          </FormGroup>
          

        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.updateStudent.bind(this)}>Update Student</Button>{' '}
          <Button color="secondary" onClick={this.toggleEditStudentModal.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>
      
      <Table>
         <thead>
           <tr>
             <th>#</th>
             <th>Name</th>
             <th>Address</th>
             <th>Father Name</th>
             <th>Cnic</th>
             <th>Actions</th>

           </tr>
         </thead>
      

         <tbody>
         {students}
         </tbody>
      </Table>
      </div>
    );
  }
}

export default App;